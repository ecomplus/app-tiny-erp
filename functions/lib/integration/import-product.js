const { firestore } = require('firebase-admin')
const ecomClient = require('@ecomplus/client')
const getAppData = require('../store-api/get-app-data')
const updateAppData = require('../store-api/update-app-data')
const Tiny = require('../tiny/constructor')
const parseProduct = require('./parsers/product-to-ecomplus')
const handleJob = require('./handle-job')
const importCategoriesFromTiny = require('./import-category')
const { logger } = require('../../context')

module.exports = ({ appSdk, storeId, auth }, tinyToken, queueEntry, appData, canCreateNew, isHiddenQueue) => {
  const [sku, productId] = String(queueEntry.nextId).split(';:')
  let hasProduct = false

  return new Promise((resolve, reject) => {
    if (queueEntry.tinyStockUpdate) {
      resolve(queueEntry.tinyStockUpdate)
      return
    }

    firestore().collection('tiny_stock_updates')
      .where('ref', '==', `${storeId}_${tinyToken}_${sku}`)
      .get()
      .then(querySnapshot => {
        let tinyStockUpdate, lastUpdateTime
        querySnapshot.forEach(documentSnapshot => {
          const updateTime = documentSnapshot.updateTime.toDate().getTime()
          if (!lastUpdateTime || updateTime > lastUpdateTime) {
            lastUpdateTime = updateTime
            tinyStockUpdate = documentSnapshot.data()
          }
          documentSnapshot.ref.delete().catch(logger.error)
        })
        resolve(tinyStockUpdate)
        /* if (
          tinyStockUpdate.updatedAt &&
          Date.now() - tinyStockUpdate.updatedAt.toDate().getTime() <= 1000 * 60 * 5
        ) {
          resolve(tinyStockUpdate)
        } else {
          resolve(null)
        } */
      })
      .catch(reject)
  })

    .then(tinyStockUpdate => {
      const findingProduct = productId
        ? ecomClient.store({
          storeId,
          url: `/products/${productId}.json`
        })
          .then(({ data }) => data)
          .catch(err => {
            if (err.response && err.response.status >= 400 && err.response.status < 500) {
              logger.info(`#${storeId} ${productId} => ${err.response.status}`)
              return null
            }
            logger.error(err)
            throw err
          })

        : ecomClient.search({
          storeId,
          url: '/items.json',
          data: {
            size: 1,
            query: {
              bool: {
                must: {
                  term: { skus: sku }
                }
              }
            }
          }
        }).then(({ data }) => {
          const hit = Array.isArray(data.hits.hits) && data.hits.hits[0] && data.hits.hits[0]
          if (hit) {
            const { _id, _source } = hit
            if (_source.variations && _source.variations.length) {
              return ecomClient.store({
                storeId,
                url: `/products/${_id}.json`
              }).then(({ data }) => data)
            }
            return {
              _id,
              ..._source
            }
          }
          return null
        })

      return findingProduct
        .then(product => {
          const hasVariations = product && product.variations && product.variations.length
          if (hasVariations) {
            const variation = product.variations.find(variation => sku === variation.sku)
            if (variation) {
              return {
                product,
                variationId: variation._id,
                hasVariations
              }
            } else if (!variation && appData.update_product) {
              return {
                product,
                hasVariations
              }
            } else if (isHiddenQueue) {
              return null
            } else if (!appData.update_product) {
              const msg = sku +
                ' corresponde a um produto com variações, especifique o SKU da variação para importar.'
              const err = new Error(msg)
              err.isConfigError = true
              handleJob({ appSdk, storeId }, queueEntry, Promise.reject(err))
              return null
            }
          }
          return { product, hasVariations }
        })

        .then(payload => {
          const dispatchNullJob = () => handleJob({ appSdk, storeId }, queueEntry, Promise.resolve(null))
          if (!payload) {
            logger.info(`#${storeId} not found ${sku}`)
            dispatchNullJob()
            return payload
          }
          const { product, variationId, hasVariations } = payload
          if (product && product._id) {
            hasProduct = true
          }
          const tiny = new Tiny(tinyToken)

          const handleTinyStock = ({ produto, tipo, preco, precoPromocional }, tinyProduct) => {
            if (storeId === 51305) {
              logger.info(`product importation ${JSON.stringify(produto)}, ${tipo}`)
            }
            let price, basePrice
            if (precoPromocional > 0) {
              price = precoPromocional
              basePrice = preco
            } else if (preco > 0) {
              price = preco
              basePrice = preco
            }
            let quantity = Number(produto.saldo)
            if (!quantity & quantity !== 0) {
              quantity = Number(produto.estoqueAtual)
            }
            if (produto.saldoReservado) {
              quantity -= Number(produto.saldoReservado)
            }
            if (product && (!appData.update_product || variationId || (tipo === 'precos'))) {
              if (!isNaN(quantity)) {
                if (quantity < 0) {
                  quantity = 0
                }
                let endpoint = `/products/${product._id}`
                if (variationId) {
                  endpoint += `/variations/${variationId}`
                }
                endpoint += '/quantity.json'
                logger.info(`#${storeId} ${endpoint}`, { quantity })
                return appSdk.apiRequest(storeId, endpoint, 'PUT', { quantity }, auth)
              } else if (!isNaN(price)) {
                let endpoint = `/products/${product._id}`
                if (variationId) {
                  endpoint += `/variations/${variationId}`
                }
                endpoint += '/price.json'
                logger.info(`#${storeId} ${endpoint}`, { price })
                return appSdk.apiRequest(storeId, endpoint, 'PUT', { price, base_price: basePrice }, auth)
              }
              return null
            } else if (!product && tinyProduct && tipo === 'produto') {
              return parseProduct(tinyProduct, storeId, auth, true, tipo).then(product => {
                return appSdk.apiRequest(storeId, '/products.json', 'POST', product, auth).then(async (response) => {
                  if (appData.enable_category_import && tinyStockUpdate?.produto?.arvoreCategoria) {
                    const { response: { data: { _id: newProductId } } } = response
                    const arvoreCategoria = tinyStockUpdate?.produto?.arvoreCategoria
                    if (newProductId) {
                      await importCategoriesFromTiny({ appSdk, storeId, auth }, newProductId, arvoreCategoria)
                        .catch(logger.error)
                    }
                  }
                  logger.info('Produto criado com sucesso')
                  return response
                }).catch(err => {
                  logger.info(err)
                })
              })
            } else if (!tinyProduct || !produto) {
              return null
            }

            return tiny.post('/produto.obter.php', { id: (tinyProduct.id || produto.id) })
              .then(({ produto }) => {
                let method, endpoint
                let productId = product && product._id
                if (productId) {
                  method = 'PATCH'
                  endpoint = `/products/${productId}.json`
                } else if (tipo === 'produto') {
                  method = 'POST'
                  endpoint = '/products.json'
                } else {
                  return null
                }
                return parseProduct(produto, storeId, auth, method === 'POST', tipo, appData).then(product => {
                  if (!isNaN(quantity)) {
                    product.quantity = quantity >= 0 ? quantity : 0
                  }
                  logger.info(`#${storeId} ${method} ${endpoint} ${product.sku} ${product.price} ${product.quantity}`)

                  const promise = appSdk.apiRequest(storeId, endpoint, method, product, auth)
                    .then(async (response) => {
                      if (appData.enable_category_import && tinyStockUpdate?.produto?.arvoreCategoria) {
                        if (!productId) {
                          productId = response.response?.data?._id
                        } else {
                          if (produto.anexos) {
                            logger.info('save images')
                            await firestore().doc(`product_anexos/${storeId}_${productId}`)
                              .set({
                                anexos: produto.anexos,
                                storeId,
                                productId,
                                exportedAt: firestore.Timestamp.now()
                              }, { merge: true })
                              .catch(logger.error)
                          }
                        }
                        const arvoreCategoria = tinyStockUpdate?.produto?.arvoreCategoria
                        if (productId) {
                          await importCategoriesFromTiny({ appSdk, storeId, auth }, productId, arvoreCategoria)
                            .catch(logger.error)
                        }
                      }
                      return response
                    })

                  if (Array.isArray(produto.variacoes) && produto.variacoes.length) {
                    promise.then(({ response }) => {
                      return getAppData({ appSdk, storeId, auth })
                        .then(appData => {
                          let skus = appData.__importation && appData.__importation.skus
                          if (!Array.isArray(skus)) {
                            skus = []
                          }
                          let isQueuedVariations = false
                          produto.variacoes.forEach(({ variacao }) => {
                            const { codigo } = variacao
                            let skuAndId = codigo
                            if (!productId) {
                              productId = response.data && response.data._id
                            }
                            if (productId) {
                              skuAndId += `;:${productId}`
                            }
                            if (!skus.includes(codigo) && !skus.includes(skuAndId)) {
                              isQueuedVariations = true
                              skus.push(skuAndId)
                            }
                          })
                          return isQueuedVariations
                            ? updateAppData({ appSdk, storeId, auth }, {
                              __importation: {
                                ...appData.__importation,
                                skus
                              }
                            })
                            : true
                        })
                    }).catch(logger.error)
                  }

                  return promise
                })
              })
          }

          logger.info(`#${storeId} ${JSON.stringify({ sku, productId, hasVariations, variationId, hasProduct })}`)
          let job
          if (tinyStockUpdate && isHiddenQueue && (productId || hasProduct)) {
            job = handleTinyStock(tinyStockUpdate, tinyStockUpdate.produto)
          } else if (tinyStockUpdate && tinyStockUpdate.tipo === 'produto') {
            job = handleTinyStock({ produto: {}, tipo: 'produto' }, tinyStockUpdate.produto)
          } else {
            job = tiny.post('/produtos.pesquisa.php', { pesquisa: sku })
              .then(({ produtos }) => {
                if (Array.isArray(produtos)) {
                  let tinyProduct = produtos.find(({ produto }) => sku === String(produto.codigo))
                  if (tinyProduct) {
                    tinyProduct = tinyProduct.produto
                    if (!hasVariations || variationId) {
                      if (tinyStockUpdate) {
                        return handleTinyStock(tinyStockUpdate, tinyProduct)
                      }
                      return tiny.post('/produto.obter.estoque.php', { id: tinyProduct.id })
                        .then(tinyStock => handleTinyStock(tinyStock, tinyProduct))
                    } else {
                      return handleTinyStock({ produto: {} }, tinyProduct)
                    }
                  }
                }

                const msg = `SKU ${sku} não encontrado no Tiny`
                const err = new Error(msg)
                err.isConfigError = true
                throw new Error(err)
              })
          }

          handleJob({ appSdk, storeId }, queueEntry, job)
        })
    })
}
