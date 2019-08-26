<template>
  <div class="profile">
    <h1>This is an Profile page</h1>
    <h3>User:</h3>
    <p>Hello {{user.username}}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Profile",
  computed: {
    ...mapGetters(["user"])
  }
};
</script>

<style scoped lang="scss">
</style>
