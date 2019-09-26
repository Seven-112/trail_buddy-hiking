<template>
  <div>
    <HeaderNav :pageID="pageID" :pageTitle="pageTitle" :logged="logged" />
    <div>
      <h1>Trail Buddy</h1>
    </div>
    <div>
      <router-link to="/trail_finder" tag="button">
        <h2>Find a trail</h2>
      </router-link>
      <router-link to="/login" tag="button" v-if="logged===false">
        <h2>Login / Register</h2>
      </router-link>
      <router-link to="/private" tag="button" v-else>
        <h2>Private Area</h2>
      </router-link>
    </div>
    <!--<button v-on:click="testStoreFn">Storing here!</button>
    <button v-on:click="testStoreShow">Showing here...</button>
    <p>{{testVar}}</p>
    <br />
    <router-link to="/private">
      <button v-on:click="testStoreFnII">
        <p>Private Area AND store</p>
      </button>
    </router-link>-->
  </div>
</template>


<script>
export default {
  name: "home",
  components: {},
  data() {
    return {
      pageID: "home",
      pageTitle: "Homepage"
      /*testVar: "", //DELETE ME AND THE NEXT GUY
      testTrailtosave: {
        id: 7003941,
        name: "Pilatus Mountain TEST!/Pilatus Kulm",
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
      }*/
    };
  },
  props: {
    logged: {
      type: Boolean
    }
  },
  methods: {
    /*testStoreFn() {
      //DELETE ME
      localStorage.testStoreVar = "ciao";
    },
    testStoreFnII() {
      //DELETE ME
      localStorage.testStoreVar = JSON.stringify(this.testTrailtosave);
    },
    testStoreShow() {
      //DELETE ME
      this.testVar = localStorage.testStoreVar;
    }*/
  }
};
</script>

<style>
</style>