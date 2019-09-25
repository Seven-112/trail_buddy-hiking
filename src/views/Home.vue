<template>
  <div>
    <HeaderNav :pageID="pageID" :pageTitle="pageTitle" :logged="logged" />
    <div>
      <h1>Trail Buddy</h1>
      <p>testvar is: {{testvar}}</p>
    </div>
    <div>
      <router-link to="/trail-finder" tag="button">
        <h2>Find a trail</h2>
      </router-link>
      <router-link to="/login" tag="button">
        <h2>Login / Register</h2>
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
      //logged: "false"
    };
  }
};
</script>
