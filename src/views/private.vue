<template>
  <div>
    <div>
      <HeaderNav :pageID="pageID" :pageTitle="pageTitle" />
    </div>
    <v-content>
      <div class="pa-3">
        <v-card class="pa-2 mb-3">
          <v-row>
            <v-col cols="4">
              <v-card class="mx-auto">
                <v-img :src="loggedUserPhotoURL" alt="profile picture" class />
              </v-card>
            </v-col>
            <v-col cols="8" class="d-flex flex-column justify-space-between">
              <div class="align-self-center">
                <h3>{{loggedUserName}}</h3>
              </div>
              <v-btn small class="ma-1" v-on:click="logout">Log out</v-btn>
              <!--</div>-->
            </v-col>
          </v-row>
        </v-card>

        <div>
          <h3>My Events</h3>
          <div>
            <p class="to-fix">(here goes user's event list)</p>
          </div>
        </div>
      </div>
    </v-content>
    <!--<button v-on:click="testStoreShow">Showing here...</button>
    <p>{{testVar.name}}</p>-->
  </div>
</template>

<script>
import HeaderNav from "@/components/header_nav.vue";
import firebase from "firebase";
export default {
  name: "Private",
  components: {
    HeaderNav
  },

  data() {
    return {
      pageID: "private",
      pageTitle: "My own page",
      loggedUserName: "",
      loggedUserPhotoURL: ""
    };
  },

  props: {
    /*logged: {
      type: Boolean
    }*/
  },

  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("you logged out");
          this.$store.commit("logout");
          this.$router.push("/");
        })
        .catch(function(error) {
          console.log("There was an error: " + error);
        });
    }
  },

  created() {
    this.loggedUserName = firebase.auth().currentUser.displayName;
    this.loggedUserPhotoURL = firebase.auth().currentUser.photoURL;
  }
};
</script>

<style>
/*.profile-pic {
  width: auto;
  object-fit: contain;
  margin: auto;
}*/
</style>