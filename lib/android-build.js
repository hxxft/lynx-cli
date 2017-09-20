var exec = require('child_process').exec
var copySync = require('fs-extra').copySync
var fs = require('fs')
var logger = require('./logger')
var getManifest = require('./manifest')
var ora = require('ora')

var androidProjectPath = require('./android-path').androidProjectPath
var androidDrawablePath = require('./android-path').androidDrawablePath
var androidAssetPath = require('./android-path').androidAssetPath

function packAll() {
  var buildSpinner = ora('build Android project')
  fs.chmodSync(androidProjectPath + '/gradlew', 0755)
  // checkout resources
  var manifest = getManifest()

  var iconSrcPath = process.cwd() + '/src/' + manifest.application.icon
  var iconDestPath = process.cwd() + '/' + androidDrawablePath + '/' + manifest.application.icon
  if (fs.existsSync(iconSrcPath)) {
    copySync(iconSrcPath, iconDestPath)
  }

  var pages = manifest.application.pages
  for(var page in pages) {
    var name = pages[page].name.split('.')[0]
    var sourcePath = './dist/' + name
    var destPath = androidAssetPath + '/' + name
    console.log(sourcePath + ', ' + destPath)
    copySync(sourcePath, destPath)
  }

  buildSpinner.start()
      // build apk
  exec('./gradlew build', { cwd: androidProjectPath }, function (error, stdout, stderr) {
    buildSpinner.stop()
    if (error) {
      logger.fatal(error)
    }
    logger.success('Generated APK.')
  })
}

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

    var pages = manifest.application.pages
    for(var page in pages) {
      var name = pages[page].split('.')[0]
      var sourcePath = './dist/' + name
      var destPath = androidAssetPath + '/' + name
      copySync(sourcePath, destPath)
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
  packAll()
}

