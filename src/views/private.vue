<template>
  <div>
    <div>
      <HeaderNav :pageID="pageID" :pageTitle="pageTitle" />
    </div>
    <div>
      <div>
        <br />
        <strong class="to-fix">(here goes profile pic)</strong>
        <br />
      </div>
      <div>
        <h3 class="to-fix">Name Surname</h3>
        <p class="to-fix">(here goes self description)</p>
        <button class="to-fix">Edit profile</button>
        <button class="to-fix">Log out</button>
      </div>
      <div>
        <h3 class="to-fix">My Events</h3>
        <div>
          <p class="to-fix">(here goes user's event list)</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderNav from "@/components/header_nav.vue";
export default {
  name: "Private",
  components: {
    HeaderNav
  },

  data() {
    return {
      pageID: "private",
      pageTitle: "My own page"
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