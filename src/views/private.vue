<template>
  <div>
    <HeaderNav :pageID="pageID" :pageTitle="pageTitle" />
  </div>
</template>

<script>
import HeaderNav from "@/components/header_nav.vue";
export default {
  name: "Private",
  components: {
    HeaderNav
  },

  data() {
    return {
      pageID: "private",
      pageTitle: "Private Area"
    };
  }
};
</script>

<style>
</style>