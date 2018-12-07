// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import * as firebase from 'firebase'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created() {
    var config = {
      apiKey: "AIzaSyAwy7TznJ-Fq9clMhl05otP8kfER0iuQP8",
      authDomain: "org-app-2c69d.firebaseapp.com",
      databaseURL: "https://org-app-2c69d.firebaseio.com",
      projectId: "org-app-2c69d",
      storageBucket: "org-app-2c69d.appspot.com",
      messagingSenderId: "945015775211"
    };
    firebase.initializeApp(config);
  }
})
