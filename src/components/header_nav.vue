<template>
  <v-app-bar app fixed dark class="light-green darken-3 pb-0">
    <v-btn class="flex-shrink-1" icon v-if="$route.params.detail" v-on:click="goBack">
      <v-icon>mdi-arrow-left-bold-circle</v-icon>
    </v-btn>
    <h1 class="title">{{pageTitle}}</h1>
    <div class="flex-grow-1"></div>
    <div>
      <!--v-if="!$route.params.detail"-->
      <v-btn class="flex-shrink-1" icon v-if="pageID !== 'home'" v-on:click="navigate('/')">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn
        class="flex-shrink-1"
        icon
        v-if="pageID !== 'trail_finder'"
        v-on:click="navigate('/trail_finder')"
      >
        <v-icon>mdi-map</v-icon>
      </v-btn>
      <v-btn
        class="flex-shrink-1"
        icon
        v-if="pageID !== 'event_finder'"
        v-on:click="navigate('/event_finder')"
      >
        <v-icon>mdi-calendar-month</v-icon>
      </v-btn>
      <v-btn
        class="flex-shrink-1"
        icon
        v-if="pageID !== 'private' && logged === true"
        v-on:click="navigate('/private')"
      >
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
      <v-btn
        class="flex-shrink-1"
        icon
        v-if="pageID !== 'private' && logged === false"
        v-on:click="login"
      >
        <v-icon>mdi-account-arrow-left</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import firebase from "firebase";
export default {
  name: "HeaderNav",
  props: {
    pageID: {
      type: String
    },
    pageTitle: {
      type: String
    } /*,
    logged: {
      type: Boolean
    }*/
  },
  data() {
    return {};
  },

  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    navigate(path) {
      localStorage.storedResult = ""; //resets selected item in the store
      this.$router.push(path);
    },
    login() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(user => {
          console.log(user);
          this.$store.commit("login");
        })
        .catch(err => alert(err));
    }
  },

  computed: {
    logged() {
      return this.$store.state.logged;
    }
  }
};
</script>

<style>
</style>