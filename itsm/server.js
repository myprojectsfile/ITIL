const
  express = require('express'),
  serveStatic = require('serve-static'),
  history = require('connect-history-api-fallback'),
  serverConfig = require('./server.config'),
  appServerPort = process.env.ITSM_APP_SERVER_PORT || serverConfig.ITSM_APP_SERVER_PORT,
  path = require('path'),
  ntlm = require('express-ntlm'),
  cors = require('cors')

const app = express()

app.use(cors({
  credentials: true,
  origin: ['http://localhost:8080', 'http://localhost:5000', 'http://127.0.0.1:8080']
}))

app.use('/api/ntlm', ntlm({
  debug: function () {
    var args = Array.prototype.slice.apply(arguments)
    console.log.apply(null, args)
  },
  domain: serverConfig.DOMAIN,
  domaincontroller: serverConfig.DOMAIN_CONTROLLER
}), (req, res) => {
  if (serverConfig.USE_NTLM) {
    res.end(JSON.stringify(req.ntlm))
  } else res.end('NTLM Not Enabled')
})

app.use(history())
app.use(serveStatic(path.join(__dirname, '/dist/spa-mat')))
app.listen(appServerPort, () => {
  console.info(`quasar app serving on port: ${appServerPort}`)
})
