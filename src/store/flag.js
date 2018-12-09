import * as firebase from 'firebase'

export default {
  state: {
    flags: [

    ]
  },
  mutations: {
    createFlag(state, payload) {
      state.flags.push(payload)
    },
    loadFlags (state, payload) {
      state.flags = payload
    }
  },
  actions: {
    async createFlag ({commit, getters}, payload) {
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
        commit('createFlag', newObj)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async fetchFlag ({commit}) {
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
    }
  },
  getters: {
    allUser(state, getters) {
      return state.flags
    }
  }
}