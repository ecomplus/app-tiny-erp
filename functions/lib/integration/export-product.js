const ecomClient = require('@ecomplus/client')
const errorHandling = require('../store-api/error-handling')
const Tiny = require('../tiny/constructor')
const parseProduct = require('./parsers/product-to-tiny')
const parseProductVariation = require('./parsers/product-to-tiny-variation')
const handleJob = require('./handle-job')

module.exports = ({ appSdk, storeId }, tinyToken, queueEntry, appData, canCreateNew) => {
  const productId = queueEntry.nextId
  return ecomClient.store({
    storeId,
    url: `/products/${productId}.json`
  })

    .then(({ data }) => {
      const product = data
      const tiny = new Tiny(tinyToken)

      const job = tiny.post('/produtos.pesquisa.php', { pesquisa: product.sku })
        .catch(err => {
          if (err.response && err.response.status === 404) {
            return {}
          }
          throw err
        })

        .then(async ({ produtos }) => {
          let originalTinyProduct
          if (Array.isArray(produtos)) {
            originalTinyProduct = produtos.find(({ produto }) => product.sku === String(produto.codigo))
            if (originalTinyProduct) {
              originalTinyProduct = originalTinyProduct.produto
            } else if (!canCreateNew) {
              return null
            }
          }
          const tinyProduct = parseProduct(product, originalTinyProduct, appData, storeId)
          const promises = []
          const path = originalTinyProduct ? '/produto.alterar.php' : '/produto.incluir.php'
          promises.push(tiny.post(path, {
            produto: {
              produtos: [{
                produto: tinyProduct
              }]
            }
          }))
          try {
            if (tinyProduct.variacoes && tinyProduct.variacoes.length) {
              for (let index = 0; index < tinyProduct.variacoes.length; index++) {
                const variacao = tinyProduct.variacoes[index];
                const tinyProductVariation = parseProductVariation(product, variacao, originalTinyProduct, appData, storeId)
                promises.push(tiny.post(path, {
                  produto: {
                    produtos: [{
                      produto: tinyProductVariation
                    }]
                  }
                }))
              }
            }
            return Promise.all(promises).then(results => {
              console.log(results)
            })
          } catch (error) {
            console.log('error from sending to tiny', error)
          }
        })
      handleJob({ appSdk, storeId }, queueEntry, job)
    })

    .catch(err => {
      if (err.response) {
        const { status } = err.response
        if (status >= 400 && status < 500) {
          const msg = `O produto ${productId} não existe (:${status})`
          const err = new Error(msg)
          err.isConfigError = true
          handleJob({ appSdk, storeId }, queueEntry, Promise.reject(err))
          return null
        }
      }
      errorHandling(err)
      throw err
    })
}
