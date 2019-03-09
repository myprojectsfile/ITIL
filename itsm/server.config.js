const ServerConfig = {
  ITSM_PARSE_APP_ID: 'UCZVB5TLA4',
  ITSM_PARSE_MASTER_KEY: '5n84nvuhXrRt2C5L',
  ITSM_PARSE_DB_URI: 'mongodb://localhost:27017/itsmDB',
  PARSE_ITSM_SERVER_URI: 'http://localhost:1337/parse',
  PARSE_ITSM_SERVER_PORT: 1337,
  ITSM_APP_SERVER_PORT: 5000,
  PARSE_ITSM_MOUNT: '/parse',
  ITSM_USE_NTLM: true,
  AUTH_WITH_AD: true,
  ITSM_DOMAIN_CONTROLLER: 'ldap://10.1.1.110:389',
  ITSM_DOMAIN: 'bpmo.local',
  // DOMAIN_USER_PREFIX: 'DESKTOP-9MHHSMS',
  DOMAIN_USER_PREFIX: 'BPMO'
}

module.exports = ServerConfig
