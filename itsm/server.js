const
  express = require('express'),
  serveStatic = require('serve-static'),
  history = require('connect-history-api-fallback'),
  port = process.env.PORT || 5000,
  path = require('path'),
  ntlm = require('express-ntlm'),
  serverConfig = require('./server.config')

const app = express()

if (serverConfig.USE_NTLM) {
  app.use(ntlm({
    debug: function () {
      var args = Array.prototype.slice.apply(arguments)
      console.log.apply(null, args)
    },
    domain: serverConfig.DOMAIN,
    domaincontroller: serverConfig.DOMAIN_CONTROLLER
  }))
}

app.get('/ntlm', (req, res) => {
  if (serverConfig.USE_NTLM) {
    res.end(JSON.stringify(req.ntlm))
  } else res.end('NTLM Not Enabled')
})

app.use(history())
app.use(serveStatic(path.join(__dirname, '/dist/spa-mat')))
app.listen(port, () => {
  console.info(`quasar app serving on port: ${port}`)
})
