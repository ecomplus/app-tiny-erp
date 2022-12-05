const admin = require('firebase-admin')
const { setup } = require('@ecomplus/application-sdk')

const getAppData = require('../store-api/get-app-data')
// const updateAppData = require('../store-api/update-app-data')
const importProduct = require('../integration/import-product')
const importOrder = require('../integration/import-order')

const getAppSdk = () => {
  return new Promise(resolve => {
    setup(null, true, admin.firestore())
      .then(appSdk => resolve(appSdk))
  })
}

module.exports = async (
  {
    tinyToken,
    storeId,
    body
  },
  context
) => {
  console.log('>> Exec Event ', context.eventId)
  const appSdk = await getAppSdk(admin)

  return appSdk.getAuth(storeId).then(auth => {
    const appClient = { appSdk, storeId, auth }
    return getAppData(appClient)
      .then(appData => {
        if (appData.tiny_api_token !== tinyToken) {
          console.error('> Tiny Api Token not found or invalid')
          return
        }

        const { dados, tipo } = body

        if (dados.idVendaTiny) {
          let orderNumbers = appData.___importation && appData.___importation.order_numbers
          if (!Array.isArray(orderNumbers)) {
            orderNumbers = []
          }
          const orderNumber = `id:${dados.idVendaTiny}`

          if (!orderNumbers.includes(orderNumber)) {
            return new Promise((resolve, reject) => {
              console.log(`> Tiny webhook: #${storeId} order ${orderNumber}`)

              const queueEntry = {
                nextId: orderNumber,
                isNotQueued: true,
                cb: (err, isDone) => {
                  if (!err && isDone) {
                    return resolve(true)
                  }
                  throw err
                }
              }
              importOrder(appClient, tinyToken, queueEntry, appData, false, true)
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
                },
                updatedAt: admin.firestore.Timestamp.fromDate(new Date())
              }
              console.log(`> Tiny webhook: #${storeId} ${nextId} => ${tinyStockUpdate.produto.saldo}`)

              const queueEntry = {
                nextId,
                tinyStockUpdate,
                isNotQueued: true,
                cb: (err, isDone) => {
                  if (!err && isDone) {
                    return resolve(true)
                  }
                  throw err
                }
              }
              importProduct(appClient, tinyToken, queueEntry, appData, false, true)
            })
          }
        }
        return null
      })
      .then(() => {
        console.log('>> End Event ', context.eventId)
      })
  })
}
