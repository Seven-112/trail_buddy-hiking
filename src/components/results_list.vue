<template>
  <div>
    <div v-for="(singleResult, index) in filterResultsList" :key="index">
      <div v-on:click="goToDetail(singleResult)" class="hoverable">
        <ResultTile :singleResult="singleResult" :pageID="pageID" />
      </div>
    </div>
    <div v-if="filterResultsList.length === 0">
      <p>No results found!</p>
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
      localStorage.storedResult = JSON.stringify(oneResult); //REMOVE WHEN AXIOS COMPLETE FOR EVENTS
      //localStorage.storedTrail = oneResult.id;
      if (oneResult.eventID) {
        localStorage.storedEvent = oneResult.eventID;
        this.$router.push("/" + this.pageID + "/detail/" + oneResult.eventId); //THIS WILL BE USED FOR EVENT FETCH
      } else {
        this.$router.push("/" + this.pageID + "/detail/" + oneResult.id);
      }
    }
  },

  computed: {
    filterResultsList() {
      if (this.pageID === "trail_finder") {
        return this.resultsList;
      }
      return this.resultsList.filter(x => {
        let nameCond = x["name"]
          .toLowerCase()
          .includes(this.searchParams.inputTrail.toLowerCase());
        let statusCond =
          x.status == this.searchParams.inputStatus ||
          this.searchParams.inputStatus === "status-any";

        let dateCond = true; //covers all cases where either input or event date is "any"

        //down here we set conditions for all other date type cases
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