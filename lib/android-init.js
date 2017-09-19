var fs = require('fs')
var readFile = require('fs').readFileSync
var writeFile = require('fs').writeFileSync
var rm = require('rimraf').sync
var existsSync = require('fs').existsSync
var ora = require('ora')
var download = require('download-git-repo')

var mkdir = require('./mkdir')
var logger = require('./logger')
var getManifest = require('./manifest')

var androidProjectPath = require('./android-path').androidProjectPath
var androidManifestPath = require('./android-path').androidManifestPath
var androidlocalPropertiesPath = require('./android-path').androidlocalPropertiesPath
var androidStringsValuePath = require('./android-path').androidStringsValuePath
var androidSrcPath = require('./android-path').androidSrcPath
var androidTemplatePath = require('./android-path').androidTemplatePath
var androidTemplateSrcs = require('./android-path').androidTemplateSrcs

var androidRemoteTemplatePath = 'hxxft/lynx-android-template'

//  console.log(program.args[0] + ', ' + program.args[1])

var androidSDKHome = process.env.ANDROID_HOME
if (!androidSDKHome) {
  logger.fatal('ERROR: Please set ANDROID_HOME path')
}

var androidNDKHome = process.env.ANDROID_NDK
if (!androidNDKHome) {
  logger.fatal('ERROR: Please set ANDROID_NDK path')
}

//  modify template project
function resolveAndroidManifest (manifest) {
  var appPackage = 'package="' + manifest.application.package + '"'
  var appIcon = 'icon="@drawable/' + manifest.application.icon.split('.')[0] + '"'
  var platformManifest = readFile(androidManifestPath, {encoding: 'utf-8'})
  platformManifest = platformManifest.replace(/package="com.template"/, appPackage)
  platformManifest = platformManifest.replace(/icon="@mipmap\/ic_launcher"/, appIcon)
  writeFile(androidManifestPath, platformManifest, {encoding: 'utf-8'})
}

function resolveAndroidAppName (manifest) {
  var strings = '<resources>\n'
  strings += '\t<string name="app_name">'
  strings += manifest.application.name
  strings += '</string>\n'
  strings += '</resources>'
  writeFile(androidStringsValuePath, strings, {encoding: 'utf-8'})
}

function resolveAndroidLocalProperties (sdk, ndk) {
  // var localProperties = readFile(androidlocalPropertiesPath, {encoding: 'utf-8'})
  // localProperties = localProperties.replace(/{{NDK_DIR}}/, ndk)
  // localProperties = localProperties.replace(/{{SDK_DIR}}/, sdk)
  var localProperties = 'ndk.dir='
  localProperties += ndk
  localProperties += '\n'
  localProperties += 'sdk.dir='
  localProperties += sdk
  localProperties += '\n'
  writeFile(androidlocalPropertiesPath, localProperties, {encoding: 'utf-8'})
}

function resolveAndroidSrcFiles (manifest) {
  var packageName = manifest.application.package
  var packagePath = packageName.replace(/\./, '/')
  var dir = androidSrcPath + '/' + packagePath
  mkdir(dir)
  for (var i = 0; i < androidTemplateSrcs.length; i++) {
    var filePath = androidTemplateSrcs[i]
    var fileContent = readFile(filePath, {encoding: 'utf-8'})
    fileContent = fileContent.replace(/com\.template/, packageName)
    var newFilePath = filePath.replace(/com\/template/, packagePath)
    writeFile(newFilePath, fileContent, {encoding: 'utf-8'})
  }
  rm(androidTemplatePath)
}

//  create project
function downloadAndGenerate (template) {
  var spinner = ora('downloading android template')
  spinner.start()

  download(template, androidProjectPath, function (err) {
    spinner.stop()
    if (err) logger.fatal('Failed to download repo ' + template + ': ' + err.message.trim())
    var manifest = getManifest()
    resolveAndroidManifest(manifest)
    resolveAndroidAppName(manifest)
    resolveAndroidLocalProperties(androidSDKHome, androidNDKHome)
    resolveAndroidSrcFiles(manifest)
    // add file mode
    fs.chmodSync(androidProjectPath + '/gradlew', 0755)
  })
}

module.exports = function () {
  if (existsSync(androidProjectPath)) {
    logger.fatal('%s already exist.', androidProjectPath)
  }
  downloadAndGenerate(androidRemoteTemplatePath)
}

