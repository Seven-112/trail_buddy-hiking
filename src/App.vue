<template>
  <v-app id="app">
    <v-content class="pt-4">
      <router-view />
    </v-content>
  </v-app>
</template>


<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.v-input__control {
  height: 30px;
}
</style>
