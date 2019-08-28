<template>
  <div class="flex flex-col justify-center items-center">
    <form
      @submit.prevent="handleRegister"
      autocomplete="off"
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >Username</label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          placeholder="Username"
          type="text"
          v-model="username"
        />
      </div>
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
      <div class="mb-6">
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
      <div class="flex items-center justify-between">
        <button
          :disabled="loading"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >Register</button>
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
import { mapGetters } from "vuex";
import Auth from "@/services/Auth";

export default {
  name: "Register",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      message: "",
      error: null
    };
  },
  computed: {
    ...mapGetters(["loading"])
  },
  methods: {
    async handleRegister() {
      await Auth.registering({
        username: this.username,
        email: this.email,
        password: this.password
      })
        .then(res => {
          console.log("res ", res);
          this.message = res.data.message;
          setTimeout(() => {
            this.username = "";
            this.email = "";
            this.password = "";
            this.message = "";
            this.error = null;
            this.$router.push({ name: "login" }).catch(() => {});
          }, 1000);
        })
        .catch(err => {
          console.log("err :", err.response);
          this.error = err.response.data;
          // this.error = err.response.data.errors;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
