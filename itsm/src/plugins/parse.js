import Parse from 'parse'
import * as ServerConfig from '../../server.config'

Parse.initialize(ServerConfig.ITSM_PARSE_APP_ID, ServerConfig.ITSM_PARSE_JAVASCRIPT_KEY)
Parse.serverURL = ServerConfig.ITSM_PARSE_SERVER_URI

export default ({
  Vue
}) => {
  Vue.prototype.$parse = Parse
}

export {
  Parse
}
