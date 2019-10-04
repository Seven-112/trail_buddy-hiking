<template>
  <div>
    <HeaderNav :pageID="pageID" :pageTitle="pageTitle" />
    <v-content class="px-3 pb-6">
      <ResultTile :singleResult="displayedItem" :pageID="pageID" />
      <v-card class="pa-3 my-3">
        <div class="text-center">
          <v-btn
            class="text-none indigo--text underlined"
            text
            v-on:click="goToTrailDetail(displayedItem)"
          >More info on the trail</v-btn>
        </div>
        <div>
          <h3>Who's coming</h3>
          <div
            v-for="(participant, index) in displayedItem.participantsList"
            :key="index"
            class="to-fix"
          >
            <p>
              <span>(user pic)</span>
              Participant ID: {{participant.memberID}}
            </p>
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
      displayedItem: {}
    };
  },

  props: {
    /*logged: {
      type: Boolean
    }*/
  },

  methods: {
    goToTrailDetail(oneResult) {
      localStorage.storedResult = JSON.stringify(oneResult);
      this.$router.push("/trail_finder/detail/" + oneResult.id);
    }
  },

  created() {
    this.displayedItem = JSON.parse(localStorage.storedResult); // REMOVE AFTER IMPLEMENTING FIREBASE/AXIOS FETCH
    /*axios   //HERE GOES THE FETCH TO FIREBASE
      .get("https://www.hikingproject.com/data/get-trails-by-id", {
        params: {
          key: "200595378-7fe084d4861bcc0f6116d5babbf74a73",
          ids: localStorage.storedTrail
        }
      })
      .then(response => {
        this.displayedItem = response.data.trails[0];
        console.log(this.displayedItem);
      })
      .catch(function(error) {
        alert("Error in retrieving data:" + error);
      });*/
  }
};
</script>

<style>
.underlined {
  text-decoration: underline;
}
</style>