<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <!--
        <v-layout align-center justify-center>
          
            <h1 class="font-weight-thin display-3">Workspace orb app</h1>
            <h2 v-if="authUser == ''">Войдите или зарегистрируйтесь</h2>
            <v-text-field
              v-model="title"
              solo
              v-if="resolveAddFlag"
            ></v-text-field>
        </v-layout>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card 
              class="elevation-7 mb-4"
              v-for="flag in allFlag"
              :key="flag.id"
            >
              <v-layout row>
                <v-flex  offset-md1 md3>
                  <v-btn fab dark large :color="flag.status == true ? 'cyan' : 'red'" @click="changeColor(flag.status, flag.key, flag.userId)">
                    <v-icon dark color="white">outlined_flag</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex md8>
                  <v-card-text>
                    <h2 class="font-weight-medium blue--text">{{flag.title}}</h2>
                    <p >uid: {{flag.userId}}</p>
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
      -->

        <v-layout align-center justify-center>
            <h1 class="font-weight-thin display-3">Workspace orb app</h1>
            <h2 v-if="authUser == ''">Войдите или зарегистрируйтесь</h2>
            <v-text-field
              v-model="title"
              solo
              v-if="resolveAddFlag"
            ></v-text-field>
        </v-layout>

        <v-layout justify-center>
          <v-flex
            xs12 sm6 md2
            v-for="flag in allFlag"
            :key="flag.id"
            ma-2
          >
            <v-card>
              <v-container>
                <v-layout justify-center>
                  <v-btn fab dark class="btn-size" :color="flag.status == true ? 'cyan' : 'red'" @click="changeColor(flag.status, flag.key, flag.userId)">
                    <v-icon dark class="icon-size" color="white">outlined_flag</v-icon>
                  </v-btn>
                </v-layout>
                <v-layout justify-center>
                  <v-card-title>
                    <p class="headline">{{flag.title}}</p>
                  </v-card-title>       
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-btn
            @click="createFlag"
            :loading="loading"
            :disabled="loading"
            v-if="resolveAddFlag"
          >
            Add data
          </v-btn>
          <v-btn flat @click="onLogout">
            Logout
          </v-btn>
        </v-layout>

      </v-container> 
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      color: 'cyan'
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logoutUser')
      this.$router.push('/')
    },
    createFlag () {
      this.$store.dispatch('createFlag', this.title)
    },
    changeColor (status, key, userId) {
      const payload = {
        status,
        key
      }
      if(this.authUser === userId) {
        this.$store.dispatch('updateFlag', payload)
      } else {
        console.log('dont use someone else is flag')
      }
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    allFlag () {
      return this.$store.getters.allFlag
    },
    authUser () {
      return this.$store.getters.userId
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
    this.$store.dispatch('realtimeUpdate')
  }
}
</script>

<style scoped>
  .btn-size{
    height: 80px;
    width: 80px;
  }
  .icon-size{
    font-size: 35px;
  }
</style>
