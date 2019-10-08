<template>
  <v-card ripple hover class="pa-2 my-2">
    <div class="d-flex justify-space-between">
      <div>
        <v-card-title class="subtitle-1 font-weight-bold pb-0">{{singleResult.name}}</v-card-title>
        <v-card-text class="py-0" v-if="pageID==='event_finder' || 'private'">{{displayEventDate}}</v-card-text>
        <v-card-text class="py-0" v-if="pageID==='trail_finder'">{{singleResult.location}}</v-card-text>
      </div>
      <div class="d-flex flex-column flex-shrink-0 justify-end">
        <div v-if="this.$route.params.detail === true || pageID==='trail_finder'">
          <v-icon>mdi-arm-flex</v-icon>
          {{difficultyCalculator}}
        </div>
        <div v-if="pageID==='trail_finder'">
          <v-icon>mdi-calendar-text</v-icon>
          <span class="to-fix">XX</span>
        </div>
        <div v-if="pageID==='event_finder' || 'private'">
          <v-icon>mdi-account-group</v-icon>
          {{displayParticipantsNumber}}
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "ResultTile",
  props: {
    singleResult: {
      type: Object
    },
    pageID: {
      type: String
    }
  },
  computed: {
    displayEventDate() {
      if (this.singleResult.dateRangeType === "date-type-any") {
        return "Open dates";
      } else {
        let outputString = this.singleResult.startDate;
        if (this.singleResult.dateRangeType === "date-type-range") {
          outputString += " / " + this.singleResult.endDate;
        }
        return outputString;
      }
    },

    displayParticipantsNumber() {
      return Object.values(this.singleResult.participantsList).length;
    },

    difficultyCalculator() {
      console.log("difficulty: " + this.singleResult.difficulty);
      switch (this.singleResult.difficulty) {
        case "dblack":
          return 6;
        case "black":
          return 5;
        case "blueBlack":
          return 4;
        case "blue":
          return 3;
        case "greenBlue":
          return 2;
        case "green":
          return 1;
        default:
          return "?";
      }
    } /*,

    numberOfParticipants() {
      //return this.listOfParticipants.length;
      return this.$store.getters.listOfParticipants.length;
    }*/
  }
};
</script>

<style>
.v-card__title {
  word-break: normal !important;
}
</style>