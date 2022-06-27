const getAppData = require('../../lib/store-api/get-app-data')
const updateAppData = require('../../lib/store-api/update-app-data')
const importProduct = require('../../lib/integration/import-product')
const importOrder = require('../../lib/integration/import-order')

exports.get = ({ appSdk, admin }, req, res) => {
  return res.sendStatus(200)
}

exports.post = ({ appSdk, admin }, req, res) => {
  const tinyToken = req.query.token
  const storeId = parseInt(req.query.store_id, 10)

  if (storeId > 100 && typeof tinyToken === 'string' && tinyToken && req.body) {
    const { dados, tipo } = req.body
    if (dados) {
      /*
      TODO: check Tiny server IPs
      const clientIp = req.get('x-forwarded-for') || req.connection.remoteAddress
      */
      return appSdk.getAuth(storeId).then(auth => {
        const appClient = { appSdk, storeId, auth }
        return getAppData(appClient)

          .then(appData => {
            if (appData.tiny_api_token !== tinyToken) {
              return res.sendStatus(401)
            }

            if (dados.idVendaTiny) {
              let orderNumbers = appData.___importation && appData.___importation.order_numbers
              if (!Array.isArray(orderNumbers)) {
                orderNumbers = []
              }
              const orderNumber = `id:${dados.idVendaTiny}`

              if (!orderNumbers.includes(orderNumber)) {
                return new Promise((resolve, reject) => {
                  console.log(`> Tiny webhook: #${storeId} order ${orderNumber}`)

                  const saveToQueue = () => {
                    orderNumbers.push(orderNumber)
                    console.log(`> #${storeId} order numbers: ${JSON.stringify(orderNumbers)}`)
                    return updateAppData(appClient, {
                      ___importation: {
                        ...appData.___importation,
                        order_numbers: orderNumbers
                      }
                    })
                      .then(() => {
                        resolve(503)
                      })
                      .catch(reject)
                  }

                  const queueEntry = {
                    nextId: orderNumber,
                    isNotQueued: true,
                    cb: (err, isDone) => {
                      if (!err && isDone) {
                        return resolve(true)
                      }
                      saveToQueue()
                    }
                  }
                  importOrder(appClient, tinyToken, queueEntry, appData, false, true)
                    .catch(saveToQueue)
                })
              }
            }

            if (tipo === 'produto' || tipo === 'estoque') {
              if ((dados.id || dados.idProduto) && (dados.codigo || dados.sku)) {
                return new Promise((resolve, reject) => {
                  const nextId = String(dados.skuMapeamento || dados.sku || dados.codigo)
                  const tinyStockUpdate = {
                    storeId,
                    ref: `${storeId}_${tinyToken}_${nextId}`,
                    tipo,
                    produto: {
                      id: dados.idProduto,
                      codigo: dados.sku,
                      ...dados
                    }
                  }
                  console.log(`> Tiny webhook: #${storeId} ${nextId} => ${tinyStockUpdate.produto.saldo}`)

                  const saveToQueue = () => {
                    let skus = appData.___importation && appData.___importation.skus
                    if (!Array.isArray(skus)) {
                      skus = []
                    }

                    if (!skus.includes(nextId)) {
                      return admin.firestore().collection('tiny_stock_updates').add(tinyStockUpdate)
                        .then(() => {
                          skus.push(nextId)
                          console.log(`> #${storeId} SKUs: ${JSON.stringify(skus)}`)
                          return updateAppData(appClient, {
                            ___importation: {
                              ...appData.___importation,
                              skus
                            }
                          })
                        })
                        .then(resolve)
                        .catch(reject)
                    }
                    resolve(null)
                  }

                  const queueEntry = {
                    nextId,
                    tinyStockUpdate,
                    isNotQueued: true,
                    cb: (err, isDone) => {
                      if (!err && isDone) {
                        return resolve(true)
                      }
                      saveToQueue()
                    }
                  }
                  importProduct(appClient, tinyToken, queueEntry, appData, false, true)
                    .catch(saveToQueue)
                })
              }
            }
            return null
          })

          .then(statusCode => {
            if (tipo === 'produto') {
              const mapeamentos = []
              const parseTinyItem = tinyItem => {
                if (tinyItem) {
                  const { idMapeamento, id, codigo, sku } = tinyItem
                  mapeamentos.push({
                    idMapeamento: idMapeamento || id,
                    skuMapeamento: codigo || sku
                  })
                }
              }
              parseTinyItem(dados)
              if (Array.isArray(dados.variacoes)) {
                dados.variacoes.forEach(variacao => {
                  parseTinyItem(variacao.id ? variacao : variacao.variacao)
                })
              }
              return res.status(200).send(mapeamentos)
            }
            return res.sendStatus(typeof statusCode === 'number' ? statusCode : 200)
          })
      })

        .catch(err => {
          err.storeId = storeId
          err.tinyToken = tinyToken
          console.error(err)
          res.sendStatus(502)
        })
    } else {
      return res.sendStatus(400)
    }
  }

  res.sendStatus(403)
}
