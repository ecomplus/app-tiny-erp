const { getFirestore, Timestamp } = require('firebase-admin/firestore')
const errorHandling = require('../store-api/error-handling')
const Tiny = require('../tiny/constructor')
const parseOrder = require('./parsers/order-to-tiny/')
const parseStatus = require('./parsers/order-to-tiny/status')
const getOrderUpdateType = require('./helpers/get-order-update-type')
const handleJob = require('./handle-job')
const ecomUtils = require('@ecomplus/utils')
const { logger } = require('../../context')

module.exports = ({ appSdk, storeId, auth }, tinyToken, queueEntry, appData, canCreateNew) => {
  const orderId = queueEntry.nextId

  return appSdk.apiRequest(storeId, `/orders/${orderId}.json`, 'GET', null, auth)
    .then(({ response }) => {
      const order = response.data
      if (order._id !== orderId) {
        const msg = `#${storeId} ${orderId} retrieved mixed object (${order._id} ${order.number})`
        const err = new Error(msg)
        logger.error(err)
        handleJob({ appSdk, storeId }, queueEntry, Promise.reject(err))
        return null
      }
      if (!order.financial_status) {
        logger.info(`#${storeId} ${orderId} skipped with no financial status`)
        return null
      }
      const tiny = new Tiny(tinyToken)
      let { metafields } = order
      logger.info(`#${storeId} ${orderId} searching order ${order.number}`)
      const orderUpdateType = getOrderUpdateType(order)
      if (orderUpdateType === 'fulfillment') {
        const fulfillmentStatus = order.fulfillment_status && order.fulfillment_status.current
        if (fulfillmentStatus && Array.isArray(order.fulfillments)) {
          const fulfillmentFromTiny = order.fulfillments.find(({ status, flags }) => {
            return status === fulfillmentStatus && flags && flags.includes('from-tiny')
          })
          if (fulfillmentFromTiny) {
            logger.info(`#${storeId} ${orderId} skipped to not send status came by tiny`)
            return null
          }
        }
      }

      const job = tiny.post('/pedidos.pesquisa.php', { numeroEcommerce: String(order.number) })
        .catch(err => {
          const status = err.response && err.response.status
          if (status === 404) {
            return {}
          }
          logger.info(`#${storeId} ${orderId} search on tiny ends with status ${status}`)
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
                  logger.info(`#${storeId} ${orderId} skipped with status "${tinyStatus}"`)
                  return null
              }
            }
            if (appData.ready_for_shipping_only) {
              switch (tinyStatus) {
                case 'aberto':
                case 'cancelado':
                case 'aprovado':
                case 'preparando_envio':
                case 'faturado':
                  if (!order.fulfillment_status || order.fulfillment_status.current !== 'ready_for_shipping') {
                    logger.info(`#${storeId} ${orderId} skipped with status "${tinyStatus}"`)
                    return null
                  }
              }
            }
            const tinyOrder = parseOrder(order, appData, storeId)
            logger.info(`#${storeId} ${orderId} ${JSON.stringify(tinyOrder)}`)
            return tiny.post('/pedido.incluir.php', {
              pedido: {
                pedido: tinyOrder
              }
            }).then(async ({ status, registros }) => {
              if (status === 'OK' && registros && registros.registro) {
                const idTiny = registros.registro.id
                // DO NOT COPY TO v2
                if (!metafields) {
                  metafields = []
                }
                const tinyIdIndex = metafields.findIndex(({ field }) => field === 'tiny:id')
                if (tinyIdIndex > -1) {
                  metafields[tinyIdIndex].value = String(idTiny)
                } else {
                  metafields.push({
                    _id: ecomUtils.randomObjectId(),
                    namespace: 'tiny',
                    field: 'tiny:id',
                    value: String(idTiny)
                  })
                }
                if (appData.tiny_order_data && appData.tiny_order_data.id_ecommerce) {
                  metafields.push({
                    _id: ecomUtils.randomObjectId(),
                    namespace: 'tiny',
                    field: 'tiny:store',
                    value: String(appData.tiny_order_data.id_ecommerce)
                  })
                }
                logger.info('Send metafields', JSON.stringify(metafields))
                try {
                  await appSdk.apiRequest(storeId, `/orders/${orderId}.json`, 'PATCH', {
                    metafields
                  }, auth)
                  logger.info('deu certo o envio do metafield')
                } catch (error) {
                  logger.warn('deu erro no envio do metafield')
                  logger.info(error)
                }

                getFirestore().doc(`exported_orders/${orderId}`)
                  .set({
                    storeId,
                    idTiny,
                    exportedAt: Timestamp.now()
                  })
                  .catch(logger.warn)
                const isFlashCourier = order.shipping_method_label && order.shipping_method_label.toLowerCase() === 'flash courier'
                if (storeId === 51301 && idTiny && isFlashCourier && order.number) {
                  return tiny.post('/cadastrar.codigo.rastreamento.pedido.php', {
                    id: idTiny,
                    codigoRastreamento: `MONO${order.number}`,
                    urlRastreamento: `https://www.flashcourier.com.br/rastreio/MONO${order.number}`
                  })
                }
                return status
              }
            })
          } else {
            logger.info(`#${storeId} ${orderId} found with tiny status ${tinyStatus}`, {
              originalTinyOrder
            })
          }

          if (appData.update_financial_orders_only && orderUpdateType === 'fulfillment') {
            logger.info(`#${storeId} ${orderId} skipped ${tinyStatus} to be a fulfillment`)
            return null
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
