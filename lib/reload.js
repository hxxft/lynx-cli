const net = require('net')
var logger = require('../lib/logger')

module.exports = function (debug_client) {
  // var HOST = '127.0.0.1'
  // var PORT = 8000
  // var socket = new net.Socket()

  // socket.on("error",function(err){
  //   logger.fatal("Please check whether the app is debuggable")
  //   })

  // socket.connect(PORT, HOST, function () {
  //   socket.write('reload')
  //   socket.end()
  // })

  debug_client.send('reload');
}