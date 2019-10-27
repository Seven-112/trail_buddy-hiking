<template>
  <div>
    <div>
      <HeaderNav :pageID="pageID" :pageTitle="pageTitle" />
    </div>
    <v-content>
      <div class="px-3">
        <v-row>
          <v-col class="col-12 col-sm-6 personal-info-container">
            <v-card class="pa-2 mb-3">
              <v-row>
                <v-col class="col-4 col-sm-12 d-flex justify-center">
                  <v-card>
                    <v-img :src="loggedUserPhotoURL" alt="profile picture" class="profile-img" />
                  </v-card>
                </v-col>
                <v-col class="col-8col-sm-12 d-flex flex-column justify-space-between">
                  <div class="align-self-center">
                    <h3>{{loggedUserName}}</h3>
                  </div>
                  <v-btn small dark color="red" class="ma-1" v-on:click="logout">Log out</v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>

          <v-col class="col-12 col-sm-6 py-0">
            <div>
              <h3 class="my-events mb-1 pt-3">My Events</h3>
              <div class="my-2 personal-event-container">
                <ResultsList :resultsList="eventList" :pageID="pageID" :searchParams="{}" />
              </div>
            </div>
          </v-col>
        </v-row>
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

  props: {},

  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
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
        this.eventObject = data.val();
        this.eventList = Object.values(data.val());
      });
  }
};
</script>

<style>
.personal-info-container {
  height: 25vh;
}

.personal-event-container {
  height: 57vh;
  overflow-y: scroll;
}

.my-events {
  height: 5vh;
}

@media screen and (orientation: landscape) {
  .profile-img {
    height: 43vh;
  }

  .profile-img div {
    background-size: contain;
  }

  .profile-img .v-responsive__content {
    width: 43vh !important;
  }

  .personal-event-container {
    height: 68vh;
    overflow-y: scroll;
  }

  .my-events {
    height: 10vh;
  }
}
</style>