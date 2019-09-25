<template>
  <div>
    <div>
      <HeaderNav :pageID="pageID" :pageTitle="pageTitle" :logged="logged" />
    </div>
    <div>
      <SearchBox />
    </div>
    <div>
      <span>Can't find an event like this?</span>
      <button class="to-fix">Create it</button>
    </div>
    <div>
      <h2>Events found</h2>
    </div>
    <div>
      <br />
      <strong class="to-fix">(here go the results)</strong>
      <br />
      <ResultsList :resultsList="eventList" :pageID="pageID" />
    </div>
  </div>
</template>

<script>
import HeaderNav from "@/components/header_nav.vue";
import SearchBox from "@/components/search_box.vue";
import ResultsList from "@/components/results_list.vue";

export default {
  name: "EventFinder",
  components: {
    HeaderNav,
    SearchBox,
    ResultsList
  },

  data() {
    return {
      pageID: "event_finder",
      pageTitle: "Find/Create an Event",
      eventList: [
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
      /*inputTrail: "",
      inputStatus: "status-any",
      inputDateType: "date-type-any",
      inputDateStart: "",
      inputDateEnd: ""*/
    };
  },

  props: {
    logged: {
      type: Boolean
    }
  }
};
</script>

<style>
</style>