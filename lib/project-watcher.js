const path = require('path')
const watcher = require('watch')
const pack = require('../lib/pack')
const reload = require('../lib/reload')
const copy2Dist = require('./copy-dist')

module.exports = function(page, debugClient) {
  var projectPath = path.join(process.cwd(), 'src');
  watcher.watchTree(projectPath, function(f, curr, prev){
    if (typeof f == "object" && prev === null && curr === null) {
      // Finished walking the tree
    } else if (prev === null) {
      // f is a new file
    } else if (curr.nlink === 0) {
      // f was removed
    } else {
      // f was changed
      new Promise(function(resolve, reject){
        pack(page, function(){
          copy2Dist(page)
          resolve()
        })
      }).then((value)=>{
        reload(debugClient)
      })
    }
  })
}
