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
        <v-icon color="warning" class="mr-2">mdi-map-marker-alert</v-icon>Nothing found!
      </v-alert>
    </div>
  </div>
</template>

<script>
import ResultTile from "@/components/result_tile.vue";

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
      this.$store.state.selectedItem = oneResult;
      //following lines direct to either trail_info or event_info, with correct ID for fetch
      if (oneResult.eventID) {
        localStorage.storedEvent = oneResult.eventID;
        this.$router.push("/event_finder/detail/" + oneResult.eventId); //ID WILL BE USED FOR EVENT FETCH
      } else {
        this.$router.push("/trail_finder/detail/" + oneResult.id);
      }
    }
  },

  computed: {
    filterResultsList() {
      if (this.pageID === "trail_finder") {
        return this.resultsList;
      } //no filters are applied in trail_info

      return this.resultsList.filter(x => {
        let nameCond = x["name"]
          .toLowerCase()
          .includes(this.searchParams.inputTrail.toLowerCase());
        let statusCond =
          x.status == this.searchParams.inputStatus ||
          this.searchParams.inputStatus === "status-any";

        let dateCond = true; //covers all cases where either input or event date is "any"
        //down here we set conditions for all other date type cases
        //first we apply correct values for start and end dates to both ENTERED and EVENT dates
        //if it is not a range of dates, the start and end dates will be the same by default
        if (
          this.searchParams.inputDateType !== "date-type-any" &&
          x.dateRangeType !== "date-type-any" &&
          this.searchParams.inputDateStart //does not run if user has not yet entered 1st date
        ) {
          let enteredStartDate = new Date(this.searchParams.inputDateStart);
          let eventStartDate = new Date(x.startDate);
          let enteredEndDate = new Date(this.searchParams.inputDateStart); //avoids undefined values  for "set" ENTERED date
          let eventEndDate = new Date(x.startDate); //avoids undefined values  for "set" EVENT date
          if (
            this.searchParams.inputDateType === "date-type-range" &&
            this.searchParams.inputDateEnd //does not run if user has not yet entered 2nd date
          ) {
            enteredEndDate = new Date(this.searchParams.inputDateEnd); //sets end date for "range" ENTERED date
          }
          if (x.dateRangeType === "date-type-range") {
            eventEndDate = new Date(x.endDate); //sets end date for "range" EVENT date
          }
          let startingDateCond =
            eventStartDate <= enteredStartDate &&
            enteredStartDate <= eventEndDate;
          let endingDateCond =
            eventStartDate <= enteredEndDate &&
            enteredStartDate <= eventEndDate;
          dateCond = startingDateCond || endingDateCond;
          //condition is valid for both "set" and "range" types on both ENTERED and EVENT dates;
          // does not matter if enteredStartDate > enteredEndDate, algorithm works the same
        }

        return nameCond && statusCond && dateCond;
      });
    }
  }
};
</script>

<style>
</style>