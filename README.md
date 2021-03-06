# Beauty-webpack
![NPM](https://img.shields.io/npm/l/beauty-webpack) ![GitHub package.json version](https://img.shields.io/github/package-json/v/Chryseis/beauty-webpack)

## Motive
快速搭建前端项目，减少webpack配置学习成本
## Install
```bash
npm install beauty-webpack --save-dev
```
## Usage
### 命令
```bash
//package.json
{
  "script": {
      //开发
      "start": "beauty start",
      //打包
      "build": "beauty build",
      //分析
      "analyze": "beauty analyze"
  }
}
```

### Spa项目
#### 目录结构
```
.
+-- src
|   +-- ...
|   +-- index.(js|jsx)
```
#### 入口文件
```jsx harmony
//src/index.js
import React from 'react'
import ReactDOM from 'react-dom'

const Home=()=><div>Home</div>

ReactDOM.render(<Home/>, document.querySelector('#root'))
```
### Mpa项目
#### 目录结构
```
.
+-- src
|   +-- ...
|   +-- activity
|       +-- index.(js|jsx)
|   +-- home
|       +-- index.(js|jsx)

```
#### 入口文件
```jsx harmony
//src/(folder)/index.js
import React from 'react'
import ReactDOM from 'react-dom'

const Home=()=><div>Home</div>

ReactDOM.render(<Home/>, document.querySelector('#root'))
```
### 配置文件
允许自定义添加配置文件修改webpack配置
需要在根目录添加.beautyrc.js文件

#### 属性
属性|说明|备注
---|---|---
entry|入口配置(只限Spa项目)|参考[webpack entry](https://www.webpackjs.com/configuration/entry-context/#entry)
output|输出配置| 参考[webpack output](https://www.webpackjs.com/configuration/output/)
publicPath|文件输出目录|参考[webpack publicPath](https://www.webpackjs.com/configuration/output/#output-publicpath)
isExtractCss|是否提取公共样式|
alias|别名|默认@为src文件夹
splitChunks|分包策略|参考[webpack splitChunks](https://webpack.js.org/plugins/split-chunks-plugin/#root)
chunks|js分包模块|配合entry 
define|定义项目全局变量|参考[webpack define](https://webpack.js.org/plugins/define-plugin/#root)
devServer|开发服务器配置|参考[webpack devServer](https://www.webpackjs.com/configuration/dev-server/)
title|输出页面的title|
port|开发服务器端口号|默认值：3000
open|开发服务器编译完成是否立即打开页面
babelPlugins|babel插件引入|```babelPlugins: [["import", {"libraryName": "antd","libraryDirectory": "es","style": true // `style: true` 会加载 less 文件}]]```
isCssModule|是否开启css module| 默认值:true
isRem｜是否启用rem｜默认值：true
rootFontSize|根元素字体大小｜默认值：75

#### 配置文件例子
```
//.beautyrc.js
const path = require('path')
const PREFIX = process.env.PREFIX
const env = process.env.NODE_ENV

module.exports = {
    entry: {
        track: path.resolve(__dirname, './src/utils/track'),
        beauty: ['@babel/polyfill', path.resolve(__dirname, './src/index')]
    },
    chunks: ['vendor', 'beauty', 'track'],
    isExtractCss: env !== 'development',
    define: {
        "process.env.BASE_NAME": JSON.stringify(PREFIX || '')
    },
    splitChunks: {
        maxAsyncRequests: Infinity,
        maxInitialRequests: Infinity,
        minSize: 10000,
        cacheGroups: {
            vendor: {
                name: 'vendor',
                chunks: 'all',
                test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            },
            clipboard: {
                name: 'clipboard',
                chunks: 'all',
                test: /[\\/]node_modules[\\/](clipboard)[\\/]/,
            }
        }
    }
}
```

### 模版文件
默认有模板文件，需要自定义可以在src目录下添加document.ejs 配置参数参考[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0"/>
    <script src="//web-cdn.meilly.cn/stash/flexible.js"></script>
    <title><%= htmlWebpackPlugin.options.title %></title>
    <link rel="icon" href="/favicon.png" type="image/x-icon"/>
</head>
<body>
<noscript>Sorry, we need js to run correctly!</noscript>
<div id="root">
</div>
<% htmlWebpackPlugin.files.js.forEach(function(js) { %>
    <script src="<%= js %>"></script>
<% }) %>
<% if(webpackConfig.mode === 'production') { %>
    <script defer
            src="https://jic.talkingdata.com/app/h5/v1?appid=2F65664B662A4C80A0F941774CFD28FB&vn=mellyv1.0&vc=2.7.1"></script>
<% } %>
</body>
</html>
```

