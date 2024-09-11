// const getAppData = require('../store-api/get-app-data')
const { logger } = require('../../../context')
const { Timestamp } = require('firebase-admin/firestore')

module.exports = async (change, context) => {
  const { docId } = context.params
  if (!change.after.exists) {
    return null
  }

  // const appSdk = await getAppSdk()
  logger.info(`docId: ${docId}`)
  const doc = change.after

  const data = doc.data()
  const {
    productId,
    // anexos,
    storeId,
    processingAt
  } = data
  if (storeId > 100) {
    logger.info(`Event: StoreId ${storeId} productId: ${productId}`)
    const now = Timestamp.now()
    const processingTime = processingAt && (now.toMillis() - processingAt.toMillis())
    const isProcessing = processingTime && processingTime < (2 * 60 * 1000)
    // logger.info(`${isProcessing ? 'Processing' : ''} ${processingTime || 0}ms`)
    if (isProcessing) {
      logger.info(`Skip document ${docId} => is processing time: ${processingTime} ms `)
      return null
    }

    // logger.info(`${storeId} ${productId} ${JSON.stringify(anexos)}`)
  }
  return null
}
