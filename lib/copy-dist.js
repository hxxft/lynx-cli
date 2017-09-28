var rm = require('rimraf').sync
var fs = require('fs-extra')
var entryPath = './pack/app.js'

module.exports = function (page) {
  var name = page.split('.')[0]
  var packPath = './dist/' + name
  rm(packPath)
  fs.copySync('./out/', packPath, {})
}