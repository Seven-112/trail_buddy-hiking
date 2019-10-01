<template>
  <div>
    <v-form>
      <div>
        <v-text-field
          label="Trail name"
          name="search-trail"
          id="search-trail"
          placeholder="e.g. Great Lake Trail"
          v-model="searchParams.inputTrail"
          v-on:keyup="changeInput"
        />

        <!--<label for="search-status">Status:</label>-->
        <v-select
          label="Status"
          :items="statusOptions"
          item-text="text"
          item-value="value"
          name="search-status"
          id="search-status"
          v-model="searchParams.inputStatus"
          v-on:change="changeInput"
        >
          <v-item value="status-any">Any</v-item>
          <option value="status-proposed">Proposed</option>
          <option value="status-decided">Decided</option>
        </v-select>
      </div>
      <div>
        <p class="caption mb-0 grey--text text--darken-2">Select dates</p>
        <v-radio-group class="mt-0" row v-model="searchParams.inputDateType">
          <v-radio
            color="light-green darken-3"
            label="Set date"
            type="radio"
            name="search-date-type"
            value="date-type-set"
            id="date-type-set"
            v-on:change="changeInput"
          />
          <v-radio
            color="light-green darken-3"
            label="Range"
            type="radio"
            name="search-date-type"
            value="date-type-range"
            id="date-type-range"
            v-on:change="changeInput"
          />
          <v-radio
            color="light-green darken-3"
            label="Any"
            type="radio"
            name="search-date-type"
            value="date-type-any"
            id="date-type-any"
            v-on:change="changeInput"
          />
        </v-radio-group>
      </div>
      <div v-if="searchParams.inputDateType !== 'date-type-any'">
        <label for="search-date-start">
          <span v-if="searchParams.inputDateType==='date-type-range'">Between</span>
        </label>
        <input
          type="date"
          name="search-date-start"
          id="search-date-start"
          v-model="searchParams.inputDateStart"
          v-on:change="changeInput"
        />
        <label for="search-date-end">
          <span v-if="searchParams.inputDateType==='date-type-range'">and</span>
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
    </v-form>
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
      },
      statusOptions: [
        {
          text: "Any",
          value: "status-any"
        },
        {
          text: "Proposed",
          value: "status-proposed"
        },
        {
          text: "Decided",
          value: "status-decided"
        }
      ]
    };
  },

  methods: {
    changeInput() {
      this.$emit("inputChanged", this.searchParams);
      //console.log("emitted value is:" + this.searchParams);
    }
  },

  mounted() {
    if (localStorage.storedResult) {
      console.log("in local storage: " + localStorage.storedResult);
      this.searchParams.inputTrail = JSON.parse(localStorage.storedResult)[
        "name"
      ];
      this.changeInput();
    }
  }
};
</script>

<style>
</style>