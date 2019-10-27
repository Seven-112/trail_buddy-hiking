<template>
  <v-app-bar app fixed dark class="light-green darken-3 pb-0">
    <v-btn icon v-if="$route.params.detail" v-on:click="goBack">
      <v-icon>mdi-arrow-left-bold-circle</v-icon>
    </v-btn>
    <h1 class="title">{{pageTitle}}</h1>
    <div class="flex-grow-1"></div>
    <div>
      <v-btn icon :disabled="pageID === 'trail_finder'" v-on:click="navigate('/trail_finder')">
        <v-icon>mdi-map</v-icon>
      </v-btn>
      <v-btn icon :disabled="pageID === 'event_finder'" v-on:click="navigate('/event_finder')">
        <v-icon>mdi-calendar-range</v-icon>
      </v-btn>
      <v-btn
        icon
        v-if="logged === true"
        :disabled="pageID === 'private'"
        v-on:click="navigate('/private')"
      >
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
      <v-btn icon v-else v-on:click="login">
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
    }
  },
  data() {
    return {};
  },

  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    navigate(path) {
      this.$store.state.selectedItem = {}; //resets selected item in the store
      this.$store.state.storedTrails = []; //resets stored trail list in the store
      this.$router.push(path);
    },
    login() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(user => {
          this.$store.commit("login", firebase.auth().currentUser);
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
.v-sheet .v-toolbar__content {
  padding: 4px 12px !important;
  height: 8vh !important;
}
header {
  height: 8vh !important;
}

@media screen and (orientation: landscape) {
  .v-sheet .v-toolbar__content {
    height: 12vh !important;
  }
  header {
    height: 12vh !important;
  }
}
</style>