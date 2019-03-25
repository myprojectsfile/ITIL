const serverConfig = require('./server.config'),
  Parse = require('parse/node'),
  generator = require('password-generator')

// Initialize Parse Server
const parseAppId =
  process.env.ITSM_PARSE_APP_ID || serverConfig.ITSM_PARSE_APP_ID
const parseMasterKey =
  process.env.ITSM_PARSE_MASTER_KEY || serverConfig.ITSM_PARSE_MASTER_KEY
Parse.initialize(parseAppId, null, parseMasterKey)
Parse.serverURL =
  process.env.ITSM_PARSE_SERVER_URI || serverConfig.ITSM_PARSE_SERVER_URI

// check if user a is member of AD
// function checkUserOfAD (username) {
//   const prefix = serverConfig.ITSM_DOMAIN_USER_PREFIX.toUpperCase() + '\\'
//   const usernameUpp = username.toUpperCase()
//   return usernameUpp.startsWith(prefix)
// }

async function checkIsUserExistInParse (username) {
  // Remove \ from username
  // Find user by username
  const query = new Parse.Query(Parse.User)
  query.equalTo('username', username)
  const user = await query.first()

  if (user) return [true, user]
  else return [false, {}]
}

// async function updateUserRoles (parseUser, userGroups) {
//   userGroups.forEach((group, index) => {
//     userGroups[index] = (group.split('\\'))[1]
//   })
//   var roleQuery = new Parse.Query(Parse.Role)
//   roleQuery.containedIn('name', userGroups)
//   var roles = await roleQuery.find()
//   roles.forEach((role) => {
//     role.getUsers().add(parseUser)
//     role.save(null, {
//       useMasterKey: true
//     }).then(() => {
//       console.log('save ok')
//     }, (error) => {
//       console.error(`save failed with error:${JSON.stringify(error)}`)
//     })
//   })
//   return roles
// }

async function resetPassword (parseUser) {
  const newPass = generator(12, false)
  parseUser.set('password', newPass)
  await parseUser.save(null, {
    useMasterKey: true
  })
  return newPass
}

async function signUpUser (username) {
  var user = new Parse.User()
  const newPass = generator(12, false)
  user.set('username', username)
  user.set('password', newPass)
  await user.save(null, {
    useMasterKey: true
  })
  return newPass
}

async function authByAD (username) {
  // Check if user is exist in parse db
  const [userexist, parseUser] = await checkIsUserExistInParse(username)
  if (userexist) {
    // Yes user exist
    // Reset password and send via response
    const newPassword = await resetPassword(parseUser)
    return newPassword
  } else {
    // No user doesnot exist
    // Signup the user with default password
    let newPassword = await signUpUser(username)
    // Update user gropus
    return newPassword
  }
}

module.exports = {
  authByAD: authByAD
}
