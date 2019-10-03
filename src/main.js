import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import '@babel/polyfill'
import firebase from "firebase";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    var firebaseConfig = {
      apiKey: "AIzaSyA-O67YEWXcESbjHWpYYjXbdv73jx4Pzfc",
      authDomain: "hiking-fe2a7.firebaseapp.com",
      databaseURL: "https://hiking-fe2a7.firebaseio.com",
      projectId: "hiking-fe2a7",
      storageBucket: "",
      messagingSenderId: "765137018649",
      appId: "1:765137018649:web:df84a60a3e2e4f279aaf88",
      measurementId: "G-DMQ1CXY66B"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics(); npm
  }
}).$mount('#app')
