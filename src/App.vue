<template>
  <v-app id="app">
    <!--<div id="nav">
      <router-link to="/">Home |</router-link>
      <router-link to="/trail_finder">TrailF |</router-link>
      <router-link to="/event_finder">EventF |</router-link>
      <router-link to="/private">Private |</router-link>
      <router-link to="/chatlogin">Chat</router-link>
    </div>-->
    <router-view :logged="logged" />
  </v-app>
</template>


<script>
export default {
  data() {
    return {
      logged: true //SET TO FALSE AT THE END
    };
  }
};
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

/* REMOVE AT THE END */
.to-fix {
  color: red;
}

.hoverable:hover {
  cursor: pointer;
  color: darkslategrey;
}
.v-input__control {
  height: 30px;
}
</style>
