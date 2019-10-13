<template>
  <div>
    <div v-for="(singleResult, index) in filterResultsList" :key="index">
      <div v-on:click="goToDetail(singleResult)">
        <ResultTile :singleResult="singleResult" :pageID="pageID" />
      </div>
    </div>
    <div v-if="filterResultsList.length === 0">
      <v-alert
        dark
        dense
        class="text-center"
        elevation="5"
        border="left"
        color-border
        color="warning"
        text
      >
        <v-icon color="warning" class="mr-2">mdi-map-marker-alert</v-icon>Nothing to show!
      </v-alert>
    </div>
  </div>
</template>

<script>
import ResultTile from "@/components/result_tile.vue";
import firebase from "firebase";

export default {
  name: "ResultsList",
  components: {
    ResultTile
  },

  data() {
    return {
      testDisplay: ""
    };
  },

  props: {
    resultsList: {
      type: Array
    },
    pageID: {
      type: String
    },
    searchParams: {
      type: Object
    }
  },

  methods: {
    goToDetail(oneResult) {
      this.$store.dispatch("changeSelectedItem", oneResult);

      if (this.pageID === "trail_finder") {
        this.$store.dispatch("storeTrailSearch", this.resultsList);
      }

      //following lines direct to either trail_info or event_info, with correct ID for fetch
      if (oneResult.eventID) {
        this.$router.push("/event_finder/detail/" + oneResult.eventID); //ID WILL BE USED FOR EVENT FETCH
      } else {
        this.$router.push("/trail_finder/detail/" + oneResult.id); //ID WILL BE USED FOR TRAIL FETCH
      }
    }
  },

  computed: {
    filterResultsList() {
      if (this.pageID === "trail_finder") {
        return this.resultsList;
      } //no filters are needed in trail_info

      if (this.pageID === "private") {
        return this.resultsList.filter(x => {
          let participantIDs = Object.keys(x.participantsList);
          return participantIDs.some(function(y) {
            return y === firebase.auth().currentUser.uid;
          });
        });
      }

      return this.resultsList.filter(x => {
        let nameCond = true;
        if (this.searchParams.inputTrail) {
          nameCond = x["name"]
            .toLowerCase()
            .includes(this.searchParams.inputTrail.toLowerCase());
        }
        let statusCond =
          x.status == this.searchParams.inputStatus ||
          this.searchParams.inputStatus === "status-any";

        let dateCond = true; //covers all cases where either input or event date type is "any"
        //if *neither* is "any", in the "if" block down here we set necessary conditions
        //first we apply values for start and end dates to both ENTERED and EVENT dates
        //note: if date type is "set", the start and end dates will be equal
        if (
          this.searchParams.inputDateType !== "date-type-any" &&
          x.dateRangeType !== "date-type-any" &&
          this.searchParams.inputDateStart //does not run if user has not yet entered 1st date
        ) {
          let enteredStartDate = new Date(this.searchParams.inputDateStart);
          let eventStartDate = new Date(x.startDate);
          let enteredEndDate = new Date(this.searchParams.inputDateStart); //avoids undefined values  for "set" ENTERED date
          let eventEndDate = new Date(x.startDate); //avoids undefined values  for "set" EVENT date

          //we set end date if ENTERED date is "range" type
          if (
            this.searchParams.inputDateType === "date-type-range" &&
            this.searchParams.inputDateEnd //does not run if user has not yet entered 2nd date
          ) {
            enteredEndDate = new Date(this.searchParams.inputDateEnd);
          }

          //we set end date if EVENT date is "range" type
          if (x.dateRangeType === "date-type-range") {
            eventEndDate = new Date(x.endDate);
          }

          // here we swap ENTERED dates if starting date is later than end date
          if (enteredStartDate > enteredEndDate) {
            let temp = new Date();
            temp = enteredStartDate;
            enteredStartDate = enteredEndDate;
            enteredEndDate = temp;
          }

          //here we set the conditions
          let matchingDates1 =
            enteredStartDate <= eventStartDate &&
            enteredEndDate >= eventStartDate;
          let matchingDates2 =
            enteredStartDate >= eventStartDate &&
            enteredStartDate <= eventEndDate;
          dateCond = matchingDates1 || matchingDates2;
        }

        return nameCond && statusCond && dateCond;
      });
    }
  }
};
</script>

<style>
</style>