<template>
  <div>
    <HeaderNav :pageID="pageID" :pageTitle="pageTitle" :logged="logged" />
    <ResultTile :singleResult="displayedItem" :pageID="pageID" />
    <div>
      <!--<router-link :to="'/trail_finder/detail/' + displayedItem.trailID ">More info on the trail</router-link>-->
      <!-- REMOVE INLINE STYLE!-->
      <p class="link-text" v-on:click="goToTrailDetail(displayedItem)">More info on the trail</p>
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
      <h3>Event Chat</h3>
      <div>
        <p class="to-fix">(here goes chat)</p>
      </div>
    </div>
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
      pageTitle: "Event Information",
      displayedItem: {}
    };
  },

  props: {
    logged: {
      type: Boolean
    }
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
.link-text {
  color: blue;
  text-decoration: underline;
}

.link-text:hover {
  color: rgb(0, 110, 255);
  cursor: pointer;
}
</style>