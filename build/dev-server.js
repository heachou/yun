require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')
// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)

app.use(staticPath, express.static('./static'))
app.use(express.static('../uploads'));

const fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var router = require('../router/router.js');
var db = require('../model/db.js');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
  secret: 'the 2 of us', 
  resave:false,
  saveUninitialized: true,
})); 

// 路由
//登录
app.post('/api/login',router.showLogin);
//注册
app.post('/api/reg',router.showReg);
//首次进入读取主页文件列表
app.post('/api/getfile/uploads',router.needLogin,router.getFileList);
//点击文件夹读取文件夹下文件
app.post('/api/getfile/folderName',router.needLogin,router.getFileByClickFolder);
// 删除文件
app.post('/deleteFile',router.needLogin,router.dodeleteFile);
// 下载文件
app.post('/downloadFile',router.needLogin,router.downloadFile);
// 获取已下载的文件列表
app.get('/getDownloadHistory',router.needLogin,router.getDownloadHistory);
// 添加下载文件
app.post('/addDownloadHistory',router.needLogin,router.addDownloadHistory);



var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

var uri = 'http://localhost:' + port
console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
