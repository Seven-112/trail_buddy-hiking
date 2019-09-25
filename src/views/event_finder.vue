<template>
  <div>
    <HeaderNav :pageID="pageID" :pageTitle="pageTitle" />
  </div>
</template>

<script>
import HeaderNav from "@/components/header_nav.vue";
export default {
  name: "EventFinder",
  components: {
    HeaderNav
  },

  data() {
    return {
      pageID: "event_finder",
      pageTitle: "Find an Event"
    };
  }
};
</script>

<style>
</style>