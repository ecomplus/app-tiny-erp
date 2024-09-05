const _logger = require('firebase-functions/logger')
const { AsyncLocalStorage } = require('node:async_hooks')

const asyncLocalStorage = new AsyncLocalStorage()

const createExecContext = (next) => {
  return (...args) => asyncLocalStorage.run({ execId: `${Date.now() + Math.random()}` }, () => next(...args))
}

const log = (level, msg, d) => {
  const execId = asyncLocalStorage.getStore()?.execId
  if (execId) {
    if (d) d.execId = execId
    else d = { execId }
  }
  return _logger[level](msg, d)
}

const logger = {
  info (msg, d) {
    return log('info', msg, d)
  },
  warn (msg, d) {
    return log('warn', msg, d)
  },
  error (msg, d) {
    return log('error', msg, d)
  }
}

module.exports = {
  asyncLocalStorage,
  createExecContext,
  logger
}
