const net = require('net')

module.exports = function () {
  var HOST = '127.0.0.1'
  var POST = 8000
  var socket = new net.Socket()
  socket.connect(POST, HOST, function () {
    socket.write('reload')
    socket.end()
  })
}