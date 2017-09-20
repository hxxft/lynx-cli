var exec = require('child_process').exec
var logger = require('../lib/logger')

function pushReloadCommand() {
  console.log('pushReloadCommand')
}

function startServer() {
  exec('node pack/debug.js', function(error, stdout, stderr){
    if(error) {
      logger.fatal('npm run: ' + error)
    }
    // pushReloadCommand()
  })
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
      startServer()
    })
  })
}
