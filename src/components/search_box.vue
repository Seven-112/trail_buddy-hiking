<template>
  <div>
    <form action="#">
      <div>
        <label for="search-trail">Trail:</label>
        <input
          type="text"
          name="search-trail"
          id="search-trail"
          placeholder="e.g. Great Lake Trail"
          v-model="inputTrail"
        />
        <!--ADD v-on!!-->
      </div>
      <div>
        <label for="search-status">Status:</label>
        <select name="search-status" id="search-status" v-model="inputStatus">
          <option value="status-any">Any</option>
          <option value="status-proposed">Proposed</option>
          <option value="status-decided">Decided</option>
        </select>
      </div>
      <div>
        <legend>Date(s):</legend>
        <input
          type="radio"
          name="search-date-type"
          value="date-type-set"
          id="date-type-set"
          v-model="inputDateType"
        />
        <label for="date-type-set">Set date</label>
        <input
          type="radio"
          name="search-date-type"
          value="date-type-range"
          id="date-type-range"
          v-model="inputDateType"
        />
        <label for="date-type-range">Range</label>
        <input
          type="radio"
          name="search-date-type"
          value="date-type-any"
          id="date-type-any"
          v-model="inputDateType"
        />
        <label for="date-type-any">Any</label>
      </div>
      <div v-if="inputDateType !== 'date-type-any'">
        <label for="search-date-start">
          <span v-if="inputDateType==='date-type-range'">Start Date:</span>
        </label>
        <input type="date" name="search-date-start" id="search-date-start" v-model="inputDateStart" />
        <label for="search-date-end">
          <span v-if="inputDateType==='date-type-range'">End Date:</span>
        </label>
        <input
          v-if="inputDateType==='date-type-range'"
          type="date"
          name="search-date-end"
          id="search-date-end"
          v-model="inputDateEnd"
        />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "SearchBox",

  data() {
    return {
      //pageID: "event_finder",
      //pageTitle: "Find an Event",
      inputTrail: "",
      inputStatus: "status-any",
      inputDateType: "date-type-any",
      inputDateStart: "",
      inputDateEnd: ""
    };
  }
};
</script>

<style>
</style>