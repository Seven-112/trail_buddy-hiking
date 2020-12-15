<template>
  <div>
    <HeaderNav :pageID="pageID" :pageTitle="pageTitle" />
    <v-content>
      <v-snackbar v-model="snackbar" :timeout="timeout">
        <span class="py-0 px-3"
          >Pin a spot on the map and choose a maximum distance</span
        >
        <v-btn
          color="light-green lighten-1"
          text
          @click="snackbar = false"
          class="ml-2"
          >Close</v-btn
        >
      </v-snackbar>

      <v-container fluid class="py-2">
        <v-row class="px-3">
          <v-col class="col-12 col-sm-6 py-0">
            <div id="mapid"></div>
          </v-col>
          <v-col
            class="col-12 col-sm-6 pt-1 pb-0 d-flex flex-column justify-space-between"
          >
            <div>
              <div>
                <div>
                  <p class="pa-0 ma-0 caption">Max distance:</p>
                  <v-form class="d-flex mt-0 pt-0 landscape-vertical">
                    <v-slider
                      class="mt-0 pt-0"
                      name="max-dist"
                      min="6"
                      max="93"
                      v-model="maxDist"
                      color="light-green darken-3"
                      track-color="light-green lighten-3"
                    >
                      <template v-slot:append>
                        <p class="text-no-wrap body-2">
                          {{ milesToKm(maxDist) }} km
                        </p>
                      </template>
                    </v-slider>
                    <div class="landscape-align-self-center">
                      <v-btn
                        :dark="selectedSpot.lat !== null"
                        class="ml-2"
                        color="light-green darken-3"
                        ripple
                        rounded
                        x-small
                        v-on:click="getTrails"
                        :disabled="selectedSpot.lat === null"
                        >Find Trails</v-btn
                      >
                    </div>
                  </v-form>
                </div>
              </div>
            </div>
            <div class="trail-list-container">
              <ResultsList
                :resultsList="trailList"
                :pageID="pageID"
                :searchSpot="selectedSpot"
                :maxDist="maxDist"
              />
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
    ResultsList,
  },

  data() {
    return {
      pageID: "trail_finder",
      pageTitle: "Find a Trail",
      maxDist: 6,
      selectedSpot: {
        lat: 41.3851,
        lon: 2.1734
      },
      trailList: [],
      snackbar: true,
      timeout: 8000,
      mymap: "",
      marker: "",
      circle: ""
    };
  },

  watch: {
    maxDist: function (newMaxDist) {
      if (this.circle !== "") {
        this.drawCircle(newMaxDist);
      }
	},
	selectedSpot: {
		handler(newSpot) {
			this.updateMap();
		},
		deep: true
	}
  },
  methods: {
    milesToKm(val) {
      return (val * 1.60934).toFixed(0);
    },

    getTrails() {
      axios
        .get("https://www.hikingproject.com/data/get-trails", {
          params: {
            key: "200595378-7fe084d4861bcc0f6116d5babbf74a73",
            lat: this.selectedSpot.lat,
            lon: this.selectedSpot.lon,
            maxDistance: this.maxDist,
          },
        })
        .then((response) => {
          this.trailList = response.data.trails;
        })
        .catch(function (error) {
          alert("Error in retrieving data:" + error);
        });
    },

    drawCircle(radius) {
      if (this.circle !== "") {
        this.mymap.removeLayer(this.circle);
      }
      this.circle = L.circle([this.selectedSpot.lat, this.selectedSpot.lon], {
        radius: this.milesToKm(this.maxDist) * 1000,
      }).addTo(this.mymap);
    },

    updateMap() {
	  const currentZoom = this.mymap.getZoom();
	  this.mymap.setView(
        [this.selectedSpot.lat, this.selectedSpot.lon],
        currentZoom
      );

      if (this.marker !== "") {
        this.mymap.removeLayer(this.marker);
      }
      if (this.circle !== "") {
        this.mymap.removeLayer(this.circle);
      }
      this.marker = L.marker([
        this.selectedSpot.lat,
        this.selectedSpot.lon,
      ]).addTo(this.mymap);
      this.drawCircle(this.maxDist);
    },
  },

  created() {
    if (this.$store.state.storedTrails.length !== 0) {
      this.trailList = this.$store.state.storedTrails;
    }
    if (this.$store.state.storedSpot.lat && this.$store.state.storedSpot.lon) {
      this.selectedSpot.lat = this.$store.state.storedSpot.lat;
      this.selectedSpot.lon = this.$store.state.storedSpot.lon;
    } else {
      window.navigator.geolocation.getCurrentPosition((position) => {
        this.selectedSpot.lat = position.coords.latitude;
        this.selectedSpot.lon = position.coords.longitude;
      });
    }
    if (this.$store.state.storedMaxDist !== 0) {
      this.maxDist = this.$store.state.storedMaxDist;
    }
  },

  mounted() {
    this.mymap = L.map("mapid").setView(
      [this.selectedSpot.lat, this.selectedSpot.lon],
      8
    );
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoicGludGVjMTAiLCJhIjoiY2sxNjdobDh6MHp5aDNvdGdubWYxdWwxOCJ9.JjH40Kq67-JXH8ySTIEtGw",
      }
    ).addTo(this.mymap);
	
	this.updateMap();

    this.mymap.on("click", (event) => {
      if (this.marker !== "") {
        this.mymap.removeLayer(this.marker);
      }
      if (this.circle !== "") {
        this.mymap.removeLayer(this.circle);
      }
      this.marker = L.marker(event.latlng).addTo(this.mymap);
      this.selectedSpot.lon = event.latlng.lng;
      this.selectedSpot.lat = event.latlng.lat;
      this.drawCircle(this.maxDist);
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