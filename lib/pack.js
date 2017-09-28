const webpack = require('webpack')
const ora = require('ora')
const fs = require('fs')
const path = require('path')
const logger = require('./logger')
const vueServerRenderer = require(process.cwd() + '/libs/vue-server-renderer')

module.exports = function(page, callback) {
  var spinner = ora('build page: ' + page)
  spinner.start()
  var clientWebpackConfig = require(process.cwd() + '/build/webpack.client.js')
  var serverWebpackConfig = require(process.cwd() + '/build/webpack.server.js')
  
  var clientCompiler = webpack(clientWebpackConfig)
  var serverCompiler = webpack(serverWebpackConfig)
  
  clientCompiler.run(function(err, stats) {
    if(err) {
      spinner.stop()
      logger.fatal('Compile client.js failed: %s', err)
    }
    serverCompiler.run(function(err, stats) {
      if(err) {
        spinner.stop()
        logger.fatal('Compile server.js failed: %s', err)
      }
      const clientBundleFileUrl = 'bundle.client.js';
      const serverBundleFilePath = path.join(process.cwd(), '/pack/out/bundle.server.js')
      const serverBundleFileCode = fs.readFileSync(serverBundleFilePath, 'utf8');
      const bundleRenderer = vueServerRenderer.createBundleRenderer(serverBundleFileCode);
      const pagePath = path.join(process.cwd(), '/out/index.html')
      bundleRenderer.renderToString((err, html) => {
        if (err) {
          spinner.stop()
          logger.fatal('Build page[%s] failed: %s, %s', page, err.message, err.stack)
        } else {
          fs.writeFileSync(pagePath, `<body>
              ${html}
              <script src="${clientBundleFileUrl}"></script>
            </body>`)
        }
        spinner.stop()
        logger.success('Build page[%s] successed', page)
        callback() 
      })
    })
  })
}

