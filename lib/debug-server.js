const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const reload = require('./reload')
const vueServerRenderer = require(process.cwd() + '/libs/vue-server-renderer')

module.exports = function () {
  const app = express()
  const server = require('http').createServer(app)
  app.use(bodyParser.json({ limit: '1mb' }));  
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  // Server-Side Bundle File
  const serverBundleFilePath = path.join(process.cwd(), '/pack/out/bundle.server.js')
 
  // Client-Side Bundle File
  const clientBundleFilePath = path.join(process.cwd(), 'out/bundle.client.js');
  const clientBundleFileUrl = 'bundle.client.js';

  // Server-Side Rendering
  app.get('/', function (req, res) {
    const serverBundleFileCode = fs.readFileSync(serverBundleFilePath, 'utf8');
    const bundleRenderer = vueServerRenderer.createBundleRenderer(serverBundleFileCode);
    bundleRenderer.renderToString((err, html) => {
      if (err) {
        res.status(500).send(`
        <h1>Error: ${err.message}</h1>
        <pre>${err.stack}</pre>
      `);
      } else {
        res.send(`<body>
            ${html}
            <script src="${clientBundleFileUrl}"></script>
          </body>`);
      }
    });
  });

  app.get('/data', function (req, res) {
    function randNum() {
      return Math.round(Math.random() * 100);
    }
    res.send({
      name: `Hans-${randNum()}`,
      age: randNum(),
    });
  });

  // Client-Side Bundle File
  app.get('/'+clientBundleFileUrl, function (req, res) {
    const clientBundleFileCode = fs.readFileSync(clientBundleFilePath, 'utf8');
    res.send(clientBundleFileCode);
  });

  app.get('*.png', function(req, res) {
    var imgPath = path.join(process.cwd(), 'src');
    const img = fs.readFileSync(imgPath + req.url);
    res.send(img);
  })

  app.post('/log', function (req, res) {
    console.log(req.body.log)
    res.send('')
  })

  // Start server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, function () {
    reload()
  });
}