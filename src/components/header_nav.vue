<template>
  <div>
    <!--<router-link v-if="$route.params.detail" :to="'/' + $route.params.detail + '_finder'">Back</router-link>-->
    <button v-if="$route.params.detail" v-on:click="goBack">Back</button>
    <h1>{{pageTitle}}</h1>
    <div>
      <!--v-if="!$route.params.detail"-->
      <button v-if="pageID !== 'home'" v-on:click="navigate('/')">Home</button>
      <button v-if="pageID !== 'trail_finder'" v-on:click="navigate('/trail_finder')">Trail Finder</button>
      <button v-if="pageID !== 'event_finder'" v-on:click="navigate('/event_finder')">Event Finder</button>
      <button
        v-if="pageID !== 'private' && logged === true"
        v-on:click="navigate('/private')"
      >Private Area</button>
      <button v-if="pageID !== 'private' && logged === false" v-on:click="navigate('/login')">Login</button>
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
  },

  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    navigate(path) {
      localStorage.storedResult = ""; //resets local storage
      this.$router.push(path);
    }
  }
};
</script>

<style>
</style>