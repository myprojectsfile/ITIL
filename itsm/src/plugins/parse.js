import Parse from 'parse'
import * as ServerConfig from '../../server.config'

Parse.initialize(ServerConfig.ITSM_PARSE_APP_ID)
Parse.serverURL = ServerConfig.PARSE_ITSM_SERVER_URI

export default ({ Vue }) => {
  Vue.prototype.$parse = Parse
}
