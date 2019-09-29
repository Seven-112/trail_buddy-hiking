<template>
  <div style="border: 1px solid black">
    <div>
      <div>
        <h3>{{singleResult.name}}</h3>
        <p class="to-fix" v-if="pageID==='trail_finder'">(optional: distance from spot)</p>
        <p v-if="pageID===('event_finder' || 'private')">{{displayEventDate}}</p>
      </div>
      <div>
        <p>difficulty: {{singleResult.difficulty}}</p>
        <p class="to-fix" v-if="pageID==='trail_finder'">nr. of events: XX</p>
        <p
          v-if="pageID===('event_finder' || 'private')"
        >nr. of participants: {{displayParticipantsNumber}}</p>
      </div>
    </div>
  </div>
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
      return this.singleResult.participantsList.length;
    }
  }
};
</script>

<style>
</style>