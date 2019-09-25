<template>
  <div style="border: 1px solid black">
    <div>
      <div>
        <h3>{{singleResult.name}}</h3>
        <p class="to-fix" v-if="pageID==='trail_finder'">(optional: distance from spot)</p>
        <p class="to-fix" v-if="pageID===('event_finder' || 'private')">(date of the event)</p>
      </div>
      <div>
        <p>difficulty: {{singleResult.difficulty}}</p>
        <p class="to-fix" v-if="pageID==='trail_finder'">nr. of events: XX</p>
        <p class="to-fix" v-if="pageID===('event_finder' || 'private')">nr. of participants: XX</p>
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
  }
};
</script>

<style>
</style>