const ServerConfig = {
  PARSE_ITSM_APP_ID: 'UCZVB5TLA4',
  PARSE_ITSM_MASTER_KEY: '5n84nvuhXrRt2C5L',
  PARSE_ITSM_DB_URI: 'mongodb://localhost:27017/itsmDB',
  PARSE_ITSM_SERVER_URI: 'http://localhost:1337/parse',
  PARSE_ITSM_SERVER_PORT: 1337,
  PARSE_ITSM_MOUNT: '/parse',
  USE_NTLM: true,
  USE_SSPI: false,
  AUTH_WITH_AD: true,
  DOMAIN_CONTROLLER: 'ldap://10.1.1.110:389',
  DOMAIN: 'bpmo.local',
  // DOMAIN_USER_PREFIX: 'DESKTOP-9MHHSMS',
  DOMAIN_USER_PREFIX: 'BPMO'
}

module.exports = ServerConfig
