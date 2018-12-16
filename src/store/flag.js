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
        status: true,
        userId: getters.user.id,
        settings: {
          mindMessage: ''
        }
      }

      try {
        await firebase.database().ref('ads').push(newObj)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async updateFlag({ commit }, payload) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const firebaseRef = firebase.database().ref(`ads/${payload.key}`)
        firebaseRef.update({ status: !payload.status })
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
                status: flag.status,
                userId: flag.userId,
                settings: flag.settings,
                key: key
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