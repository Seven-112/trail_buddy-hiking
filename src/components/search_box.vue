<template>
  <div class="my-3">
    <v-form>
      <div>
        <div class="d-flex align-center">
          <v-text-field
            label="Trail name"
            name="search-trail"
            id="search-trail"
            placeholder="e.g. Great Lake Trail"
            v-model="searchParams.inputTrail"
            v-on:keyup="changeInput"
            :disabled="this.$store.state.selectedItem.id"
          />

          <v-btn
            v-if="this.$store.state.selectedItem.id"
            small
            class="ml-2"
            v-on:click="resetSelectedItem"
          >Reset</v-btn>
        </div>

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
        <v-radio-group
          class="mt-0"
          row
          dense
          v-model="searchParams.inputDateType"
          v-on:change="changeInput"
        >
          <v-radio
            color="light-green darken-3"
            label="Set date"
            type="radio"
            name="search-date-type"
            value="date-type-set"
            id="date-type-set"
          />
          <v-radio
            color="light-green darken-3"
            label="Range"
            type="radio"
            name="search-date-type"
            value="date-type-range"
            id="date-type-range"
          />
          <v-radio
            color="light-green darken-3"
            label="Any"
            type="radio"
            name="search-date-type"
            value="date-type-any"
            id="date-type-any"
          />
        </v-radio-group>
      </div>

      <v-row>
        <div v-if="searchParams.inputDateType !== 'date-type-any'">
          <v-col cols="12" class="d-flex align-center">
            <p class="mb-0 mr-3 py-2" v-if="searchParams.inputDateType==='date-type-range'">Between</p>
            <v-menu dense>
              <template v-slot:activator="{ on }">
                <v-text-field
                  dense
                  label="Select date"
                  readonly
                  v-model="searchParams.inputDateStart"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="searchParams.inputDateStart" v-on:change="changeInput"></v-date-picker>
            </v-menu>
          </v-col>

          <v-col
            v-if="searchParams.inputDateType==='date-type-range'"
            cols="12"
            class="d-flex align-center my-0 py-0"
          >
            <p class="mb-0 mr-3 py-2">and</p>
            <v-menu>
              <template v-slot:activator="{ on }">
                <v-text-field
                  label="Select date"
                  readonly
                  v-model="searchParams.inputDateEnd"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="searchParams.inputDateEnd" v-on:change="changeInput"></v-date-picker>
            </v-menu>
          </v-col>
        </div>
      </v-row>
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
        inputTrailID: "",
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
    },

    resetSelectedItem() {
      this.$store.state.selectedItem = {};
      this.searchParams.inputTrail = "";
      this.$emit("itemReset");
    }
  },

  mounted() {
    if (this.$store.state.selectedItem) {
      this.searchParams.inputTrail = this.$store.state.selectedItem["name"];
      this.changeInput();
    }
  }
};
</script>

<style>
.v-input__control {
  height: 40px !important;
}
.v-input--is-readonly {
  padding: 0 !important;
  margin: 0 !important;
}
</style>