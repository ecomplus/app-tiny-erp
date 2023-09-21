// DO NOT COPY TO v2
const logger = require('firebase-functions/logger')
const { getFirestore } = require('firebase-admin/firestore')
const getAppData = require('./../../lib/store-api/get-app-data')
const updateAppData = require('../store-api/update-app-data')

module.exports = async ({ appSdk }) => {
  const d = new Date()
  d.setHours(d.getHours() - 12)
  const storeId = 1032
  const endpoint = '/orders.json' +
    '?financial_status.current=paid' +
    `&financial_status.updated_at>=${d.toISOString()}` +
    `&updated_at<=${(new Date(Date.now() - 60000).toISOString())}` +
    '&fields=_id,number' +
    '&sort=created_at'
  const { response } = await appSdk.apiRequest(storeId, endpoint, 'GET')
  const { data: { result } } = response
  const db = getFirestore()
  const ordersToQueue = []
  for (let i = 0; i < result.length; i++) {
    const orderId = result[i]
    if (!(await db.doc(`exported_orders/${orderId}`).get()).exists) {
      ordersToQueue.push(orderId)
    }
  }
  if (ordersToQueue.length) {
    const appData = await getAppData({ appSdk, storeId })
    const action = 'exportation'
    const queue = 'order_ids'
    let queueList = appData[action] && appData[action][queue]
    if (!Array.isArray(queueList)) {
      queueList = []
    }
    ordersToQueue.forEach((nextId) => {
      if (!queueList.includes(nextId)) {
        queueList.unshift(nextId)
      }
    })
    await updateAppData({ appSdk, storeId }, {
      [action]: {
        ...appData[action],
        [queue]: queueList
      }
    })
  }
  logger.info(`${ordersToQueue.length} orders to queue`, { ordersToQueue })
}
