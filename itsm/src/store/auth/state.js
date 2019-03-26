import {
  Parse
} from '../../plugins/parse'

export default {
  currentUser: Parse.User.current(),
  isLoggedIn: !!Parse.User.current()
}
