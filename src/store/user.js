import * as firebase from 'firebase'

class User {
  constructor(id) {
    this.id = id
  }
}

export default {
  state: {
    user: null,
    userId: ''
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    setUserId(state, payload) {
      state.userId = payload
    }
  },
  actions: {
    async registerUser({ commit }, { email, password }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
        commit('setUser', new User(user.uid))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async loginUser({ commit }, { email, password }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const user = await firebase.auth().signInWithEmailAndPassword(email, password)
        commit('setUser', new User(user.uid))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    autoLoginUser({ commit }, payload) {
      commit('setUser', new User(payload.uid))
      commit('setUserId', payload.uid)
    },
    logoutUser({ commit }) {
      firebase.auth().signOut()
      commit('setUser', null)
    }

  },
  getters: {
    user(state) {
      return state.user
    },
    userId(state) {
      return state.userId
    },
    isUserLoggedIn(state) {
      return state.user !== null
    }
  }
}