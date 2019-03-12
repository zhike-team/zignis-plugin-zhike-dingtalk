
const { Utils } = require('zignis')
const DingTalkUtils = require('../../../common/utils')
const DingBot = require('../../../common/dingbot')

exports.command = 'link <title> <text> <messageUrl>'
exports.desc = 'Send link type bot message'
// exports.aliases = ''

exports.builder = function (yargs) {
  yargs.option('pic-url', { default: false, describe: 'link picture url', alias: 'pic' })
  // yargs.commandDir('text')
}

exports.handler = function (argv) {
  return Utils.co(function * () {
    const token = yield DingTalkUtils.getToken(argv)
    const dingbot = new DingBot(token)
    yield dingbot.send({
      "msgtype": "link",
      "link": {
        "title": argv.title,
        "text": argv.text,
        "messageUrl": argv.messageUrl,
        "picUrl": argv.picUrl,
      },
    })
  }).catch(e => Utils.error(e.stack))
}
