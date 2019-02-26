var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');
const serverConfig = require('./server.config')
const cors = require('cors')
const ntlm = require('express-ntlm')
const history = require('connect-history-api-fallback')

var api = new ParseServer({
  databaseURI: process.env.PARSE_ITSM_DB_URI || serverConfig.PARSE_ITSM_DB_URI,
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.PARSE_ITSM_APP_ID || serverConfig.PARSE_ITSM_APP_ID,
  masterKey: process.env.PARSE_ITSM_MASTER_KEY || serverConfig.PARSE_ITSM_MASTER_KEY,
  serverURL: process.env.PARSE_ITSM_SERVER_URI || serverConfig.PARSE_ITSM_SERVER_URI,
  liveQuery: {
    classNames: [] // List of classes to support for query subscriptions
  }
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();
app.use(cors({ origin: 'http://localhost:8080' }))
// app.use(history())

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_ITSM_MOUNT || serverConfig.PARSE_ITSM_MOUNT;
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/spa-mat/index.html'));
});
// Config NTLM
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


// Remove this before launching your app
app.get('/test', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

var port = process.env.PARSE_ITSM_SERVER_PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function () {
  console.log('ITSM parse-server running on port: ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
