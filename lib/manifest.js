var logger = require('./logger')
var readFile = require('fs').readFileSync
var manifestPath = './src/manifest.json'

var manifestCheck = function (manifest) {
  if (!manifest) {
    return false
  }
  if (!manifest.application) {
    return false
  }
  return true
}

module.exports = function () {
  var manifest = JSON.parse(readFile(manifestPath))
  if (!manifestCheck(manifest)) {
    logger.fatal('ERROR: Cannot read manifest')
  }
  return manifest
}
