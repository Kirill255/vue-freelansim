<template>
  <div id="app">
    <div class="container mx-auto px-4">
      <div
        class="flex justify-center"
        id="nav"
      >
        <router-link to="/">Home</router-link>
        <router-link
          :key="item.title"
          :to="item.link"
          v-for="item in navItems"
        >{{item.title}}</router-link>
        <button
          @click="handleLogout"
          type="button"
          v-if="user"
        >Logout</button>
      </div>

      <div class>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  methods: {
    handleLogout() {
      this.$store.dispatch("logout");
    }
  },
  computed: {
    ...mapGetters(["user"]),
    navItems() {
      if (this.user) {
        return [{ title: "Profile", link: "/profile" }];
      }
      return [
        { title: "Login", link: "/login" },
        { title: "Register", link: "/register" }
      ];
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 10px;
  a {
    display: block;
    padding: 20px 30px;
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
