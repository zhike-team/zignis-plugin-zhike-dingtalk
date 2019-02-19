
const { Utils } = require('zignis')
const DingTalkUtils = require('../../../common/utils')
const DingBot = require('../../../common/dingbot')

exports.command = 'feed-card'
exports.desc = 'Send FeedCard type bot message'
exports.aliases = 'feed'

exports.builder = function (yargs) {
  yargs.option('links', { default: false, describe: 'can be multiple will format like: TITLE|MESSAGE_URL|PIC_URL' })
  // yargs.commandDir('text')
}

exports.handler = function (argv) {
  argv.links = !argv.links || Utils._.isArray(argv.links) ? argv.links : [argv.links]
  Utils.co(function * () {
    const token = yield DingTalkUtils.getToken(argv)
    const dingbot = new DingBot(token)
    yield dingbot.send({
      "feedCard": {
        "links": argv.links ? argv.links.map(line => {
          const split = line.split('|')
          return {
            title: split[0] || '',
            messageURL: split[1] || '',
            picURL: split[2] || ''
          }
        }) : [],
      }, 
      "msgtype": "feedCard"
  })
  }).catch(e => Utils.error(e.stack))
}
