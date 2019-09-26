<template>
  <div>
    <div v-for="(singleResult, index) in resultsList" :key="index">
      <router-link :to="'/' + pageID + '/trail_info/' + singleResult.id">
        <div v-on:click="storeSingleResult(singleResult)">
          <ResultTile :singleResult="singleResult" :pageID="pageID" />
        </div>
      </router-link>
    </div>
    <!--<button v-on:click="showInfo">Show the name of stored item</button>
    <p>{{testDisplay}}</p>-->
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
    }
  },
  methods: {
    storeSingleResult(oneResult) {
      localStorage.storedResult = JSON.stringify(oneResult);
      //this.testDisplay = "orso";
    }
    /*showInfo() {
      this.testDisplay = JSON.parse(localStorage.storedResult);
    }*/
  }
};
</script>

<style>
</style>