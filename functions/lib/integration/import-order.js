const { firestore } = require('firebase-admin')
const Tiny = require('../tiny/constructor')
const parseOrder = require('./parsers/order-to-ecomplus/')
const parseStatus = require('./parsers/order-to-ecomplus/status')
const handleJob = require('./handle-job')
const { logger } = require('../../context')

const getLastStatus = records => {
  let statusRecord
  records.forEach(record => {
    if (record && (!statusRecord || !record.date_time || record.date_time >= statusRecord.date_time)) {
      statusRecord = record
    }
  })
  return statusRecord && statusRecord.status
}

module.exports = ({ appSdk, storeId, auth }, tinyToken, queueEntry, appData, canCreateNew) => {
  const tinyOrderNumber = queueEntry.nextId
  const tiny = new Tiny(tinyToken)

  const getTinyOrder = tinyOrderId => {
    return tiny.post('/pedido.obter.php', { id: Number(tinyOrderId) })
      .then(({ pedido }) => {
        const situacao = typeof pedido.situacao === 'string'
          ? pedido.situacao.toLowerCase()
          : null
        const orderNumber = pedido.numero_ecommerce
        logger.info(`#${storeId} import order n${orderNumber} ${tinyOrderId} => ${situacao}`)
        const documentRef = firestore().doc(`tiny_orders/${storeId}_${tinyOrderId}`)
        return documentRef.get().then(documentSnapshot => {
          if (
            documentSnapshot.exists &&
            documentSnapshot.get('situacao') === situacao
          ) {
            logger.info(`>> Ignoring Tiny order n${orderNumber} ${tinyOrderId} with same status`)
            return null
          }

          let listEndpoint = '/orders.json?limit=1&fields=_id,payments_history,fulfillments,shipping_lines'
          if (orderNumber) {
            listEndpoint += `&number=${orderNumber}`
          } /* else {
            listEndpoint += `&metafields.field=tiny:id&metafields.value=${tinyOrderId}`
          } */
          return appSdk.apiRequest(storeId, listEndpoint, 'GET', null, auth)

            .then(({ response }) => {
              const { result } = response.data
              if (!result.length) {
                return null
              }
              const order = result[0]

              return parseOrder(pedido, order.shipping_lines, tiny).then(partialOrder => {
                const promises = []
                if (partialOrder && Object.keys(partialOrder).length) {
                  promises.push(appSdk
                    .apiRequest(storeId, `/orders/${order._id}.json`, 'PATCH', partialOrder, auth))
                }
                const mapStatus = appData.tiny_map_status || []
                if (storeId === 4566) {
                  logger.info(`Mapeando status ${JSON.stringify(mapStatus)})`)
                }
                const { fulfillmentStatus, financialStatus } = parseStatus(situacao, mapStatus, storeId)
                const data = {
                  date_time: new Date().toISOString(),
                  flags: ['from-tiny']
                }

                ;[
                  [financialStatus, 'payments_history'],
                  [fulfillmentStatus, 'fulfillments']
                ].forEach(([newStatus, subresource]) => {
                  if (
                    newStatus &&
                    (!order[subresource] || getLastStatus(order[subresource]) !== newStatus)
                  ) {
                    data.status = newStatus
                    const endpoint = `/orders/${order._id}/${subresource}.json`
                    promises.push(appSdk.apiRequest(storeId, endpoint, 'POST', data, auth))
                    logger.info(`#${storeId} ${order._id} updated to ${newStatus} from Tiny ${tinyOrderId}`)
                  }
                })

                return Promise.all(promises).then(([firstResult]) => firstResult)
              })
            })

            .then(payload => {
              try {
                documentRef.set({
                  storeId,
                  situacao,
                  updatedAt: firestore.Timestamp.fromDate(new Date())
                })
              } catch (err) {
                logger.error(err)
              }
              return (payload && payload.response) || payload
            })
        })
      })
  }

  let job
  if (typeof tinyOrderNumber === 'string' && tinyOrderNumber.startsWith('id:')) {
    job = getTinyOrder(tinyOrderNumber.substring(3))
  } else {
    const filter = typeof tinyOrderNumber === 'string' && tinyOrderNumber.startsWith('ecom:')
      ? { numeroEcommerce: tinyOrderNumber.substring(5) }
      : { numero: tinyOrderNumber }
    job = tiny.post('/pedidos.pesquisa.php', filter)
      .then(({ pedidos }) => {
        let prop = 'numero'
        let tinyOrderNumberSearch = tinyOrderNumber
        if (filter && filter.numeroEcommerce) {
          prop = 'numero_ecommerce'
          tinyOrderNumberSearch = tinyOrderNumber.substring(5)
        }
        const tinyOrder = pedidos.find(({ pedido }) => Number(tinyOrderNumberSearch) === Number(pedido[prop]))
        if (tinyOrder) {
          return getTinyOrder(tinyOrder.pedido.id)
        } else {
          return null
        }
      })
  }

  handleJob({ appSdk, storeId }, queueEntry, job)

  return Promise.resolve()
}
