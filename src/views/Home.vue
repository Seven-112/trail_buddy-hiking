<template>
  <div>
    <HeaderNav :pageID="pageID" :pageTitle="pageTitle" :logged="logged" />
    <div>
      <h1>Trail Buddy</h1>
    </div>
    <div>
      <router-link to="/trail-finder" tag="button">
        <h2>Find a trail</h2>
      </router-link>
      <router-link to="/login" tag="button" v-if="logged===false">
        <h2>Login / Register</h2>
      </router-link>
      <router-link to="/private" tag="button" v-else>
        <h2>Private Area</h2>
      </router-link>
    </div>
  </div>
</template>


<script>
export default {
  name: "home",
  components: {},
  data() {
    return {
      pageID: "home",
      pageTitle: "Homepage"
    };
  },
  props: {
    logged: {
      type: Boolean
    }
  }
};
</script>

<style>
</style>