const
  express = require('express'),
  serveStatic = require('serve-static'),
  history = require('connect-history-api-fallback'),
  serverConfig = require('./server.config'),
  appServerPort = process.env.ITSM_APP_SERVER_PORT || serverConfig.ITSM_APP_SERVER_PORT,
  path = require('path'),
  ntlm = require('express-ntlm'),
  cors = require('cors'),
  auth = require('./auth')

const app = express()

app.use(cors({
  credentials: true,
  origin: [
    'http://localhost:8080',
    'http://localhost:5000',
    'http://127.0.0.1:8080'
  ]
}))

if (process.env.ITSM_USE_NTLM || serverConfig.ITSM_USE_NTLM) {
  app.use('/api/ntlm', ntlm({
    debug: function () {
      var args = Array.prototype.slice.apply(arguments)
      console.log.apply(null, args)
    },
    domain: process.env.ITSM_DOMAIN || serverConfig.ITSM_DOMAIN,
    domaincontroller: process.env.ITSM_DOMAIN_CONTROLLER || serverConfig.ITSM_DOMAIN_CONTROLLER
  }))
}

app.get('/api/ntlm', (req, res) => {
  if (process.env.ITSM_USE_NTLM || serverConfig.ITSM_USE_NTLM) {
    if (req.ntlm.Authenticated) {
      auth.authByAD(req.ntlm.UserName).then((password) => {
        res.status(200).send({ username: req.ntlm.UserName, password: password })
      })
    } else res.status(401).send()
  } else res.end('NTLM Not Enabled')
})

app.use(history())
app.use(serveStatic(path.join(__dirname, '/dist/spa-mat')))
app.listen(appServerPort, () => {
  console.info(`quasar app serving on port: ${appServerPort}`)
})
