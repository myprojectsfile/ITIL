import Parse from '../parse-init'

export const logOut = ({
  commit
}) => {
  Parse.User.logOut().then(
    () => {
      commit('logOut')
    },
    () => {})
}

export const logIn = ({
  commit
}, payload) => {
  Parse.User.logIn(payload.username, payload.password).then(
    (user) => {
      console.log(user)
      commit('logIn', user)
    },
    (error) => {
      console.log(`errro in logIn Action:${error}`)
    })
}

export const logInAsync = (payload) => {
  return Parse.User.logIn(payload.username, payload.password)
}

export const logInAsync2 = ({
  commit
}, payload) => {
  return Parse.User.logIn(payload.username, payload.password)
}
