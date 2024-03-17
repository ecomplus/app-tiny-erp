const axios = require('axios')

module.exports = function (token) {
  this.post = (url, body, options) => {
    // https://www.tiny.com.br/ajuda/api/api2
    let data = `token=${token}&formato=JSON`
    if (body) {
      for (const field in body) {
        if (body[field]) {
          switch (typeof body[field]) {
            case 'object':
              data += `&${field}=${JSON.stringify(body[field])}`
              break
            case 'string':
            case 'number':
              data += `&${field}=${body[field]}`
          }
        }
      }
    }

    return axios.post(url, data, {
      baseURL: 'https://api.tiny.com.br/api2/',
      timeout: 30000,
      ...options
    })
      .then(response => {
        const { retorno } = response.data
        console.log('>> Debug Retorno =>  ', retorno, retorno.registros, ' <<')
        if (retorno.status === 'Erro') {
          const err = new Error('Tiny error response')
          const tinyErrorCode = parseInt(retorno.codigo_erro, 10)
          if (tinyErrorCode <= 2) {
            response.status = 401
          } else if (tinyErrorCode === 6) {
            response.status = 503
          } else if (tinyErrorCode === 20) {
            response.status = 404
          }
          err.response = response
          err.config = response.config
          err.request = response.request
          throw err
        }
        return retorno
      })
  }

  return this
}
