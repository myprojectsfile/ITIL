import axios from 'axios'
import Parse from '../store/parse-init'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: (to, from, next) => {
      // axios.get('/api/ntlm', {withCredentials: true})
      const uri = process.env.NTLMApi + '/api/ntlm'
      axios.get(uri, { withCredentials: true })
        .then(
          (result) => {
            console.log(result.data)

            Parse.User.logIn(result.data.username, result.data.password).then((user) => { console.log(user) })

            next()
          },
          (error) => {
            next(error)
          })
    },
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
