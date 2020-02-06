<template>
  <div class="home-container p-0">
    <v-content>
      <div class="upper-box d-flex justify-center align-end pb-12">
        <div>
          <h1 class="display-3 white--text">Trail Buddy</h1>
        </div>
      </div>
      <div class="lower-box d-flex justify-space-around align-center">
        <div class="d-flex flex-column align-center">
          <v-btn
            dark
            fab
            color="light-green darken-3"
            x-large
            v-if="pageID !== 'trail_finder'"
            to="/trail_finder"
          >
            <v-icon x-large>mdi-map</v-icon>
          </v-btn>
          <h2 class="text-center white--text headline py-3">Trails</h2>
        </div>

        <div class="d-flex flex-column align-center">
          <v-btn
            dark
            fab
            color="amber darken-3"
            x-large
            v-if="pageID !== 'trail_finder'"
            to="/event_finder"
          >
            <v-icon x-large>mdi-calendar-clock</v-icon>
          </v-btn>
          <h2 class="text-center white--text headline py-3">Events</h2>
        </div>

        <div v-if="logged === false" class="d-flex flex-column align-center">
          <v-btn
            dark
            fab
            color="blue darken-2"
            x-large
            v-if="pageID !== 'trail_finder'"
            v-on:click="login"
          >
            <v-icon x-large>mdi-account-arrow-left</v-icon>
          </v-btn>
          <h2 class="text-center white--text headline py-3">Login</h2>
        </div>

        <div v-if="logged === true" class="d-flex flex-column align-center">
          <v-btn
            dark
            fab
            color="blue darken-2"
            x-large
            v-if="pageID !== 'trail_finder'"
            to="/private"
          >
            <v-icon x-large>mdi-account</v-icon>
          </v-btn>
          <h2 class="text-center white--text headline py-3">You</h2>
        </div>
      </div>
    </v-content>
  </div>
</template>


<script>
import firebase from "firebase";
export default {
  name: "home",
  components: {},
  data() {
    return {
      pageID: "home",
      pageTitle: "Homepage"
    };
  },
  props: {},
  methods: {
    login() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(user => {
          this.$store.commit("login", firebase.auth().currentUser);
          this.$router.push("/private");
        })
        .catch(err => alert("Error during login: " + err));
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
.home-container {
  background-image: url("../assets/hiking_sm_02.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
}
.upper-box {
  height: 55vh;
}
.lower-box {
  height: 45vh;
}

@media screen and (min-width: 992px) {
  .home-container {
    background-image: url("../assets/hiking_lg_02.jpg");
  }
}
</style>
