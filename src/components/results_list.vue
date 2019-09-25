<template>
  <div>
    <div v-for="(singleResult, index) in resultsList" :key="index">
      <router-link to="/trail-info">
        <ResultTile :singleResult="singleResult" :pageID="pageID" />
      </router-link>
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
  props: {
    resultsList: {
      type: Array
    },
    pageID: {
      type: String
    }
  }
};
</script>

<style>
</style>