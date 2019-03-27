import Parse from 'parse'

export const logOut = ({
  commit
}) => {
  return new Promise((resolve, reject) => {
    Parse.User.logOut().then(
      () => {
        commit('logOut')
        resolve()
      },
      (error) => {
        reject(error)
      })
  })
}

export const logIn = ({
  commit
}, payload) => {
  return new Promise((resolve, reject) => {
    Parse.User.logIn(payload.username, payload.password).then((user) => {
      commit('logIn', user)
      resolve(user)
    },
    (error) => {
      reject(error)
    })
  })
}
