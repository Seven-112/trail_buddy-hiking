<template>
  <v-app-bar app fixed dark class="light-green darken-3">
    <button v-if="$route.params.detail" v-on:click="goBack">Back</button>
    <h1 class="title">{{pageTitle}}</h1>
    <div class="flex-grow-1"></div>
    <div>
      <!--v-if="!$route.params.detail"-->
      <v-btn class="flex-shrink-1" icon v-if="pageID !== 'home'" v-on:click="navigate('/')">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn
        class="flex-shrink-1"
        icon
        v-if="pageID !== 'trail_finder'"
        v-on:click="navigate('/trail_finder')"
      >
        <v-icon>mdi-map</v-icon>
      </v-btn>
      <v-btn
        class="flex-shrink-1"
        icon
        v-if="pageID !== 'event_finder'"
        v-on:click="navigate('/event_finder')"
      >
        <v-icon>mdi-calendar-month</v-icon>
      </v-btn>
      <v-btn
        class="flex-shrink-1"
        icon
        v-if="pageID !== 'private' && logged === true"
        v-on:click="navigate('/private')"
      >
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
      <v-btn
        class="flex-shrink-1"
        icon
        v-if="pageID !== 'private' && logged === false"
        v-on:click="navigate('/login')"
      >
        <v-icon>mdi-account-arrow-left</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
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