<template>
  <div>
    <HeaderNav :pageID="pageID" :pageTitle="pageTitle" :logged="logged" />
    <ResultTile :singleResult="displayedItem" :pageID="pageID" />
  </div>
</template>

<script>
import HeaderNav from "@/components/header_nav.vue";
import ResultTile from "@/components/result_tile.vue";

export default {
  name: "EventInfo",

  components: {
    HeaderNav,
    ResultTile
  },

  data() {
    return {
      pageID: "event_finder",
      pageTitle: "Event Information",
      displayedItem: {}
    };
  },

  created() {
    this.displayedItem = JSON.parse(localStorage.storedResult);
  }
};
</script>

<style>
</style>