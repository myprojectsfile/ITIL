const ServerConfig = {
  ITSM_PARSE_APP_ID: 'UCZVB5TLA4',
  ITSM_PARSE_MASTER_KEY: '5n84nvuhXrRt2C5L',
  ITSM_PARSE_REST_API_KEY: 'W34LS89GY7K',
  ITSM_PARSE_JAVASCRIPT_KEY: 'GTM456KILKD32',
  ITSM_PARSE_DB_URI: 'mongodb://localhost:27017/itsmDB',
  ITSM_PARSE_SERVER_URI: 'http://localhost:1337/parse',
  ITSM_PARSE_SERVER_PORT: 1337,
  ITSM_APP_SERVER_PORT: 5000,
  ITSM_PARSE_MOUNT: '/parse',
  ITSM_AUTH_WITH_AD: false,
  ITSM_DOMAIN_CONTROLLER: 'ldap://10.1.1.110:389',
  ITSM_DOMAIN: 'bpmo.local',
  ITSM_DOMAIN_USER_PREFIX: 'BPMO'
}

module.exports = ServerConfig
