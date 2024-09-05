const admin = require('firebase-admin')
const { setup } = require('@ecomplus/application-sdk')
const { getFirestore } = require('firebase-admin/firestore')
const Tiny = require('./constructor')

const parseVariation = require('../integration/parsers/product-to-tiny-variation')
const { logger } = require('../../context')

const getAppSdk = () => {
  return new Promise(resolve => {
    setup(null, true, admin.firestore())
      .then(appSdk => resolve(appSdk))
  })
}

const firestoreColl = 'tiny_variations'
module.exports = async () => {
  const appSdk = await getAppSdk(admin)
  let documentRef, storeId, product, variations, originalTinyProduct, appData
  if (firestoreColl) {
    const db = getFirestore()
    const d = new Date(new Date().getTime() - 9000)
    const documentSnapshot = await db.collection(firestoreColl)
      .where('queuedAt', '<=', d)
      .orderBy('queuedAt')
      .limit(1)
      .get()
    const { docs } = documentSnapshot
    const info = docs && docs.length && docs[0] && docs[0].data()
    if (info) {
      storeId = info.storeId
      appData = info.appData
      product = info.product
      variations = info.variations
      originalTinyProduct = info.originalTinyProduct
      const tiny = new Tiny(appData.tiny_api_token)
      documentRef = require('firebase-admin')
        .firestore()
        .doc(`${firestoreColl}/${product.sku}`)
      return appSdk.getAuth(storeId)
        .then(async (auth) => {
          if (variations && variations.length) {
            const products = variations.slice(0, 8)
            for (let i = 0; i < products.length; i++) {
              try {
                logger.info('Sending:', products.length, 'index:', i)
                const parsedVariation = parseVariation(product, products[i], originalTinyProduct, appData, storeId)
                await new Promise((resolve) => setTimeout(resolve, 1000))
                const bodyTiny = {
                  produto: {
                    produtos: [{
                      produto: parsedVariation
                    }]
                  }
                }
                logger.info('Body variation', JSON.stringify(bodyTiny))
                tiny.post('/produto.alterar.php', bodyTiny).then(async response => {
                  logger.info(`Product ${products[i].codigo} sync successfully | #${storeId} ${JSON.stringify(response.data)}`)
                  variations.splice(i, 1)
                  logger.info(`interaction: ${i} variations: ${JSON.stringify(variations)}`)
                  if (variations.length === 0) {
                    await docs[0].ref.delete()
                  } else {
                    const body = {
                      storeId,
                      product,
                      variations,
                      appData,
                      queuedAt: admin.firestore.Timestamp.now()
                    }
                    if (originalTinyProduct) {
                      body.originalTinyProduct = originalTinyProduct
                    }
                    await documentRef.set(body)

                    logger.info(`#${storeId} saving in firestore list of products after create or update ${products.length}`)
                  }
                })
              } catch (err) {
                logger.warn(`Product ${products[i]._id} sync failed | #${storeId}`)
                logger.error(err)
              }
            }
          }
        })
        .catch((err) => {
          if (err.appWithoutAuth) {
            logger.error(err)
          } else {
            throw err
          }
        })
        .then(() => {
          logger.info('>> End Event exportation')
        })
    }
  }
}
