import axios from 'axios'

const routes = [{
  path: '/',
  component: () => import('layouts/MainLayout.vue'),
  beforeEnter: (to, from, next) => {
    // axios.get('/api/ntlm', {withCredentials: true})
    const uri = process.env.NTLMApi + '/api/ntlm'
    axios.get(uri, {
      withCredentials: true
    })
      .then(
        (result) => {
          console.log(result)
          next()
        },
        (error) => {
          console.log(error.response.status)
          if (error.response.status === 307) {
            next('/login')
          } else {
            next(error)
          }
        })
  },
  children: [{
    path: '',
    component: () => import('pages/Index.vue')
  }]
}, {
  path: '/login',
  component: () => import('layouts/DefaultLayout.vue'),
  children: [{
    path: '',
    name: 'login',
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
