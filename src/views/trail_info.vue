<template>
  <div>
    <HeaderNav :pageID="pageID" :pageTitle="pageTitle" />
    <v-content class="px-3 pb-6">
      <ResultTile :singleResult="displayedItem" :pageID="pageID" />
      <v-card class="px-2 py-3">
        <div>
          <v-row>
            <v-col class="col-12 col-sm-5 py-0">
              <v-row>
                <v-col class="col-8 col-sm-12">
                  <p class="font-weight-light font-italic mb-0">"{{displayedItem.summary}}"</p>
                </v-col>
                <v-col class="col-4 col-sm-12 d-flex justify-center">
                  <!--<v-card :outlined=" !== ''" class="trail-img">-->
                  <!--<v-card :outlined="displayedItem.imgMedium !== ''" class="trail-img">-->
                  <v-card :outlined="getResponsiveImage !== ''" class="trail-img">
                    <v-img
                      v-if="getResponsiveImage !== ''"
                      :src="getResponsiveImage"
                      alt="trail picture"
                    />
                    <v-img v-else src="../assets/noimg100.png" alt="mountain" />
                  </v-card>
                </v-col>
              </v-row>
            </v-col>

            <v-col class="col-12 col-sm-7 mx-0 py-0">
              <v-row>
                <v-col cols="5" class="pb-1 px-3">
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
                <v-col cols="5" class="pt-0 px-3">
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
                  <v-col class="col-7 col-sm-6 pb-0">
                    <div v-if="conditionInfoIsRecent">
                      <p class="mb-1 font-weight-bold">{{displayedItem.conditionStatus}}</p>
                      <p
                        class="mb-1"
                        v-if="displayedItem.conditionDetails"
                      >{{displayedItem.conditionDetails}}</p>
                      <p class="mb-1">(updated: {{conditionUpdateDate}})</p>
                    </div>
                    <div v-else>
                      <p class="mb-0">No recent information available</p>
                    </div>
                  </v-col>
                  <v-col class="col-5 col-sm-6 pb-0">
                    <p class="mb-1 font-weight-bold">Weather:</p>
                    <p class="mb-0">{{currentWeather.main}}</p>
                    <p class="mb-0">({{currentWeather.description}})</p>
                  </v-col>
                </v-row>
              </div>
            </v-col>
          </v-row>
        </div>

        <div class="text-center mt-3 mb-5">
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
      displayedItem: {},
      currentWeather: {}
    };
  },

  props: {},

  methods: {
    milesToKm(val) {
      return (val * 1.60934).toFixed(1);
    },
    feetToM(val) {
      return (val * 0.3048).toFixed(0);
    },

    getWeather() {
      axios
        .get("https://api.openweathermap.org/data/2.5/weather", {
          params: {
            APPID: "4563caabd11f73b9b6a35aa137d07b48",
            lat: this.displayedItem.latitude,
            lon: this.displayedItem.longitude
          }
        })
        .then(response => {
          this.currentWeather = response.data.weather[0];
        })
        .catch(function(error) {
          alert("Error in retrieving weather data:" + error);
        });
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
    },

    conditionInfoIsRecent() {
      let now = new Date().getTime();
      let infoDate = Date.parse(this.displayedItem.conditionDate);
      let infoAgeMs = now - infoDate;

      let minutes = 1000 * 60;
      let hours = minutes * 60;
      let days = hours * 24;
      let years = days * 365;

      let infoAgeDays = Math.round(infoAgeMs / days);

      return infoAgeDays < 180;
    },

    conditionUpdateDate() {
      return this.displayedItem.conditionDate.toString().slice(0, 10);
    },

    getResponsiveImage() {
      if (window.outerWidth < 992 && this.displayedItem.imgSqSmall !== "") {
        return this.displayedItem.imgSqSmall;
      } else if (this.displayedItem.imgMedium !== "") {
        return this.displayedItem.imgMedium;
      } else return "";
    }
  },

  created() {
    this.displayedItem = this.$store.state.selectedItem;
    this.getWeather();
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