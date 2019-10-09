<template>
  <div>
    <HeaderNav :pageID="pageID" :pageTitle="pageTitle" />
    <v-content class="px-3 pb-6">
      <ResultTile :singleResult="displayedItem" :pageID="pageID" />
      <v-card class="pa-2">
        <div>
          <v-row>
            <v-col class="col-12 col-sm-6">
              <v-row>
                <v-col class="col-8 col-sm-12">
                  <p class="font-weight-light font-italic mb-0">"{{displayedItem.summary}}"</p>
                </v-col>
                <v-col class="col-4 col-sm-12 d-flex justify-center">
                  <v-card outlined class="trail-img">
                    <v-img :src="displayedItem.imgSqSmall" alt="trail picture" />
                  </v-card>
                </v-col>
              </v-row>
            </v-col>

            <v-col class="col-12 col-sm-6">
              <v-row>
                <v-col cols="5" class="pb-1 px-2">
                  <p class="mb-0">
                    <span class="font-weight-bold">Length:</span>
                    {{milesToKm(displayedItem["length"])}} km
                  </p>
                </v-col>
                <v-col cols="7" class="pb-1 px-2">
                  <p class="mb-0">
                    <span class="font-weight-bold">Difficulty:</span>
                    {{difficultyDisplay}}
                  </p>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="5" class="pt-0 px-2">
                  <p class="mb-0">
                    <span class="font-weight-bold">Ascent:</span>
                    {{feetToM(displayedItem.ascent)}} m
                  </p>
                  <p class="mb-0">
                    <span class="font-weight-bold">Descent:</span>
                    {{-feetToM(displayedItem.descent)}} m
                  </p>
                </v-col>
                <v-col cols="7" class="pt-0 px-2">
                  <p class="mb-0">
                    <span class="font-weight-bold">Highest point:</span>
                    {{feetToM(displayedItem.high)}} m
                  </p>
                  <p class="mb-0">
                    <span class="font-weight-bold">Lowest point:</span>
                    {{feetToM(displayedItem.low)}} m
                  </p>
                </v-col>
              </v-row>
              <div>
                <h3 class="mt-3">Current conditions</h3>
                <v-row>
                  <v-col class="col-8 col-sm-6">
                    <p class="mb-1">{{displayedItem.conditionStatus}}</p>
                    <p
                      class="mb-1"
                      v-if="displayedItem.conditionDetails"
                    >{{displayedItem.conditionDetails}}</p>
                    <p class="mb-1">(last updated on {{displayedItem.conditionDate}})</p>
                  </v-col>
                  <v-col class="col-4 col-sm-6">
                    <p class="to-fix">(here goes weather tile)</p>
                  </v-col>
                </v-row>
              </div>
            </v-col>
          </v-row>
        </div>

        <div class="text-center mt-2 mb-5">
          <a :href="displayedItem.url" target="_blank">More info on HikingProject.com</a>
        </div>
        <div class="text-center">
          <v-btn class="to-fix" to="/event_finder" color="light-green darken-3" dark>I'm going there</v-btn>
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

  props: {},

  methods: {
    milesToKm(val) {
      return (val * 1.60934).toFixed(1);
    },
    feetToM(val) {
      return (val * 0.3048).toFixed(0);
    }
  },

  computed: {
    difficultyDisplay() {
      switch (this.displayedItem.difficulty) {
        case "dblack":
          return "Extreme";
        case "black":
          return "Hard";
        case "blueBlack":
          return "Advanced";
        case "blue":
          return "Intermediate";
        case "greenBlue":
          return "Moderate";
        case "green":
          return "Easy";
        default:
          return "Unknown";
      }
    }
  },

  created() {
    this.displayedItem = this.$store.state.selectedItem;
  }
};
</script>

<style>
@media screen and (orientation: landscape) {
  .trail-img {
    width: 20vw;
  }
}
</style>