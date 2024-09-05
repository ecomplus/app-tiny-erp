/* eslint-disable no-loop-func, promise/no-nesting */
const { logger } = require('../../context')
const { baseUri, operatorToken } = require('./../../__env')
// read configured E-Com Plus app data
const getAppData = require('./../../lib/store-api/get-app-data')

// async integration handlers
const integrationHandlers = {
  exportation: {
    product_ids: require('./../../lib/integration/export-product'),
    order_ids: require('./../../lib/integration/export-order')
  },
  importation: {
    skus: require('./../../lib/integration/import-product'),
    order_numbers: require('./../../lib/integration/import-order')
  }
}

const SKIP_TRIGGER_NAME = 'SkipTrigger'
const ECHO_SUCCESS = 'SUCCESS'
const ECHO_SKIP = 'SKIP'
const ECHO_API_ERROR = 'STORE_API_ERR'
const handlingIds = []

const removeFromQueue = (resourceId) => {
  logger.info(handlingIds)
  const handlingIndex = handlingIds.indexOf(resourceId)
  handlingIds.splice(handlingIndex, 1)
}

exports.post = async ({ appSdk, admin }, req, res) => {
  // receiving notification from Store API
  const { storeId } = req
  if (req.get('host') && !baseUri.includes(req.get('host'))) {
    logger.info('>>> Proxy to function v2')
    const axios = require('axios')
    try {
      const { status, data } = await axios.post(req.url, req.body, {
        baseURL: baseUri,
        headers: {
          'x-store-id': storeId,
          'x-operator-token': operatorToken
        }
      })
      logger.info(`>>> Webhook proxy response: ${status} ${data}`)
      return res.status(status).send(data)
    } catch (error) {
      const err = new Error('Error proxying to function v2')
      err.config = error.config
      err.response = {
        status: error.response.status,
        data: error.response.data
      }
      logger.error(err)
    }
  }

  /**
   * Treat E-Com Plus trigger body here
   * Ref.: https://developers.e-com.plus/docs/api/#/store/triggers/
   */
  const trigger = req.body
  const resourceId = trigger.resource_id || trigger.inserted_id
  logger.info(`>> ${resourceId} - Action: ${trigger.action}`)
  if (!handlingIds.includes(resourceId)) {
    handlingIds.push(resourceId)
    const key = `${trigger.resource}_${resourceId}`
    // get app configured options
    appSdk.getAuth(storeId)
      .then(auth => {
        return getAppData({ appSdk, storeId, auth })

          .then(appData => {
            if (
              Array.isArray(appData.ignore_triggers) &&
              appData.ignore_triggers.indexOf(trigger.resource) > -1
            ) {
              // ignore current trigger
              const err = new Error()
              err.name = SKIP_TRIGGER_NAME
              throw err
            }

            /* DO YOUR CUSTOM STUFF HERE */
            logger.info(`> Webhook #${storeId} ${resourceId} [${trigger.resource}]`)

            const tinyToken = appData.tiny_api_token
            if (typeof tinyToken === 'string' && tinyToken) {
              let integrationConfig
              let canCreateNew = false

              switch (trigger.resource) {
                case 'applications':
                  integrationConfig = appData
                  canCreateNew = true
                  break
                case 'products':
                  if (trigger.body) {
                    if (trigger.action === 'create') {
                      if (!appData.new_products) {
                        break
                      }
                      canCreateNew = true
                    } else if (!trigger.body.price || !appData.update_price) {
                      break
                    }
                    integrationConfig = {
                      _exportation: {
                        product_ids: [resourceId]
                      }
                    }
                  }
                  break
                case 'orders':
                  if (trigger.body) {
                    canCreateNew = Boolean(appData.new_orders)
                    integrationConfig = {
                      _exportation: {
                        order_ids: [resourceId]
                      }
                    }
                  }
                  break
              }

              if (integrationConfig) {
                const actions = Object.keys(integrationHandlers)
                actions.forEach(action => {
                  for (let i = 1; i <= 3; i++) {
                    actions.push(`${('_'.repeat(i))}${action}`)
                  }
                })
                for (let i = 0; i < actions.length; i++) {
                  const action = actions[i]
                  const actionQueues = integrationConfig[action]

                  if (typeof actionQueues === 'object' && actionQueues) {
                    for (const queue in actionQueues) {
                      const ids = actionQueues[queue]
                      if (Array.isArray(ids) && ids.length) {
                        const isHiddenQueue = action.charAt(0) === '_'
                        const mustUpdateAppQueue = trigger.resource === 'applications'
                        const handlerName = action.replace(/^_+/, '')
                        const handler = integrationHandlers[handlerName][queue.toLowerCase()]
                        const nextId = ids[0]

                        if (
                          typeof nextId === 'string' &&
                          nextId.length &&
                          handler
                        ) {
                          const debugFlag = `#${storeId} ${action}/${queue}/${nextId}`
                          const delayMs = 6000

                          logger.info(`> Starting ${debugFlag}`)
                          const queueEntry = { action, queue, nextId, key, mustUpdateAppQueue }

                          return new Promise((resolve, reject) => {
                            setTimeout(() => {
                              handler(
                                { appSdk, storeId, auth },
                                tinyToken,
                                queueEntry,
                                appData,
                                canCreateNew,
                                isHiddenQueue
                              )
                                .then(() => resolve({ appData, action, queue }))
                                .catch(reject)
                            }, delayMs)
                          })
                        }
                      }
                    }
                  }
                }
              }
            }
            // nothing to do
            return {}
          })

          .then(({ appData, action, queue }) => {
            removeFromQueue(resourceId)
            if (appData) {
              if (appData[action] && Array.isArray(appData[action][queue])) {
                res.status(202)
              } else {
                res.status(201)
              }
              res.send(`> Processed \`${action}.${queue}\``)
            } else {
              res.send(ECHO_SUCCESS)
            }
            return {}
          })
      })
      .catch(err => {
        removeFromQueue(resourceId)
        if (err.name === SKIP_TRIGGER_NAME) {
          // trigger ignored by app configuration
          res.send(ECHO_SKIP)
        } else {
          if (err.response) {
            const error = new Error('Webhook process request error')
            error.config = JSON.stringify(err.config)
            error.response = JSON.stringify({
              status: err.response.status,
              data: err.response.data
            })
            logger.error(error)
          } else {
            logger.error(err)
          }
          // request to Store API with error response
          // return error status code
          res.status(500)
          const { message } = err
          res.send({
            error: ECHO_API_ERROR,
            message
          })
        }
      })
  } else {
    logger.info(`# Skipped in execution #${resourceId} [${trigger.resource} - ${trigger.action}]`)
    res.status(203).send('Concurrent request with same ResourceId')
  }
}
