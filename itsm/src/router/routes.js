import axios from 'axios'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: (to, from, next) => {
      // axios.get('/api/ntlm', {withCredentials: true})
      axios.get('http://127.0.0.1:5000/api/ntlm', {withCredentials: true})
        .then(
          (result) => {
            console.log(result)
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
