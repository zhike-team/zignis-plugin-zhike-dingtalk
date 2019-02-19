const fs = require('fs')
const path = require('path')
const { Utils } = require('zignis')
const DingTalkUtils = require('../../../common/utils')
const DingBot = require('../../../common/dingbot')

exports.command = 'markdown <text>'
exports.desc = 'Send markdown type bot message'
exports.aliases = 'md'

exports.builder = function (yargs) {
  yargs.option('at', { default: false, describe: '@PHONE_NUMBER' })
  yargs.option('at-all', { default: false, describe: '@ALL', alias: 'all' })
  yargs.option('file', { default: false, describe: 'If set, text will be used as markdown file path in current directory.' })
  yargs.option('title', { default: 'Markdown Message', describe: 'Title will be used in stream.' })
  // yargs.commandDir('text')
}

exports.handler = function (argv) {
  argv.at = Utils._.isArray(argv.at) ? argv.at : [argv.at]

  let text = argv.text
  if (argv.file) {
    if (fs.existsSync(path.resolve(process.cwd(), argv.text))) {
      text = fs.readFileSync(path.resolve(process.cwd(), argv.text), { encoding: 'utf8' })
    } else {
      Utils.error('Markdown file not exist')
    }
  }


  Utils.co(function * () {
    const token = yield DingTalkUtils.getToken(argv)
    const dingbot = new DingBot(token)
    yield dingbot.send({
      "msgtype": "markdown",
      "markdown": {
        "title": argv.title,
        "text": text
      },
      "at": {
        "atMobiles": argv.at, 
        "isAtAll": argv.atAll
      }
    })
  }).catch(e => Utils.error(e.stack))
}
