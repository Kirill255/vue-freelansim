<template>
  <div class="flex flex-col justify-center items-center">
    <form
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
          @click="handleLogin"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
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
    >Error</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  watch: {
    user(value) {
      if (value) {
        this.$router.push("/");
      }
    }
  },
  computed: {
    ...mapGetters(["user", "loading", "error"])
  },
  methods: {
    handleLogin() {
      this.$store.dispatch("login", {
        username: this.username,
        password: this.password
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
