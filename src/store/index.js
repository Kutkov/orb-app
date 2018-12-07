import Vue from 'vue'
import Vuex from 'vuex'
import flag from './flag'
import user from './user'
import shared from './shared'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    flag,
    user,
    shared
  }
})