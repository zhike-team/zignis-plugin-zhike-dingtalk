const fs = require('fs')
const path = require('path')
const { Utils } = require('zignis')
const DingTalkUtils = require('../../../common/utils')
const DingBot = require('../../../common/dingbot')

exports.command = 'action-card <text>'
exports.desc = 'Send ActionCard type bot message'
exports.aliases = 'action'

exports.builder = function (yargs) {
  yargs.option('file', { default: false, describe: 'if set, text will be used as markdown file path in current directory.' })
  yargs.option('btn-orientation', { default: false, describe: 'if set, btns will be horizontal!' })
  yargs.option('hide-avatar', { default: false, describe: 'if set, avatar will be hidden!' })
  yargs.option('btns', { default: false, describe: 'can be multiple will format like: TITLE|LINK' })
  yargs.option('title', { default: 'ActionCard Message', describe: 'Title will be used in stream.' })
  yargs.option('single-title', { default: '阅读全文', describe: 'Single mode action title.' })
  yargs.option('single-url', { default: false, describe: 'Single mode action url.' })
  yargs.option('single', { default: false, describe: 'Short format for single title and single url, format: TITLE|LINK.' })
  // yargs.commandDir('text')
}

exports.handler = function (argv) {
  argv.at = !argv.at || Utils._.isArray(argv.at) ? argv.at : [argv.at]
  argv.btns = !argv.btns || Utils._.isArray(argv.btns) ? argv.btns : [argv.btns]

  let text = argv.text
  if (argv.file) {
    if (fs.existsSync(path.resolve(process.cwd(), argv.text))) {
      text = fs.readFileSync(path.resolve(process.cwd(), argv.text), { encoding: 'utf8' })
    } else {
      Utils.error('Markdown file not exist')
    }
  }

  if (argv.single) {
    let split = argv.single.split('|')
    argv.singleTitle = split[0] || ''
    argv.singleUrl = split[1] || ''
  }

  return Utils.co(function * () {
    const token = yield DingTalkUtils.getToken(argv)
    const dingbot = new DingBot(token)
    yield dingbot.send({
      actionCard: {
        title: argv.title, 
        text: text,
        hideAvatar: argv.hideAvatar ? '1' : '0',
        btnOrientation: argv.btnOrientation ? '1': '0', 
        btns: argv.btns ? argv.btns.map(line => {
          const split = line.split('|')
          return {
            title: split[0] || '',
            actionURL: split[1] || ''
          }
        }) : [],
        singleTitle: argv.singleTitle,
        singleURL: argv.singleUrl
      }, 
      msgtype: "actionCard"
    })
  }).catch(e => Utils.error(e.stack))
}
