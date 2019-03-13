import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import api from './api'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */
const Store = new Vuex.Store({
  modules: {
    api,
    auth
  }
})

export default Store
