
const { Utils } = require('zignis')
const DingTalkUtils = require('../../../common/utils')
const DingBot = require('../../../common/dingbot')

exports.command = 'text <content>'
exports.desc = 'Send text type bot message'
// exports.aliases = ''

exports.builder = function (yargs) {
  yargs.option('at', { default: false, describe: '@PHONE_NUMBER' })
  yargs.option('at-all', { describe: '@ALL', alias: 'all' })
  // yargs.commandDir('text')
}

exports.handler = function (argv) {
  argv.at = Utils._.isArray(argv.at) ? argv.at : [argv.at]
  return Utils.co(function * () {
    const token = yield DingTalkUtils.getToken(argv)
    const dingbot = new DingBot(token)
    yield dingbot.send({
      "msgtype": "text",
      "text": {
        "content": argv.content
      },
      "at": {
        "atMobiles": argv.at, 
        "isAtAll": argv.atAll
      }
    })
  }).catch(e => Utils.error(e.stack))
}
