var exec = require('child_process').exec
var copySync = require('fs-extra').copySync
var fs = require('fs')
var logger = require('./logger')
var getManifest = require('./manifest')
var ora = require('ora')

var androidProjectPath = require('./android-path').androidProjectPath
var androidDrawablePath = require('./android-path').androidDrawablePath

function pack () {
  var packSpinner = ora('pack resources')
  packSpinner.start()
  exec('npm run pack', function (error, stdout, stderr) {
    packSpinner.stop()
    if (error) {
      logger.fatal(error)
    }
        // checkout resources
    var manifest = getManifest()

    var iconSrcPath = process.cwd() + '/src/' + manifest.application.icon
    var iconDestPath = process.cwd() + '/' + androidDrawablePath + '/' + manifest.application.icon
    if (fs.existsSync(iconSrcPath)) {
      copySync(iconSrcPath, iconDestPath)
    }

    var buildSpinner = ora('build Android project')
    buildSpinner.start()
        // build apk
    exec('./gradlew build', { cwd: androidProjectPath }, function (error, stdout, stderr) {
      buildSpinner.stop()
      if (error) {
        logger.fatal(error)
      }
      logger.success('Generated APK.')
    })
  })
}

module.exports = function () {
  pack()
}

