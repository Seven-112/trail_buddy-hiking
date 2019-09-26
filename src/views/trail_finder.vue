<template>
  <div>
    <HeaderNav :pageID="pageID" :pageTitle="pageTitle" :logged="logged" />
    <div>
      <h2>Choose a spot and a max. distance</h2>
      <div>
        <form action="#">
          Maximum distance:
          <input type="range" name="max-dist" min="20" max="200" v-model="maxDist" />
          {{milesToKm(maxDist)}} km
          <input type="submit" value="Find trails" />
        </form>
      </div>
    </div>
    <div>
      <br />
      <strong class="to-fix">(here goes the map)</strong>
      <br />
    </div>
    <!--<div>
      <br />
      <strong class="to-fix">(here go the results)</strong>
      <br />
    </div>-->
    <ResultsList :resultsList="trailList" :pageID="pageID" />
  </div>
</template>

<script>
import HeaderNav from "@/components/header_nav.vue";
import ResultsList from "@/components/results_list.vue";
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
      maxDist: 20,
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
    }
  }
};
</script>

<style>
</style>