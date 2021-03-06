const webpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const devConf = require('../config/dev.conf')
const options = devConf.devServer


webpackDevServer.addDevServerEntrypoints(devConf, options)
const compiler = webpack(devConf)
const start = new webpackDevServer(compiler, options)

start.listen(options.port, options.host)

process.on('uncaughtException', function(e) {
    /*处理异常*/
    if (e.code === 'EADDRINUSE') {
        start.listen(++options.port, options.host)
    } else {
        console.log(e.message)
    }
})
