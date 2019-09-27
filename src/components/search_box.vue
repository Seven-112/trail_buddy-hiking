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
          v-model="searchParams.inputTrail"
          v-on:keyup="changeInput"
        />
        <!--ADD v-on!!-->
      </div>
      <div>
        <label for="search-status">Status:</label>
        <select
          name="search-status"
          id="search-status"
          v-model="searchParams.inputStatus"
          v-on:change="changeInput"
        >
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
          v-model="searchParams.inputDateType"
          v-on:change="changeInput"
        />
        <label for="date-type-set">Set date</label>
        <input
          type="radio"
          name="search-date-type"
          value="date-type-range"
          id="date-type-range"
          v-model="searchParams.inputDateType"
          v-on:change="changeInput"
        />
        <label for="date-type-range">Range</label>
        <input
          type="radio"
          name="search-date-type"
          value="date-type-any"
          id="date-type-any"
          v-model="searchParams.inputDateType"
          v-on:change="changeInput"
        />
        <label for="date-type-any">Any</label>
      </div>
      <div v-if="searchParams.inputDateType !== 'date-type-any'">
        <label for="search-date-start">
          <span v-if="searchParams.inputDateType==='date-type-range'">Start Date:</span>
        </label>
        <input
          type="date"
          name="search-date-start"
          id="search-date-start"
          v-model="searchParams.inputDateStart"
          v-on:change="changeInput"
        />
        <label for="search-date-end">
          <span v-if="searchParams.inputDateType==='date-type-range'">End Date:</span>
        </label>
        <input
          v-if="searchParams.inputDateType==='date-type-range'"
          type="date"
          name="search-date-end"
          id="search-date-end"
          v-model="searchParams.inputDateEnd"
          v-on:change="changeInput"
        />
      </div>
      <div>
        <p>Entered dates</p>
        <p>Start date: {{inputDateStart}}</p>
        <p>End date: {{inputDateEnd}}</p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "SearchBox",

  data() {
    return {
      searchParams: {
        inputTrail: "",
        inputStatus: "status-any",
        inputDateType: "date-type-any",
        inputDateStart: "",
        inputDateEnd: ""
      }
    };
  },

  methods: {
    changeInput() {
      this.$emit("inputChanged", this.searchParams);
      //console.log("emitted value is:" + this.searchParams);
    }
  },

  created() {
    if (localStorage.storedResult) {
      this.inputTrail = JSON.parse(localStorage.storedResult)["name"];
    }
  }
};
</script>

<style>
</style>