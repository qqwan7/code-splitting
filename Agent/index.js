var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const path = require('path')
const history = require('connect-history-api-fallback')

app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.route('/login')
  .get(function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
  });
app.route('/p*')
  .get(function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
  });

// 模拟后台数据
const bodyParser = require('body-parser')
const apiRoutes = express.Router()
const fs = require('fs')
const jsonData = JSON.parse(fs.readFileSync(path.join(__dirname + '/src/jsondata/data.json')))
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

io.on('connection', function(socket){
  // console.log('a user connected');
  // socket.on('disconnect', function(){
  //   console.log('user disconnected');
  // });
  // socket.on('chat message', function(msg){
  //   console.log('message: ' + msg);
  // });
  socket.on('socketLog', function(msg){
    io.emit('socketLog', msg);
    console.log('-----server----' + msg)
  });
});

http.listen(8066, function(){
  console.log('listening on *:8066');
});

