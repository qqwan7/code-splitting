/**
 * Created by qqwan on 2018/4/23.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user
  },
  getters
})

import('./modules/enterprise').then(enterpriseModule => {
  store.registerModule('enterprise', enterpriseModule)
})

export default store
