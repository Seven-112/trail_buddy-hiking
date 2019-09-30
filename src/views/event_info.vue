<template>
  <div>
    <HeaderNav :pageID="pageID" :pageTitle="pageTitle" :logged="logged" />
    <ResultTile :singleResult="displayedItem" :pageID="pageID" />
    <div>
      <!--<router-link :to="'/trail_finder/detail/' + displayedItem.trailID ">More info on the trail</router-link>-->
      <p v-on:click="goToTrailDetail">More info on the trail</p>
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

  methods: {
    goToTrailDetail() {
      //
    }
  },

  created() {
    this.displayedItem = JSON.parse(localStorage.storedResult);
  }
};
</script>

<style>
</style>