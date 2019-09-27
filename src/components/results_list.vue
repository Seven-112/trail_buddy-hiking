<template>
  <div>
    <div v-for="(singleResult, index) in filterResultsList" :key="index">
      <div v-on:click="goToDetail(singleResult)" class="hoverable">
        <ResultTile :singleResult="singleResult" :pageID="pageID" />
      </div>
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
    /*storeSingleResult(oneResult) {
      localStorage.storedResult = JSON.stringify(oneResult);
    }*/
    goToDetail(oneResult) {
      console.log("gotodetail called");
      console.log("this.pageID= " + this.pageID);
      localStorage.storedResult = JSON.stringify(oneResult);
      this.$router.push("/" + this.pageID + "/detail/" + oneResult.id);
    }
  },

  computed: {
    filterResultsList() {
      return this.resultsList.filter(
        x =>
          x["name"].toLowerCase().includes(this.searchParams.inputTrail) &&
          (x.status == this.searchParams.inputStatus ||
            this.searchParams.inputStatus === "status-any")
      );

      //
      /*return this.bookList.filter(
        x =>
          x.title.toLowerCase().includes(this.searchInput) ||
          x.description.toLowerCase().includes(this.searchInput)*/
    }
  }
};
</script>

<style>
</style>