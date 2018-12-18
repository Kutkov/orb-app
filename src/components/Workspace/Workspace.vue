<template>
  <v-app>
    <v-content>
        <v-layout align-center justify-center>
          <v-container>
            <h1 class="font-weight-thin display-3 text-xs-center">Workspace orb app</h1>
          </v-container>
        </v-layout>
        <v-layout align-center justify-center v-if="authUser == ''">
          <v-container>
            <h2 class="font-weight-thin display-3">Войдите или зарегистрируйтесь</h2>
          </v-container>
        </v-layout>
        <v-layout align-center justify-center mb-3>
          <v-flex xs12 sm4 md3 class="text-sm-center">
            <v-text-field
              v-model="title"
              solo
              placeholder="Name"
              label="your name"
              v-if="resolveAddFlag"
            ></v-text-field>
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
        <v-layout justify-center>
          <v-flex
            xs12 sm6 md2
            v-for="(flag, index) in allFlag"
            :key="flag.id"
            ma-2
          >
            <v-card>
              <v-container pa-3>
                <v-layout justify-end>
                  <div class="text-xs-center">
                    <v-dialog
                      v-model="dialog[index]"
                      width="500"
                    >
                      <v-btn flat icon color="primary" slot="activator" class="ma-0">
                        <v-icon>settings</v-icon>
                      </v-btn>
                      <v-card justify-center>
                        <v-card-title
                          class="headline grey lighten-2"
                          primary-title
                        >
                          Privacy Policy
                        </v-card-title>
                        <v-card-text>
                          <v-textarea
                            solo
                            label="Mind message"
                            v-model="mindMessage"
                            no-resize
                          ></v-textarea>
                          <v-btn
                            color="primary"
                            class="ma-0"
                          >
                            Post my mind
                          </v-btn>
                        </v-card-text>
                        

                        <v-divider></v-divider>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="primary"
                            flat
                            @click="dialog = false"
                          >
                            Cancel
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </div>
                </v-layout>
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
                <v-layout v-if="flag.settings.mindMessage" elevation-1 pa-2>
                  <p class="mb-0 primary--text">{{flag.settings.mindMessage}}</p>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>

        <v-layout justify-center mb-3>  
            <v-btn flat @click="onLogout">
              Logout
            </v-btn>
        </v-layout>
    </v-content>
  </v-app>
</template>

<script>
import FlagSettings from './FlagSettings.vue'
export default {
  data () {
    return {
      title: '',
      color: 'cyan',
      dialog: [],
      mindMessage: ''
    }
  },
  components: {
    FlagSettings: FlagSettings
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
