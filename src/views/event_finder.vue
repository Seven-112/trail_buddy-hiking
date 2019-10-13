<template>
  <div>
    <div>
      <HeaderNav :pageID="pageID" :pageTitle="pageTitle" />
    </div>
    <v-content>
      <v-container fluid class="pt-0">
        <v-row class="px-3">
          <v-col class="col-12 col-sm-6 py-0">
            <div>
              <SearchBox
                v-on:inputChanged="updateInput($event)"
                v-on:itemReset="pageReset"
                :key="componentKey"
              />
            </div>
            <div v-if="this.$store.state.selectedItem.id" class="my-3 d-flex justify-space-around">
              <span>Can't find a good event?</span>
              <v-btn
                small
                class="to-fix mx-2 px-1"
                color="light-green darken-3"
                dark
                v-on:click="createEvent(searchParams)"
              >Create it</v-btn>
            </div>
          </v-col>
          <v-col class="col-12 col-sm-6 pb-0 event-list-container">
            <ResultsList :resultsList="eventList" :pageID="pageID" :searchParams="searchParams" />
          </v-col>
        </v-row>
      </v-container>
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
      eventList: [],
      eventObject: {},
      componentKey: 0
    };
  },

  props: {},

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
        participantsList: {},
        name: this.$store.state.selectedItem["name"],
        id: this.$store.state.selectedItem.id,
        difficulty: this.$store.state.selectedItem.difficulty
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
        firebase //creates event
          .database()
          .ref("eventList/" + obj.eventID)
          .set(obj);

        firebase //adds creator to participants list
          .database()
          .ref(
            "eventList/" +
              obj.eventID +
              "/participantsList/" +
              firebase.auth().currentUser.uid
          )
          .set({
            name: firebase.auth().currentUser.displayName,
            photoURL: firebase.auth().currentUser.photoURL
          });

        alert("Event created!"); //Event sent to firebase!
      } else return;
    },

    pageReset() {
      this.componentKey += 1;
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

    firebase
      .database()
      .ref("eventList")
      .once("value", data => {
        this.eventObject = data.val();
        this.eventList = Object.values(data.val());
      });
  }
};
</script>

<style>
.event-list-container {
  height: 58vh;
  overflow: scroll;
}

@media screen and (orientation: landscape) {
  .event-list-container {
    height: 80vh;
  }
}
</style>