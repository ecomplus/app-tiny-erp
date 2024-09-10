const { logger } = require('../../context')
const PubSub = require('@google-cloud/pubsub').PubSub
const getPubSubTopic = require('../../lib/pubsub/create-topic').getPubSubTopic

const sendMessageTopic = async (eventName, json) => {
  const topicName = getPubSubTopic(eventName)
  const messageId = await new PubSub()
    .topic(topicName)
    .publishMessage({ json })

  logger.info(`>> MessageId: ${messageId} Topic: ${topicName}`)

  return Promise.resolve(200)
}

exports.get = ({ appSdk, admin }, req, res) => {
  return res.sendStatus(200)
}

exports.post = ({ appSdk, admin }, req, res) => {
  const tinyToken = req.query.token
  const storeId = parseInt(req.query.store_id, 10)

  if (storeId > 100 && typeof tinyToken === 'string' && tinyToken && req.body) {
    logger.info(`storeId: ${storeId} => ${JSON.stringify(req.body)}`)
    const { dados, tipo } = req.body
    if (dados) {
      /*
      TODO: check Tiny server IPs
      const clientIp = req.get('x-forwarded-for') || req.connection.remoteAddress
      */

      return sendMessageTopic('tiny', { tinyToken, storeId, body: req.body, flag: 'webhook' })
        .then(statusCode => {
          if (tipo === 'produto' || (tipo === 'precos')) {
            const mapeamentos = []
            const parseTinyItem = tinyItem => {
              if (tinyItem) {
                const { idMapeamento, id, codigo, sku } = tinyItem
                mapeamentos.push({
                  idMapeamento: idMapeamento || id,
                  skuMapeamento: codigo || sku
                })
              }
            }
            parseTinyItem(dados)
            if (Array.isArray(dados.variacoes)) {
              dados.variacoes.forEach(variacao => {
                parseTinyItem(variacao.id ? variacao : variacao.variacao)
              })
            }
            return res.status(200).send(mapeamentos)
          }
          return res.sendStatus(typeof statusCode === 'number' ? statusCode : 200)
        })

        .catch(err => {
          err.storeId = storeId
          err.tinyToken = tinyToken
          logger.error(err)
          res.sendStatus(502)
        })
    } else {
      return res.sendStatus(400)
    }
  }

  return res.sendStatus(403)
}
