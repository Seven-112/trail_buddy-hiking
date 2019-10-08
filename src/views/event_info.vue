<template>
  <div>
    <HeaderNav :pageID="pageID" :pageTitle="pageTitle" />
    <v-content class="px-3 pb-6">
      <ResultTile :singleResult="displayedItem" :pageID="pageID" />
      <div class="text-center">
        <v-btn
          class="text-none indigo--text underlined"
          text
          v-on:click="goToTrailDetail(displayedItem)"
        >More info on the trail</v-btn>
      </div>
      <div class="text-center">
        <v-btn
          dark
          class="pa-2"
          color="red"
          ripple
          v-if="userParticipates"
          v-on:click="cancelUserParticipation"
        >Cancel participation</v-btn>
        <v-btn
          dark
          class="pa-2"
          color="light-green darken-3"
          ripple
          v-else
          v-on:click="joinEvent"
        >Join event</v-btn>
      </div>
      <v-card class="pa-3 my-3">
        <div>
          <h3>Who's coming</h3>
          <div v-for="(participant, index) in displayedItem.participantsList" :key="index">
            <v-row>
              <v-col cols="2">
                <v-img :src="participant.photoURL" alt="profile picture" />
              </v-col>
              <v-col cols="10" class="d-flex justify-space-between flex-grow-1">
                <p>{{participant.name}}</p>
                <v-btn
                  v-if="participant.ID === loggedUserID"
                  small
                  class="ma-1 px-1"
                  v-on:click="cancelUserParticipation"
                >Cancel</v-btn>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-card>
      <v-card class="pa-3 my-3">
        <div>
          <h3>Event Chat</h3>
          <div>
            <p class="to-fix">(here goes chat)</p>
          </div>
        </div>
      </v-card>
    </v-content>
  </div>
</template>

<script>
import HeaderNav from "@/components/header_nav.vue";
import ResultTile from "@/components/result_tile.vue";
import axios from "axios";
import firebase from "firebase";

export default {
  name: "EventInfo",

  components: {
    HeaderNav,
    ResultTile
  },

  data() {
    return {
      pageID: "event_finder",
      pageTitle: "Event Info",
      //displayedItem: {},
      singleEventKey: ""
    };
  },

  props: {
    /*logged: {
      type: Boolean
    }*/
  },

  methods: {
    goToTrailDetail(oneResult) {
      //localStorage.storedResult = JSON.stringify(oneResult);
      this.$router.push("/trail_finder/detail/" + oneResult.id);
    },

    cancelUserParticipation() {
      console.log("cancelling");
      firebase
        .database()
        .ref(
          "eventList/" +
            this.displayedItem.eventID +
            "/participantsList/" +
            firebase.auth().currentUser.uid
        )
        .remove();
      this.$router.push("/private");
      // NEED TO FIND A WAY TO REFRESH FROM HERE!
    },

    joinEvent() {
      if (this.loggedUserID === null) {
        alert("You need to sign in first!");
        return;
      }

      let newParticipant = {
        name: firebase.auth().currentUser.displayName,
        ID: firebase.auth().currentUser.uid,
        photoURL: firebase.auth().currentUser.photoURL
      };

      firebase
        .database()
        .ref(
          "eventList/" +
            this.displayedItem.eventID +
            "/participantsList/" +
            firebase.auth().currentUser.uid
        )
        .set({
          name: firebase.auth().currentUser.displayName,
          photoURL: firebase.auth().currentUser.photoURL
        });

      alert("You joined the event!");
      this.$router.push("/private");
    }
  },

  computed: {
    loggedUserID() {
      if (firebase.auth().currentUser) {
        console.log("loggedIN");
        return firebase.auth().currentUser.uid;
      } else {
        console.log("No user logged");
        return null;
      }
    },

    listOfParticipants() {
      return Object.keys(this.displayedItem.participantsList);
    },

    numberOfParticipants() {
      return this.listOfParticipants.length;
    },

    userParticipates() {
      return this.listOfParticipants.some(
        participant => participant === firebase.auth().currentUser.uid
      );
    },

    displayedItem() {
      return this.$store.state.selectedItem;
    }
  },

  created() {
    this.displayedItem = this.$store.state.selectedItem;
    this.$store.dispatch("addTrailInfo");

    /*firebase
      .database()
      .ref("eventList")
      .orderByChild("eventID")
      .equalTo(this.displayedItem.eventID)
      .once("value", data => {
        //console.log(data.val());
        let output = data.val();
        for (let key in output) {
          console.log("keyyy:");
          console.log(key);
          this.singleEventKey = key.toString();
          console.log("inside loop:" + this.singleEventKey);
        }
      });*/
  }
};
</script>

<style>
.underlined {
  text-decoration: underline;
}
</style>