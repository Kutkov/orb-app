<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
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
          Settings
        </v-card-title>
        <v-card-text>
          <v-textarea
            solo
            label="Write your Mind message"
            v-model="mindMessage"
            no-resize
          ></v-textarea>
          <v-btn
            color="primary"
            class="ma-0"
            @click="postMindMessage"
            :loading="loading"
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
</template>

<script>
export default {
  props: ['flagKey'],
  data () {
    return {
      dialog: false,
      mindMessage: ''
    }
  },
  methods: {
    postMindMessage () {
      const payload = {
        mindMessage: this.mindMessage,
        key: this.flagKey
      }
      this.$store.dispatch('updateSettings', payload)
      this.dialog = false
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style scoped>

</style>
