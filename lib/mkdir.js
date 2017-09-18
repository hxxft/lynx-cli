var fs = require('fs')
var path = require('path')

module.exports = function mkdir (dirpath, dirname) {
  if (typeof dirname === 'undefined') {
    if (fs.existsSync(dirpath)) {
      return
    } else {
      mkdir(dirpath, path.dirname(dirpath))
    }
  } else {
    if (dirname !== path.dirname(dirpath)) {
      mkdir(dirpath)
      return
    }
    if (fs.existsSync(dirname)) {
      fs.mkdirSync(dirpath)
    } else {
      mkdir(dirname, path.dirname(dirname))
      fs.mkdirSync(dirpath)
    }
  }
}
