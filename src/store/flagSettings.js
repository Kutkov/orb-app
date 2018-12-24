import * as firebase from 'firebase'

export default {
  state: {
    flags: []
  },
  mutations: {},
  actions: {
    async updateSettings({ commit }, payload) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const firebaseRef = await firebase.database().ref(`ads/${payload.key}/settings`)
        firebaseRef.update({ mindMessage: payload.mindMessage })
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    }
  },
  getters: {}
}