<template>
  <div>
    <HeaderNav :pageID="pageID" :pageTitle="pageTitle" :logged="logged" />
  </div>
</template>


<script>
import HeaderNav from "@/components/header_nav.vue";
export default {
  name: "TrailInfo",

  components: {
    HeaderNav
  },

  data() {
    return {
      pageID: "trail_info",
      pageTitle: "Trail Information"
    };
  }
};
</script>

<style>
</style>