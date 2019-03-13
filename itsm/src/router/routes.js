import axios from 'axios'
import {logInAsync} from '../store/auth/actions'
import Store from '../store/index'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: (to, from, next) => {
      const uri = process.env.NTLMApi + '/api/ntlm'
      axios.get(uri, { withCredentials: true, keepAlive: true })
        .then(
          (result) => {
            const user = result.data.username
            const pass = result.data.password
            const payload = {username: user, password: pass}
            logInAsync(payload).then((user) => {
              Store.commit('auth/logIn', user)
            })
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
