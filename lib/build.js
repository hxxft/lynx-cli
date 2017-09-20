var exec = require('child_process').exec
var fs = require('fs-extra')
var rm = require('rimraf').sync
var existsSync = require('fs').existsSync
var writeFile = require('fs').writeFileSync
var program = require('commander')
var manifest = require('../lib/manifest')
var template = require('../lib/template/page')
var logger = require('../lib/logger')
var mkdir = require('../lib/mkdir')
var ora = require('ora')

var entryPath = './pack/app.js'

function pack(page) {
  var name = page.split('.')[0]
  var packPath = './dist/' + name
  rm(packPath)
  fs.copy('./out/', packPath, {}, function(err){
    if(err) {
      logger.fatal('pack ' + name + 'failed: ' + err)
    }
  })
}

module.exports = function(page, callback) {
  var spinner = ora('build page: ' + page)
  spinner.start()
  var pagePath = process.cwd() + '/src/' + page
  if(!existsSync(pagePath)) {
    spinner.stop()
    logger.fatal('%s is not exist',  pagePath)
  }
  var pageContent = template(page)
  writeFile(entryPath, pageContent)
  exec('npm run pack', function(error, stdout, stderr){
    spinner.stop()
    if(error) {
      logger.fatal('Run "npm run pack" error: ' + error)
    }
    pack(page)
    logger.success('Build page[%s] successed', page)
    if(callback) {
      callback()
    }
  })
}
