<template>
  <div>
    <HeaderNav :pageID="pageID" :pageTitle="pageTitle" :logged="logged" />
    <v-content>
      <div class="pa-3">
        <div>
          <h2
            class="subtitle-2 font-weight-bold text-center my-2"
          >Pin a spot on the map and choose a maximum distance, then push "Find Trails"</h2>
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
                    dark
                    class="ml-2"
                    color="light-green darken-3"
                    ripple
                    rounded
                    x-small
                    v-on:click="getTrails"
                  >Find Trails</v-btn>
                </div>
              </v-form>
            </div>
          </div>
        </div>
        <div id="mapid" class="mb-3"></div>
        <ResultsList :resultsList="trailList" :pageID="pageID" />
      </div>
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
        lat: 0,
        lon: 0
      },
      trailList: [
        {
          id: 7003941,
          name: "Pilatus Mountain/Pilatus Kulm",
          type: "Featured Hike",
          summary:
            "A beatiful, solitary hike with a highly commercialized ending.",
          difficulty: "blueBlack",
          stars: 4.9,
          starVotes: 8,
          location: "Alpnach, Switzerland",
          url:
            "https://www.hikingproject.com/trail/7003941/pilatus-mountainpilatus-kulm",
          imgSqSmall:
            "https://cdn-files.apstatic.com/hike/7003188_sqsmall_1554233241.jpg",
          imgSmall:
            "https://cdn-files.apstatic.com/hike/7003188_small_1554233241.jpg",
          imgSmallMed:
            "https://cdn-files.apstatic.com/hike/7003188_smallMed_1554233241.jpg",
          imgMedium:
            "https://cdn-files.apstatic.com/hike/7003188_medium_1554233241.jpg",
          length: 4.6,
          ascent: 5191,
          descent: -16,
          high: 6667,
          low: 1488,
          longitude: 8.277,
          latitude: 46.9553,
          conditionStatus: "All Clear",
          conditionDetails: "",
          conditionDate: "2019-06-27 02:26:05"
        },
        {
          id: 7051324,
          name: "Seceda - Odles",
          type: "Featured Hike",
          summary: "A beautiful trail on Odle.",
          difficulty: "greenBlue",
          stars: 5,
          starVotes: 2,
          location: "Santa Cristina Valgardena, Italy",
          url: "https://www.hikingproject.com/trail/7051324/seceda-odles",
          imgSqSmall:
            "https://cdn-files.apstatic.com/hike/7049677_sqsmall_1555688995.jpg",
          imgSmall:
            "https://cdn-files.apstatic.com/hike/7049677_small_1555688995.jpg",
          imgSmallMed:
            "https://cdn-files.apstatic.com/hike/7049677_smallMed_1555688995.jpg",
          imgMedium:
            "https://cdn-files.apstatic.com/hike/7049677_medium_1555688995.jpg",
          length: 8.4,
          ascent: 972,
          descent: -3998,
          high: 8055,
          low: 5025,
          longitude: 11.7248,
          latitude: 46.5979,
          conditionStatus: "Unknown",
          conditionDetails: null,
          conditionDate: "1970-01-01 00:00:00"
        }
      ]
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
      console.log("map clicked at " + event.latlng);
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
  height: 300px;
  z-index: 0;
}
</style>