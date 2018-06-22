'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

// 模拟后台数据
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const apiRoutes = express.Router()
const fs = require('fs')
const jsonData = JSON.parse(fs.readFileSync('src/jsondata/data.json'))

// app.use('/api', apiRoutes)

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    // 提供接口
    before(app){
      app.use(bodyParser.json())
      app.use(bodyParser.urlencoded({ extended: true }))
      app.post('/api/login', function (req,res) {
        let password = req.body.password
        let username = req.body.username
        console.log(req.body + '' + password + '---' + username + '--' + (username === 'admin' && password === 'admin'))
        if (username === 'admin' && password === 'admin') {
          res.json({
            retCode: 0,
            msg: 'success',
            data: ''
          })
        }else{
          res.json({
            retCode: 1,
            msg: 'failed',
            data: ''
          })
        }
      })
      app.get('/api/getRouters', function (req, res) {
        res.json(jsonData.getRouters)
      })
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})
let qqqqqqqqq = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
var http = require('http').Server(); //  tong require('http').createServer
var io = require('socket.io')(http);
io.on('connection', function(socket){
  // Any objects that can be encoded as JSON will do
  socket.on('socketLog', function(msg){
    // Broadcasting，向所有用户发送
    io.emit('socketLog', msg);
    console.log('--------' + msg);
  });
  // 连接时向用户推送
  io.emit('broadcastMsg', '欢迎来到这里！');
  socket.on('disconnect', function(){
    console.log('-------user disconnected');
  });
});
http.listen(8166, function(){
  console.log('listening on *:8166');
});
module.exports =  qqqqqqqqq
