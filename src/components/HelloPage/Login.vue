<template>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-5">
            <v-tabs
              color="primary"
              dark
              slider-color="cyan"
            >
              <v-tab ripple>
                Login
              </v-tab>
              <v-tab-item>
                <v-card-text>
                  <v-form v-model="validLogin" ref="formlogin" lazy-validation>
                    <v-text-field 
                      prepend-icon="person" 
                      name="email" 
                      label="Email" 
                      :rules="emailRules"
                      type="email"
                      v-model="email"
                    ></v-text-field>
                    <v-text-field 
                      v-model="password"
                      prepend-icon="lock" 
                      name="password" 
                      label="Password" 
                      type="password"
                      :counter="6"
                      :rules="passwordRules"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn 
                    color="primary"
                    @click="onSubmitLogin"
                    :loading="loading"
                    :disabled="!validLogin || loading"
                  >Login</v-btn>
                </v-card-actions>
              </v-tab-item>

              <v-tab ripple>
                Sign up
              </v-tab>
              <v-tab-item>
                <v-card-text>
                  <v-form v-model="validRegistration" ref="form" lazy-validation>
                    <v-text-field 
                      prepend-icon="person" 
                      name="email" 
                      label="Email" 
                      :rules="emailRules"
                      type="email"
                      v-model="email"
                    ></v-text-field>
                    <v-text-field 
                      v-model="password"
                      prepend-icon="lock" 
                      name="password" 
                      label="Password" 
                      type="password"
                      :counter="6"
                      :rules="passwordRules"
                    ></v-text-field>
                    <v-text-field 
                      v-model="confirmPassword"
                      prepend-icon="lock" 
                      name="confirm-password" 
                      label="Confirm password" 
                      type="password"
                      :counter="6"
                      :rules="confirmPasswordRules"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn 
                    color="primary"
                    @click="onSubmitRegistration"
                    :loading="loading"
                    :disabled="!validRegistration || loading"
                  >Create account</v-btn>
                </v-card-actions>
              </v-tab-item>
            </v-tabs>
          </v-card>
        </v-flex>
      </v-layout>

</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      validLogin: false,
      validRegistration: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Password must be equal or more than 6 characters'
      ],
      confirmPasswordRules: [
        v => !!v || 'Password is required',
        v => v === this.password || 'Password should match'
      ]
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onSubmitLogin () {
      if (this.$refs.formlogin.validate()) {
        const user = {
          email: this.email,
          password: this.password
        }

        this.$store.dispatch('loginUser', user)
          .then(() => {
            this.$router.push('/workspace')
          })
          .catch(() => {})
      } 
    },
    onSubmitRegistration () {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        }

        this.$store.dispatch('registerUser', user)
          .then(() => {
            this.$router.push('/workspace')
          })
          .catch(() => {})
      }
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
