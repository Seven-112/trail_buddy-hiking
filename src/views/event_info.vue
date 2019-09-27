<template>
  <div>
    <HeaderNav :pageID="pageID" :pageTitle="pageTitle" :logged="logged" />
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
      pageID: "event_info",
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