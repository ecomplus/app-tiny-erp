// const getAppData = require('../store-api/get-app-data')
const { logger } = require('../../../context')
const { Timestamp } = require('firebase-admin/firestore')
const { getAppSdk } = require('./utils')

const getProductById = (appSdk, storeId, auth, productId) => appSdk
  .apiRequest(storeId, `/products/${productId}.json`, 'GET', null, auth)
  .then(({ response }) => response.data)
  .catch(logger.error)
module.exports = async (change, context) => {
  const { docId } = context.params
  if (!change.after.exists) {
    return null
  }

  logger.info(`docId: ${docId}`)
  const doc = change.after

  const data = doc.data()
  const {
    productId,
    anexos,
    storeId,
    processingAt,
    isNew
  } = data
  if (storeId > 100) {
    logger.info(`Event: StoreId ${storeId} productId: ${productId} ${isNew}`)
    const now = Timestamp.now()
    const processingTime = processingAt && (now.toMillis() - processingAt.toMillis())
    const isProcessing = processingTime && processingTime < (2 * 60 * 1000)
    // logger.info(`${isProcessing ? 'Processing' : ''} ${processingTime || 0}ms`)
    if (isProcessing) {
      logger.info(`Skip document ${docId} => is processing time: ${processingTime} ms`)
      return null
    } else {
      const appSdk = await getAppSdk()
      const auth = await appSdk.getAuth(storeId)
      const promises = await Promise.all([
        // getAppData({ appSdk, storeId, auth }, true),
        getProductById(appSdk, storeId, auth, productId),
        doc.ref.set({ processingAt: now }, { merge: true })
      ])
      // const appData = promises[0]
      const product = promises[0]
      logger.info(`${JSON.stringify(product)} anexos: ${JSON.stringify(anexos)}`)
    }

    // logger.info(`${storeId} ${productId} ${JSON.stringify(anexos)}`)
  }
  return null
}
