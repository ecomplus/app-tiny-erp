const functions = require('firebase-functions')
const { logger } = require('../../context')
const getPubSubTopic = (eventName) => {
  return `${eventName}_events`
}

const createPubSubFunction = (
  pubSubTopic,
  fn,
  eventMaxAgeMs = (2 * 60 * 1000)
) => {
  return functions
    .runWith({ failurePolicy: true })
    .pubsub.topic(pubSubTopic).onPublish((message, context) => {
      const eventAgeMs = Date.now() - Date.parse(context.timestamp)
      if (eventAgeMs > eventMaxAgeMs) {
        logger.warn(`Dropping event ${context.eventId} with age[ms]: ${eventAgeMs}`)
        return
      }
      return fn(message.json, context, message)
    })
}

const createEventsFunction = (
  eventName,
  fn,
  eventMaxAgeMs = (2 * 60 * 1000)
) => {
  const topicName = getPubSubTopic(eventName)
  return createPubSubFunction(topicName, fn, eventMaxAgeMs)
}

module.exports = {
  createEventsFunction,
  getPubSubTopic
}
