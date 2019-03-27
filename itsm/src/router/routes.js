import axios from 'axios'
import Store from '../store/index'

const routes = [{
  path: '/',
  component: () => import('layouts/MainLayout.vue'),
  beforeEnter: (to, from, next) => {
    if (Store.state.auth.isLoggedIn) {
      next()
    } else {
      const uri = process.env.NTLMApi + '/api/ntlm'
      axios.get(uri, {
        withCredentials: true,
        keepAlive: true
      })
        .then(
          (result) => {
            const user = result.data.username
            const pass = result.data.password
            const payload = {
              username: user,
              password: pass
            }
            Store.dispatch('auth/logInAsync', (payload)).then((user) => {
              next()
            })
          },
          (error) => {
            if (error.response.status === 307 || error.response.status === 401) {
              console.log(to)
              next({
                name: 'login',
                query: {
                  redirectTo: '/'
                }
              })
            } else {
              next(error)
            }
          })
    }
  },
  children: [{
    path: '',
    name: 'home',
    component: () => import('pages/Index.vue')
  }]
}, {
  path: '/login/:redirectTo',
  component: () => import('layouts/DefaultLayout.vue'),
  children: [{
    path: '',
    name: 'login',
    props: true,
    component: () => import('pages/Login.vue')
  }]

}]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
