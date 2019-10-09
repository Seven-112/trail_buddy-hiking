<template>
  <div>
    <HeaderNav :pageID="pageID" :pageTitle="pageTitle" />
    <v-content>
      <h2
        class="subtitle-2 font-weight-bold text-center my-2"
      >Pin a spot on the map and choose a maximum distance, then push "Find Trails"</h2>
      <v-container fluid>
        <v-row class="px-3">
          <v-col class="col-12 col-sm-6 py-0">
            <div id="mapid" class="mb-3"></div>
          </v-col>
          <v-col class="col-12 col-sm-6 py-0">
            <div>
              <div>
                <div>
                  <p class="pa-0 ma-0 caption">Max distance:</p>
                  <v-form class="d-flex mt-0 pt-0">
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
                    <div>
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

            <ResultsList :resultsList="trailList" :pageID="pageID" />
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
      trailList: []
    };
  },

  props: {
    /*logged: {
      type: Boolean
    }*/
  },

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
          console.log(this.trailList);
        })
        .catch(function(error) {
          alert("Error in retrieving data:" + error);
        });
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
  height: 300px;
  z-index: 0;
}

@media screen and (orientation: landscape) {
  #mapid {
    height: 65vh;
  }
}
</style>