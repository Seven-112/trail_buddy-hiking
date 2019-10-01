<template>
  <div>
    <HeaderNav :pageID="pageID" :pageTitle="pageTitle" :logged="logged" />
    <ResultTile :singleResult="displayedItem" :pageID="pageID" />
    <div>
      <div>
        <p>{{displayedItem.summary}}</p>
        <p>Length: {{milesToKm(displayedItem["length"])}} km</p>
        <p>Ascent: {{feetToM(displayedItem.ascent)}} m</p>
        <p>Descent: {{-feetToM(displayedItem.descent)}} m</p>
        <p>Highest point: {{feetToM(displayedItem.high)}} m</p>
        <p>Lowest point: {{feetToM(displayedItem.low)}} m</p>
        <p>Difficulty: {{displayedItem.difficulty}}</p>
      </div>
      <div>
        <img :src="displayedItem.imgSqSmall" alt="trail picture" />
      </div>
    </div>
    <div>
      <div>
        <h3>Current conditions</h3>
        <p>{{displayedItem.conditionStatus}}</p>
        <p v-if="displayedItem.conditionDetails">{{displayedItem.conditionDetails}}</p>
        <p>(last updated on {{displayedItem.conditionDate}})</p>
      </div>
      <div>
        <p class="to-fix">(here goes weather tile)</p>
      </div>
    </div>
    <div>
      <a :href="displayedItem.url" target="_blank">More info on HikingProject.com</a>
    </div>
    <div>
      <router-link to="/event_finder">
        <button class="to-fix">
          <p>I'm going there</p>
        </button>
      </router-link>
    </div>
  </div>
</template>


<script>
import HeaderNav from "@/components/header_nav.vue";
import ResultTile from "@/components/result_tile.vue";
import axios from "axios"; // TRYING AXIOS
export default {
  name: "TrailInfo",

  components: {
    HeaderNav,
    ResultTile
  },

  data() {
    return {
      pageID: "trail_finder",
      pageTitle: "Trail Info",
      displayedItem: {}
    };
  },

  props: {
    logged: {
      type: Boolean
    }
  },

  methods: {
    milesToKm(val) {
      return (val * 1.60934).toFixed(1);
    },
    feetToM(val) {
      return (val * 0.3048).toFixed(0);
    },
    getSingleTrail() {
      axios
        .get("https://www.hikingproject.com/data/get-trails-by-id", {
          params: {
            key: "200595378-7fe084d4861bcc0f6116d5babbf74a73",
            ids: this.$route.params.itemID
          }
        })
        .then(response => {
          this.displayedItem = response.data.trails[0];
          console.log(this.displayedItem);
        })
        .catch(function(error) {
          alert("Error in retrieving data:" + error);
        });
    }
  },

  created() {
    //this.displayedItem = JSON.parse(localStorage.storedResult); //REMOVE IF USING AXIOS
    this.getSingleTrail();
  }
};
</script>

<style>
</style>