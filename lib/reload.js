const net = require('net')

module.exports = function () {
  var HOST = '127.0.0.1'
  var PORT = 8000
  var socket = new net.Socket()

  socket.on("error",function(err){
        console.log("Please check whether the app is debuggable");
    })

  socket.connect(PORT, HOST, function () {
    socket.write('reload')
    socket.end()
  })
}