var exec = require('child_process').exec
var logger = require('../lib/logger')

var runServer = require('./debug-server')


function debugRunAndroid(debugClient) {
  exec('adb reverse tcp:3000 tcp:3000', function(error, stdout, stderr){
    if(error) {
      logger.fatal('adb failed: ' + error)
    }
    exec('adb reverse tcp:9527 tcp:9527', function(error, stdout, stderr){
      if(error) {
        logger.fatal('adb failed: ' + error)
      }
      runServer(debugClient)
    })
  })
}

function debugRunIOS(debugClient) {
  runServer(debugClient)
}

module.exports = function (debugClient, platform) {
  if (platform === 'android') {
    debugRunAndroid(debugClient)
  }else if(platform === 'ios'){
    debugRunIOS(debugClient) 
  }else{
    logger.fatal("Please check debug platform, only support android/ios")
  }
}
