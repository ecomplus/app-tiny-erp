const errorHandling = require('../store-api/error-handling')
const Tiny = require('../tiny/constructor')
const parseOrder = require('./parsers/order-to-tiny/')
const parseStatus = require('./parsers/order-to-tiny/status')
const selectTypeUpdate = require('./helpers/select-type-update')
const handleJob = require('./handle-job')

module.exports = ({ appSdk, storeId, auth }, tinyToken, queueEntry, appData, canCreateNew) => {
  const orderId = queueEntry.nextId

  return appSdk.apiRequest(storeId, `/orders/${orderId}.json`, 'GET', null, auth)
    .then(({ response }) => {
      const order = response.data
      if (!order.financial_status) {
        console.log(`#${storeId} ${orderId} skipped with no financial status`)
        return null
      }
      const tiny = new Tiny(tinyToken)
      console.log(`#${storeId} ${orderId} searching order ${order.number}`)
      const findLatestUpdate = order => {
        const fulfillments = order.fulfillments
        const paymentsHistory = order.payments_history
        let latestFulfillment, latestPayment
        if (Array.isArray(fulfillments)) {
          latestFulfillment = fulfillments.reduce((a, b) => (a.date_time > b.date_time ? a : b))
        }
        if (Array.isArray(paymentsHistory)) {
          latestPayment = paymentsHistory.reduce((a, b) => (a.date_time > b.date_time ? a : b))
        }
        if (latestFulfillment && latestPayment) {
          return latestFulfillment.date_time > latestPayment.date_time ? latestFulfillment : latestPayment
        } else if (latestFulfillment && !latestPayment) {
          return latestFulfillment
        } else if (!latestFulfillment && latestPayment) {
          return latestPayment
        }
      }
      const latestUpdateStatus = findLatestUpdate(order)
      if (selectTypeUpdate(latestStatusUpdate) === 'fulfillment') {
        const checkFulfillmentFromTiny = order => {
          const fulfillmentStatus = order.fulfillment_status && order.fulfillment_status.current
          if (fulfillmentStatus && Array.isArray(order.fulfillments)) {
            return Boolean(order.fulfillments.find(({ status, flags }) => {
              return status === fulfillmentStatus && flags && flags.includes('from-tiny')
            }))
          }
          return false
        }
        if (checkFulfillmentFromTiny(order)) {
          console.log(`#${storeId} ${orderId} skipped to not send status came by tiny`)
          return null
        }
      }

      const job = tiny.post('/pedidos.pesquisa.php', { numeroEcommerce: String(order.number) })
        .catch(err => {
          const status = err.response && err.response.status
          if (status === 404) {
            return {}
          }
          console.log(`#${storeId} ${orderId} search on tiny ends with status ${status}`)
          throw err
        })

        .then(({ pedidos }) => {
          const tinyStatus = parseStatus(order)
          let originalTinyOrder
          if (Array.isArray(pedidos)) {
            originalTinyOrder = pedidos.find(({ pedido }) => order.number === Number(pedido.numero_ecommerce))
            if (originalTinyOrder) {
              originalTinyOrder = originalTinyOrder.pedido
            }
          }

          if (!originalTinyOrder) {
            if (!canCreateNew) {
              return null
            }
            if (appData.approved_orders_only) {
              switch (tinyStatus) {
                case 'aberto':
                case 'cancelado':
                  console.log(`#${storeId} ${orderId} skipped with status "${tinyStatus}"`)
                  return null
              }
            }
            const tinyOrder = parseOrder(order, appData, storeId)
            console.log(`#${storeId} ${orderId} ${JSON.stringify(tinyOrder)}`)
            return tiny.post('/pedido.incluir.php', {
              pedido: {
                pedido: tinyOrder
              }
            })
          } else {
            console.log(`#${storeId} ${orderId} found with tiny status ${tinyStatus}`)
          }


          if (tinyStatus) {
            return tiny.post('/pedido.alterar.situacao', {
              id: originalTinyOrder.id,
              situacao: tinyStatus
            })
          }
          return null
        })
      handleJob({ appSdk, storeId }, queueEntry, job)
    })

    .catch(err => {
      if (err.response) {
        const { status } = err.response
        if (status >= 400 && status < 500) {
          const msg = `O pedido ${orderId} não existe (:${status})`
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
