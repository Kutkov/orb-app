import * as firebase from 'firebase'

export default {
  state: {
    flags: [

    ]
  },
  mutations: {
    createFlags(state, payload) {
      state.flags.push(payload)
    },
    loadFlags(state, payload) {
      state.flags = payload
    }
  },
  actions: {
    async createFlag({ commit, getters }, payload) {
      commit('clearError')
      commit('setLoading', true)

      const newObj = {
        title: payload,
        userId: getters.user.id
      }
      console.log('newTitle = ', newObj)

      try {
        await firebase.database().ref('ads').push(newObj)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async fetchFlag({ commit }) {
      commit('clearError')
      commit('setLoading', true)
      const resultFlags = []

      try {
        const fbVal = await firebase.database().ref('ads').once('value')
        const flags = fbVal.val()
        console.log('fl =', flags)

        Object.keys(flags).forEach(key => {
          const flag = flags[key]
          resultFlags.push({
            title: flag.title,
            userId: flag.userId
          })
        })
        commit('loadFlags', resultFlags)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async realtimeUpdate({ commit }) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const refVal = await firebase.database().ref().child('ads')

        refVal.on('value', snap => {
          const flags = snap.val()
          if (flags === null) {
            commit('loadFlags', [{ title: 'empty workspace' }])
          } else {
            const resultFlags = []
            Object.keys(flags).forEach(key => {
              const flag = flags[key]
              resultFlags.push({
                title: flag.title,
                userId: flag.userId
              })
            })
            commit('loadFlags', resultFlags)
          }
        })
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }

    }
  },
  getters: {
    allFlag(state, getters) {
      return state.flags
    }
  }
}