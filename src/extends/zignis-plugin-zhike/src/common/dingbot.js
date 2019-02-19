
const { api } = require('zignis-plugin-zhike')
const API = api('zignis-plugin-dingtalk')

class DingBot {
  constructor(token) {
    this.token = token
  }

  * send(options) {
    yield API.post(`https://oapi.dingtalk.com/robot/send?access_token=${this.token}`, options)
  }
}

module.exports = DingBot