const { Utils } = require('zignis')

exports.getToken = function * (argv) {
  if (argv.token) {
    return argv.token
  } else {
    const config = Utils.getApplicationConfig()
    const tokens = config.dingtalk && config.dingtalk.tokens 
                    ? config.dingtalk.tokens 
                    : (Utils._.get(Utils.getCombinedConfig(), 'commandDefault.dingtalk.tokens') || {})

    const tokenCount = Object.keys(tokens).length
    if (tokenCount === 0) {
      Utils.error('Dingtalk token is missing!')
    } else if (tokenCount === 1) {
      return Object.keys(tokens)[0]
    } else {
      const answers = yield Utils.inquirer.prompt([
        {
          type: 'list',
          name: 'selected',
          message: `Please choose a token:`,
          choices: Object.keys(tokens).map(key => {
            return { name: `${key}:${tokens[key]}`, value: key }
          }),
          validate: function (answers) {
            if (answers.length < 1) {
              return 'Please choose at least one.'
            }
            return true
          }
        }
      ])

      return answers.selected
    }
  }
}