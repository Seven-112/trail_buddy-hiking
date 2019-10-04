<template>
  <div>
    <p class="to-fix">this is the page to login or register</p>
    <router-link to="/" v-if="pageID !== 'home'" tag="button">Home</router-link>
  </div>
</template>

<script>
export default {
  name: "login",

  props: {
    logged: {
      type: Boolean
    }
  }
};
</script>

<style>
</style>