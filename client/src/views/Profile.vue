<template>
  <div class="profile">
    <h1>This is an Profile page</h1>
    <h3>User:</h3>
    <p if="user">{{user}}</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Auth from "@/services/Auth";

export default {
  name: "Profile",
  data() {
    return {
      user: null
    };
  },
  created() {
    this.getMe();
  },
  methods: {
    ...mapActions(["resetToken"]),
    async getMe() {
      await Auth.getMe()
        .then(res => {
          console.log("res ", res);
          this.user = res.data.user;
        })
        .catch(err => {
          console.log("err :", err);
          // console.log(err.response.status);
          // console.log(err.response.statusText);
          // console.log(err.response.data);
          // this.$router.replace({ name: "login" });
          // this.errors = err.response.data.errors;
          // this.error = err.message;
          this.$cookie.delete("token");
          localStorage.removeItem("rememberme");
          this.resetToken(); // action
          this.$router.push({ name: "home" }).catch(() => {});
        });
    }
  }
};
</script>

<style scoped lang="scss">
</style>
