const DingBot = require('../extends/zignis-plugin-zhike/src/common/dingbot')

const actionCard = require('../extends/zignis-plugin-zhike/src/commands/zhike/dingtalk/action_card')
const text = require('../extends/zignis-plugin-zhike/src/commands/zhike/dingtalk/text')
const feedCard = require('../extends/zignis-plugin-zhike/src/commands/zhike/dingtalk/feed_card')
const link = require('../extends/zignis-plugin-zhike/src/commands/zhike/dingtalk/link')
const markdown = require('../extends/zignis-plugin-zhike/src/commands/zhike/dingtalk/markdown')

exports.hook_zhike_component = {
  dingtalk: {
    DingBot
  }
}

exports.hook_zhike_repl = {
  dingtalk: {
    DingBot,
    type: {
      text,
      actionCard,
      feedCard,
      link,
      markdown
    }
  }
}