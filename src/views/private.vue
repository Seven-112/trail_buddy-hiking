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
          <div class="my-5">
            <ResultsList :resultsList="eventList" :pageID="pageID" :searchParams="{}" />
          </div>
        </div>
      </div>
    </v-content>
  </div>
</template>

<script>
import HeaderNav from "@/components/header_nav.vue";
import ResultsList from "@/components/results_list.vue";
import firebase from "firebase";
export default {
  name: "Private",
  components: {
    HeaderNav,
    ResultsList
  },

  data() {
    return {
      pageID: "private",
      pageTitle: "My own page",
      loggedUserName: "",
      loggedUserPhotoURL: "",
      eventList: []
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
    this.loggedUserName = this.$store.state.loggedUser.displayName;
    this.loggedUserPhotoURL = this.$store.state.loggedUser.photoURL;
    this.loggedUserID = this.$store.state.loggedUser.uid;

    firebase
      .database()
      .ref("eventList")
      .once("value", data => {
        console.log(data.val());
        this.eventObject = data.val();
        this.eventList = Object.values(data.val());
      });
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