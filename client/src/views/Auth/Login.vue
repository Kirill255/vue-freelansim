<template>
  <div class="flex flex-col justify-center items-center">
    <form
      @submit.prevent="handleLogin"
      autocomplete="off"
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="email"
        >Email</label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          placeholder="Email"
          type="text"
          v-model="email"
        />
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
        >Password</label>
        <input
          class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          placeholder="******************"
          type="password"
          v-model="password"
        />
        <p class="text-red-500 text-xs italic">Please choose a password.</p>
      </div>
      <div class="mb-6">
        <label class="md:w-2/3 block text-gray-500 font-bold">
          <input
            class="mr-2 leading-tight"
            type="checkbox"
            v-model="rememberme"
          />
          <span class="text-sm">Remember me!</span>
        </label>
      </div>
      <div class="flex items-center justify-between">
        <button
          :disabled="loading"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >Login</button>
        <a
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="#"
        >Forgot Password?</a>
      </div>
    </form>
    <p
      class="text-center text-gray-500 text-xs"
      v-if="error"
    >{{error}}</p>
    <p
      class="text-center text-gray-500 text-xs"
      v-if="message"
    >{{message}}</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Auth from "@/services/Auth";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      message: "",
      error: null,
      rememberme: false
    };
  },
  watch: {
    rememberme: "setRememberMe"
  },
  computed: {
    ...mapGetters(["loading"])
  },
  methods: {
    ...mapActions(["setToken"]),
    async handleLogin() {
      await Auth.login({
        email: this.email,
        password: this.password
      })
        .then(res => {
          console.log("res ", res);
          this.message = res.data.message;
          // this.user = res.data.email;
          // this.token = res.data.token;
          let token = res.data.token;
          this.setToken(token); // action
          this.$cookie.set("token", token);
          setTimeout(() => {
            this.email = "";
            this.password = "";
            this.message = "";
            this.error = null;
            this.$router.push({ name: "profile" }).catch(() => {});
          }, 1000);
        })
        .catch(err => {
          // console.log("err :", err);
          console.log("err :", err.response);
          // this.errors = err.response.data.errors;
          this.error = err.response.data;
          // this.error = err.message;
        });
    },
    setRememberMe() {
      console.log(this.rememberme);
      if (this.rememberme) {
        let value = JSON.stringify(this.rememberme);
        localStorage.setItem("rememberme", value);
      } else {
        localStorage.removeItem("rememberme");
      }
      return;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
