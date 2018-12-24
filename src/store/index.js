import Vue from 'vue'
import Vuex from 'vuex'
import flag from './flag'
import flagSettings from './flagSettings'
import user from './user'
import shared from './shared'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    flag,
    flagSettings,
    user,
    shared
  }
})