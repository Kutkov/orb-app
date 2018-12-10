<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <h1 class="font-weight-thin display-3">Workspace orb app</h1>
            <v-text-field
              v-model="title"
              solo
            ></v-text-field>
            <p class="body-2 font-weight-thin">{{title}}</p>
            <v-card 
              class="elevation-7 mb-4"
              v-for="flag in allFlag"
              :key="flag.id"
            >
              <v-layout row>
                <v-flex xs8>
                  <v-card-text>
                    <h2 class="text--primary">{{flag.title}}</h2>
                    <p>uid: {{flag.userId}}</p>
                  </v-card-text>
                </v-flex>
              </v-layout>
            </v-card>
            <v-btn
              @click="createFlag"
              :loading="loading"
              :disabled="loading"
              v-if="resolveAddFlag"
            >
              Add data
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
      <v-btn flat @click="onLogout">
        Logout
      </v-btn>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      test: {}
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logoutUser')
      this.$router.push('/')
    },
    createFlag () {
      this.$store.dispatch('createFlag', this.title)
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    allFlag () {
      return this.$store.getters.allFlag
    },
    resolveAddFlag () {
      let resolve = false
      const flags = this.$store.getters.allFlag
      const authUserId = this.$store.getters.userId
      
      for (let key in flags) {
        if(flags[key].userId === authUserId) {
          resolve = false
          break
        } else {
          resolve = true
        }
      } 
      return resolve
    }
  },
  created() {
    // this.$store.dispatch('fetchFlag')
    this.$store.dispatch('realtimeUpdate')
  }
}
</script>

<style>

</style>
