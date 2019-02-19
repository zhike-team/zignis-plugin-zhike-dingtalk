# zignis-plugin-dingtalk

这是一个用于发送钉钉自定义机器人消息的插件，基于 Zignis。特点是合理安排类型和参数，使得调用更加方便。

## 安装

这个插件有两个依赖，既可以安装在全局也可以安装在当前项目，建议安装在当前项目

```
npm install zignis zignis-plugin-zhike zignis-plugin-zhike-dingtalk
```

## 用法

目前插件封装了全部5种自定义机器人能够发送的消息类型，每种类型一个命令，每个命令有各自的参数和选项

```
zignis zhike dingbot <type>

Send message to dingtalk

命令：
  zignis zhike dingbot action-card <text>                Send ActionCard type bot message              [aliases: action]
  zignis zhike dingbot feed-card                         Send FeedCard type bot message                  [aliases: feed]
  zignis zhike dingbot link <title> <text> <messageUrl>  Send link type bot message
  zignis zhike dingbot markdown <text>                   Send markdown type bot message                    [aliases: md]
  zignis zhike dingbot text <content>                    Send text type bot message

选项：
  --token                    Set Dingtalk token                                                          [默认值: false]
```

另外，dingbot 命令有个别名：ding，可以让你少敲几个字母。

## 关于 Token

Token 是调用钉钉接口必须提供的，我们能够从钉钉群的添加机器人处获得 Token，本插件提供了几种设置 Token 的方式：

第一种：所有的命令都支持 `--token` 参数：

```
zignis zhike ding 你好 --token=TOKEN
```

但是，这种方式每次都要输入 token，比较麻烦，我们可以把这个 token 配置到项目里，在多个命令之间共享，不用每次都传。

第二种：在项目的 `.zignisrc.json` 中配置 tokens:

```
"tokens": {
  "TOKEN": "测试"
}
```

这种方式如果只配置了一个将默认使用，如果配置了多个，会提示让选择一个 Token 进行发送。如果你想跨项目使用 Token，也可以把 tokens 的配置写到 `Zignis` 的全局配置文件里。

第三种： 在全局配置文件 `~/.zignis/.zignisrc.json` 中添加：

```
{
    "commandDefault": {
        "dingtalk": {
            "tokens": {
                "TOKEN": "测试"
            }
        }
    }
}
```

三种配置方式都能生效，生效的优先级顺序是：第一种 > 第二种 > 第三种，而且一旦高优先级的配置存在，则低优先级的配置完全失效。