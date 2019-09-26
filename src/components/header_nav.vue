<template>
  <div>
    <!--<router-link to="/trail_finder" v-if="pageID === 'trail_info'">Back</router-link>
    <router-link to="/event_finder" v-if="pageID === 'event_info'">Back</router-link>-->
    <router-link v-if="$route.params.finder" :to="'/' + $route.params.finder">Back</router-link>
    <!--<p v-if="pageID !== ('trail_info' || 'event_info')" class="to-fix">(no back btn!)</p>-->

    <h1>{{pageTitle}}</h1>

    <div>
      <router-link to="/" v-if="pageID !== 'home'" tag="button">Home</router-link>
      <router-link to="/trail_finder" v-if="pageID !== 'trail_finder'" tag="button">Trail Finder</router-link>
      <router-link to="/event_finder" v-if="pageID !== 'event_finder'" tag="button">Event finder</router-link>
      <router-link to="/private" v-if="pageID !== 'private' && logged ===true" tag="button">Private</router-link>
      <router-link to="/login" v-if="pageID !== 'private' && logged ===false" tag="button">Log in</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderNav",
  props: {
    pageID: {
      type: String
    },
    pageTitle: {
      type: String
    },
    logged: {
      type: Boolean
    }
  },
  data() {
    return {};
  }
};
</script>

<style>
</style>