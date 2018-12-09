<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
    <template v-if="error">
      <v-snackbar
        :multi-line="true"
        :timeout="5000"
        color="error"
        @input="closeError"
        :value="true"
      >
        {{error}}
        <v-btn
          dark
          flat
          @click="closeError"
          :value="true"
        >
          Close
        </v-btn>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    },
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    }
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    }
  },
  name: 'App'
}
</script>
