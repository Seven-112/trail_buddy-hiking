<template>
  <div>
    <HeaderNav :pageID="pageID" :pageTitle="pageTitle" />
    <div>
      <h2>Choose a spot and a max. distance</h2>
      <div>
        <form action="#">
          Maximum distance:
          <input type="range" name="max-dist" min="20" max="200" v-model="maxDist" />
          {{milesToKm}} km
          <input type="submit" />
        </form>
      </div>
    </div>
    <div>
      <br />
      <strong class="to-fix">(here goes the map)</strong>
      <br />
    </div>
    <div>
      <br />
      <strong class="to-fix">(here go the results)</strong>
      <br />
    </div>
  </div>
</template>

<script>
import HeaderNav from "@/components/header_nav.vue";
export default {
  name: "TrailFinder",
  components: {
    HeaderNav
  },

  data() {
    return {
      pageID: "trail_finder",
      pageTitle: "Find a Trail",
      maxDist: 20
    };
  },

  props: {},

  computed: {
    milesToKm() {
      return (this.maxDist * 1.60934).toFixed(1);
    }
  }
};
</script>

<style>
.to-fix {
  color: red;
}
</style>