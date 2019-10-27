<template>
  <div>
    <HeaderNav :pageID="pageID" :pageTitle="pageTitle" />
    <v-content>
      <v-snackbar v-model="snackbar" timeout="8000">
        <span class="py-0 px-3">Pin a spot on the map and choose a maximum distance</span>
        <v-btn color="light-green lighten-1" text @click="snackbar = false" class="ml-2">Close</v-btn>
      </v-snackbar>

      <v-container fluid class="py-2">
        <v-row class="px-3">
          <v-col class="col-12 col-sm-6 py-0">
            <div id="mapid"></div>
          </v-col>
          <v-col class="col-12 col-sm-6 pt-1 pb-0 d-flex flex-column justify-space-between">
            <div>
              <div>
                <div>
                  <p class="pa-0 ma-0 caption">Max distance:</p>
                  <v-form class="d-flex mt-0 pt-0 landscape-vertical">
                    <v-slider
                      class="mt-0 pt-0"
                      name="max-dist"
                      min="5"
                      max="200"
                      v-model="maxDist"
                      color="light-green darken-3"
                      track-color="light-green lighten-3"
                    >
                      <template v-slot:append>
                        <p class="text-no-wrap body-2">{{milesToKm(maxDist)}} km</p>
                      </template>
                    </v-slider>
                    <div class="landscape-align-self-center">
                      <v-btn
                        :dark="selectedSpot.lat!==null"
                        class="ml-2"
                        color="light-green darken-3"
                        ripple
                        rounded
                        x-small
                        v-on:click="getTrails"
                        :disabled="selectedSpot.lat===null"
                      >Find Trails</v-btn>
                    </div>
                  </v-form>
                </div>
              </div>
            </div>
            <div class="trail-list-container">
              <ResultsList :resultsList="trailList" :pageID="pageID" />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import HeaderNav from "@/components/header_nav.vue";
import ResultsList from "@/components/results_list.vue";
import axios from "axios";
export default {
  name: "TrailFinder",
  components: {
    HeaderNav,
    ResultsList
  },

  data() {
    return {
      pageID: "trail_finder",
      pageTitle: "Find a Trail",
      maxDist: 5,
      selectedSpot: {
        lat: null,
        lon: null
      },
      trailList: [],
      snackbar: true
    };
  },

  props: {},

  methods: {
    milesToKm(val) {
      return (val * 1.60934).toFixed(1);
    },

    getTrails() {
      axios
        .get("https://www.hikingproject.com/data/get-trails", {
          params: {
            key: "200595378-7fe084d4861bcc0f6116d5babbf74a73",
            lat: this.selectedSpot.lat,
            lon: this.selectedSpot.lon,
            maxDistance: this.maxDist
          }
        })
        .then(response => {
          this.trailList = response.data.trails;
        })
        .catch(function(error) {
          alert("Error in retrieving data:" + error);
        });
    }
  },

  created() {
    if (this.$store.state.storedTrails.length !== 0) {
      this.trailList = this.$store.state.storedTrails;
    }
  },

  mounted() {
    var mymap = L.map("mapid").setView([41.3851, 2.1734], 10);
    var marker;
    L.tileLayer(
      "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken:
          "pk.eyJ1IjoicGludGVjMTAiLCJhIjoiY2sxNjdobDh6MHp5aDNvdGdubWYxdWwxOCJ9.JjH40Kq67-JXH8ySTIEtGw"
      }
    ).addTo(mymap);
    mymap.on("click", event => {
      //console.log("map clicked at " + event.latlng);
      if (marker) {
        mymap.removeLayer(marker);
      }
      marker = L.marker(event.latlng).addTo(mymap);
      this.selectedSpot.lon = event.latlng.lng;
      this.selectedSpot.lat = event.latlng.lat;
    });
  }
};
</script>

<style>
#mapid {
  width: 100%;
  height: 40vh;
  z-index: 0;
}

.trail-list-container {
  height: 37vh;
  overflow-y: scroll;
}

@media screen and (orientation: landscape) {
  #mapid {
    height: 79vh;
  }

  .landscape-align-self-center {
    align-self: center;
    margin-bottom: 12px;
  }

  .trail-list-container {
    height: 60vh;
    overflow-y: auto;
  }
}
</style>