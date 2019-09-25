<template>
  <div>
    <p>this is the login page</p>
    <router-link to="/" v-if="pageID !== 'home'" tag="button">Home</router-link>
  </div>
</template>

<script>
export default {
  name: "login"
};
</script>

<style>
</style>