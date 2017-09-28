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

var pack = require('./pack')
var copy2Dist = require('./copy-dist')
var entryPath = './pack/app.js'


module.exports = function(page, callback) {
  
  var pagePath = process.cwd() + '/src/' + page
  if(!existsSync(pagePath)) {
    logger.fatal('%s is not exist',  pagePath)
  }
  var pageContent = template(page)
  writeFile(entryPath, pageContent)

  new Promise((resolve, reject)=>{
    pack(page, function(){
      copy2Dist(page)
      resolve()
    })
  }).then(result=>{
    callback()
  })
}
