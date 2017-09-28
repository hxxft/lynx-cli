var exec = require('child_process').exec
var logger = require('../lib/logger')

var runServer = require('./debug-server')

function pushReloadCommand() {
  console.log('pushReloadCommand')
}

function startServer() {
  // exec('node pack/debug.js', function(error, stdout, stderr){
  //   if(error) {
  //     logger.fatal('npm run: ' + error)
  //   }
  //   // pushReloadCommand()
  // })
  runServer()
}

module.exports = function () {
  exec('adb reverse tcp:3000 tcp:3000', function(error, stdout, stderr){
    if(error) {
      logger.fatal('adb failed: ' + error)
    }
    exec('adb forward tcp:8000 tcp:8000', function(error, stdout, stderr){
      if(error) {
        logger.fatal('adb failed: ' + error)
      }
      return startServer()
    })
  })
}
