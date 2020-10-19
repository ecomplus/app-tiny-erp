const axios = require('axios')
const xmlJs = require('xml-js')

module.exports = function (token) {
  this.post = (url, body, options) => {
    // https://www.tiny.com.br/ajuda/api/api2
    let data = `token=${token}&formato=JSON`
    if (body) {
      for (const field in body) {
        if (body[field]) {
          switch (typeof body[field]) {
            case 'object':
              data += `&${field}=${xmlJs.js2xml(body[field])}`
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
  }

  return this
}
