<template>
  <div>
    <div>
      <HeaderNav :pageID="pageID" :pageTitle="pageTitle" />
    </div>
    <v-content>
      <div class="pa-3">
        <div>
          <SearchBox v-on:inputChanged="updateInput($event)" />
        </div>
        <div v-if="this.$store.state.selectedItem.id" class="my-3">
          <span>Can't find an event like this?</span>
          <v-btn
            small
            class="to-fix mx-2"
            color="light-green darken-3"
            dark
            v-on:click="createEvent(searchParams)"
          >Create it</v-btn>
        </div>
        <div class="my-5">
          <ResultsList :resultsList="eventList" :pageID="pageID" :searchParams="searchParams" />
          <!-- NEED AXIOS FOR eventList!! -->
        </div>
      </div>
    </v-content>
  </div>
</template>

<script>
import HeaderNav from "@/components/header_nav.vue";
import SearchBox from "@/components/search_box.vue";
import ResultsList from "@/components/results_list.vue";
import firebase from "firebase";

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
      searchParams: {
        inputTrail: "",
        inputTrailID: "",
        inputStatus: "status-any",
        inputDateType: "date-type-any",
        inputDateStart: "",
        inputDateEnd: ""
      },
      eventList: [
        {
          eventID: 12345,
          creatorID: 5551,
          status: "status-decided",
          dateRangeType: "date-type-set",
          startDate: "2019-10-10",
          endDate: "2019-10-10",
          participantsList: [
            { memberID: 3333 },
            { memberID: 1111 },
            { memberID: 6666 }
          ],
          //here start normal trail data
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
          eventID: 23456,
          creatorID: 5551,
          status: "status-proposed",
          dateRangeType: "date-type-any",
          startDate: "",
          endDate: "",
          participantsList: [{ memberID: 2222 }],
          //here start normal trail data
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
        },
        {
          eventID: 34567,
          creatorID: 6662,
          status: "status-proposed",
          dateRangeType: "date-type-range",
          startDate: "2019-09-25",
          endDate: "2020-01-05",
          participantsList: [
            { memberID: 3333 },
            { memberID: 2222 },
            { memberID: 7777 },
            { memberID: 8888 }
          ],
          //here start normal trail data
          id: 1234567,
          name: "Mount Doom",
          type: "Featured Hike",
          summary:
            "Perfect to give your beloved the One Ring and push him/her down",
          difficulty: "black",
          stars: 4.9,
          starVotes: 8,
          location: "Mordor, Middle Earth",
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
          length: 554.6,
          ascent: 6666,
          descent: 0,
          high: 6667,
          low: 0,
          longitude: 18.277,
          latitude: 48.9553,
          conditionStatus: "Dangerous",
          conditionDetails: "Nazgul infestation currently ongoing. Take care",
          conditionDate: "2019-09-27 12:22:05"
        }
      ]
    };
  },

  props: {
    /*logged: {
      type: Boolean
    }*/
  },

  methods: {
    updateInput(receivedInput) {
      this.searchParams.inputTrail = receivedInput.inputTrail;
      this.searchParams.inputStatus = receivedInput.inputStatus;
      this.searchParams.inputDateType = receivedInput.inputDateType;
      this.searchParams.inputDateStart = receivedInput.inputDateStart;
      this.searchParams.inputDateEnd = receivedInput.inputDateEnd;
    },
    createEvent(eventParams) {
      //first, check that parameters make sense
      if (this.logged === false) {
        alert("You need to log in to create an event!");
        return;
      }
      let statusIsAny = eventParams.inputStatus === "status-any";
      let statusIsDecided = eventParams.inputStatus === "status-decided";
      let dateTypeIsSet = eventParams.inputDateType === "date-type-set";
      let dateTypeIsRange = eventParams.inputDateType === "date-type-range";
      if (statusIsAny) {
        alert("Please set the status as 'Proposed' or 'Decided'");
        return;
      } else if (statusIsDecided && !dateTypeIsSet) {
        alert(
          "If you want to set the event as 'Decided', please define a set date"
        );
        return;
      } else if (
        (!eventParams.inputDateStart && (dateTypeIsSet || dateTypeIsRange)) ||
        (!eventParams.inputDateEnd && dateTypeIsRange)
      ) {
        alert("Please define all required date(s)");
        return;
      } else if (!eventParams.inputTrail) {
        alert("Please enter the name of the trail");
        return;
      }
      console.log("checks ok, proceeding to event creation...");
      console.log("selected item is:");
      console.log(this.$store.state.selectedItem.name);
      //here we set up the event for creation
      let now = new Date();
      let uniqueID = firebase.auth().currentUser.uid.toString() + now.getTime();
      let obj = {
        eventID: uniqueID,
        creatorName: firebase.auth().currentUser.displayName,
        creatorID: firebase.auth().currentUser.uid,
        status: this.searchParams.inputStatus,
        dateRangeType: this.searchParams.inputDateType,
        startDate: this.searchParams.inputDateStart,
        endDate: this.searchParams.inputDateEnd,
        participantsList: [
          {
            name: firebase.auth().currentUser.displayName,
            ID: firebase.auth().currentUser.uid,
            photoURL: firebase.auth().currentUser.photoURL
          }
        ],
        name: this.$store.state.selectedItem["name"],
        id: this.$store.state.selectedItem.id
      };
      // here we swap dates if starting date is later than end date
      if (
        obj.dateRangeType === "date-type-range" &&
        obj.startDate > obj.endDate
      ) {
        let temp = new Date();
        temp = obj.startDate;
        obj.startDate = obj.endDate;
        obj.endDate = temp;
      }

      //popup for user confirmation
      let dateText = "";
      if (obj.dateRangeType === "date-type-any") {
        dateText = "any";
      } else {
        dateText = obj.startDate;
        if (
          obj.dateRangeType === "date-type-range" &&
          obj.startDate !== obj.endDate
        ) {
          dateText += " - " + obj.endDate;
        }
      }

      let confirmText =
        "Create this event?\nPlace: " +
        obj.name +
        "\nStatus: " +
        obj.status.slice(7) +
        "\nDate(s): " +
        dateText;

      if (window.confirm(confirmText)) {
        firebase
          .database()
          .ref("eventList")
          .push(obj);
        alert("Event created!"); //Event sent to firebase!
      } else return;
    }
  },

  computed: {
    logged() {
      return this.$store.state.logged;
    },
    pageTitle() {
      if (this.$store.state.selectedItem.id) {
        return "Find/Create events";
      } else return "Browse events";
    }
  },

  created() {
    if (this.$store.state.selectedItem.id) {
      this.pageTitle = "Find/Create events";
    }

    console.log("selected item is:");
    console.log(this.$store.state.selectedItem.name);

    firebase
      .database()
      .ref("eventList")
      .once("value", data => {
        this.eventList = Object.values(data.val());
        console.log("eventList is:");
        console.log(this.eventList);
      });
  }
};
</script>

<style>
</style>