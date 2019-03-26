var express = require("express");
var ParseServer = require("parse-server").ParseServer;
var path = require("path");
const serverConfig = require("./server.config");
const cors = require("cors");
const ntlm = require("express-ntlm");

var api = new ParseServer({
  databaseURI: process.env.ITSM_PARSE_DB_URI || serverConfig.ITSM_PARSE_DB_URI,
  restAPIKey: process.env.ITSM_PARSE_REST_API_KEY || serverConfig.ITSM_PARSE_REST_API_KEY,
  javascriptKey: process.env.ITSM_PARSE_JAVASCRIPT_KEY || serverConfig.ITSM_PARSE_JAVASCRIPT_KEY,
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + "/cloud/main.js",
  appId: process.env.ITSM_PARSE_APP_ID || serverConfig.ITSM_PARSE_APP_ID,
  masterKey: process.env.ITSM_PARSE_MASTER_KEY || serverConfig.ITSM_PARSE_MASTER_KEY,
  serverURL: process.env.ITSM_PARSE_SERVER_URI || serverConfig.ITSM_PARSE_SERVER_URI,
  liveQuery: {
    classNames: [] // List of classes to support for query subscriptions
  }
});

// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();
app.use(cors({
  origin: "http://localhost:8080"
}));
// app.use(history())


// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.ITSM_PARSE_MOUNT || serverConfig.ITSM_PARSE_MOUNT;
app.use(mountPath, api);

var port = process.env.ITSM_PARSE_SERVER_PORT || serverConfig.ITSM_PARSE_SERVER_PORT;
var httpServer = require("http").createServer(app);
httpServer.listen(port, function () {
  console.log("ITSM parse-server running on port: " + port + ".");
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);