const ecomClient = require('@ecomplus/client')
const admin = require('firebase-admin')
const { firestore } = require('firebase-admin')
const errorHandling = require('../store-api/error-handling')
const Tiny = require('../tiny/constructor')
const parseProduct = require('./parsers/product-to-tiny')
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
          const path = originalTinyProduct ? '/produto.alterar.php' : '/produto.incluir.php'
          return tiny.post(path, {
            produto: {
              produtos: [{
                produto: tinyProduct
              }]
            }
          }).then(async result => {
            if (tinyProduct.variacoes && tinyProduct.variacoes.length && product) {
              const documentRef = firestore().doc(`tiny_variations/${product.sku}`)
              const body = {
                storeId,
                product,
                variations: tinyProduct.variacoes,
                appData,
                queuedAt: admin.firestore.Timestamp.now()
              }
              if (originalTinyProduct) {
                body.originalTinyProduct = originalTinyProduct
              }
              try {
                await documentRef.set(body)
              } catch (error) {
                console.log('não inseriu no firestore', error) 
              }
            }
          })
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
