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
                    <p>{{flag.userId}}</p>
                  </v-card-text>
                </v-flex>
              </v-layout>
            </v-card>
            <v-btn
              @click="createFlag"
              :loading="loading"
              :disabled="loading"
            >
              Add data
            </v-btn>
            <p>
              test: {{test}}
            </p>
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
import * as firebase from 'firebase'

export default {
  data () {
    return {
      title: '',
      test: []
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
      return this.$store.getters.allUser
    }
  },
  created() {
    let test = this.test;
    let data;
    let refVal = firebase.database().ref().child('ads')
    
    refVal.on('value', snap => {
      data = JSON.stringify(snap.val(), null, 3)
      console.log('ss= ', test)
      test.push(data)
    })
    

  }
}
</script>

<style>

</style>
