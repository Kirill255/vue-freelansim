<template>
  <div class="profile">
    <h1>This is an Profile page</h1>
    <h3>User:</h3>
    <p if="user">{{user}}</p>
  </div>
</template>

<script>
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
    async getMe() {
      await Auth.getMe()
        .then(res => {
          console.log("res ", res);
          this.user = res.data.user;
        })
        .catch(err => {
          console.log("err :", err);
          // this.errors = err.response.data.errors;
          // this.error = err.message;
        });
    }
  }
};
</script>

<style scoped lang="scss">
</style>
