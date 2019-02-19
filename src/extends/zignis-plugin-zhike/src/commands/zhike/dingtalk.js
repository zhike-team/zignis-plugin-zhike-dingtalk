exports.command = 'dingbot <type>'
exports.desc = 'Send message to dingtalk'
exports.aliases = ['ding']

exports.builder = function (yargs) {
  yargs.option('token', { default: false, describe: 'Set Dingtalk token' })
  yargs.commandDir('dingtalk')
}

exports.handler = function (argv) {
}
