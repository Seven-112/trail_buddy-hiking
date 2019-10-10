<template>
  <div>
    <HeaderNav :pageID="pageID" :pageTitle="pageTitle" />
    <v-content>
      <v-container fluid class="d-flex flex-column">
        <v-row>
          <v-col class="col-12 col-sm-6 py-0">
            <ResultTile :singleResult="displayedItem" :pageID="pageID" />
            <div class="d-flex justify-space-between">
              <div class="text-center">
                <v-btn
                  v-on:click="goToTrailDetail(displayedItem)"
                  color="blue-grey lighten-5"
                >Trail info</v-btn>
              </div>
              <div class="text-center">
                <v-btn
                  dark
                  class="pa-2"
                  color="red"
                  ripple
                  v-if="userParticipates"
                  v-on:click="cancelUserParticipation"
                >Leave event</v-btn>
                <v-btn
                  dark
                  class="pa-2"
                  color="light-green darken-3"
                  ripple
                  v-else
                  v-on:click="joinEvent"
                >Join event</v-btn>
              </div>
            </div>
            <v-expansion-panels class="my-3">
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <h3>Who's coming</h3>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
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
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>

          <v-col class="col-12 col-sm-6 py-0">
            <div class="d-flex flex-column flex-grow-1 main-chat-window">
              <v-card v-if="userParticipates" class="pa-3 flex-grow-1">
                <h3 class="mb-2">Event Chat</h3>
                <div class="messages-window" id="chat">
                  <div
                    v-for="(singleMessage, index) in allMessages"
                    :key="index"
                    class="d-flex align-start my-1"
                  >
                    <img :src="singleMessage.foto" style="width: 40px;" class="mr-2" />
                    <p>
                      <span class="font-weight-bold">{{singleMessage.name}}:</span>
                      {{singleMessage.text}}
                    </p>
                  </div>
                  <div class="d-flex align-end">
                    <v-text-field type="text" v-model="message" placeholder="write a message" />
                    <v-btn icon @click="sendMessage">
                      <v-icon class="ml-1">mdi-send</v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
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
      message: "",
      allMessages: {}
    };
  },

  props: {},

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
    },

    sendMessage() {
      let obj = {
        text: this.message,
        name: firebase.auth().currentUser.displayName,
        foto: firebase.auth().currentUser.photoURL
      };
      firebase
        .database()
        .ref("chat/" + this.displayedItem.eventID)
        .push(obj);
      this.message = "";
    },

    scrollToEnd: function() {
      var container = document.getElementById("chat");
      container.scrollTop = container.scrollHeight;
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
      if (this.$store.state.logged) {
        return this.listOfParticipants.some(
          participant => participant === firebase.auth().currentUser.uid
        );
      } else return false;
    },

    displayedItem() {
      return this.$store.state.selectedItem;
    }
  },

  created() {
    this.displayedItem = this.$store.state.selectedItem;
    this.$store.dispatch("addTrailInfo");

    firebase
      .database()
      .ref("chat/" + this.displayedItem.eventID)
      .on("value", data => {
        this.allMessages = data.val();
        setTimeout(() => {
          this.scrollToEnd();
        }, 100);
      });
  }
};
</script>

<style>
.underlined {
  text-decoration: underline;
}
.messages-window {
  overflow: scroll;
  flex-grow: 1;
  max-height: 100%;
  height: 45vh;
}

.main-chat-window {
  flex-grow: 1;
}

.border-red {
  border: 1px solid red;
}
</style>