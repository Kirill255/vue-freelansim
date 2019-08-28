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
          :class="{'border-red-500 mb-3': $v.email.$error}"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          placeholder="Email"
          type="text"
          v-model.trim="$v.email.$model"
        />
        <!-- validation -->
        <div v-if="$v.email.$error">
          <p
            class="text-red-500 text-xs italic"
            v-if="!$v.email.required"
          >Email is required</p>
          <p
            class="text-red-500 text-xs italic"
            v-if="!$v.email.email"
          >Email must be valid email addresses.</p>
        </div>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
        >Password</label>
        <input
          :class="{'border-red-500 mb-3': $v.password.$error}"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          placeholder="******************"
          type="password"
          v-model.trim="$v.password.$model"
        />
        <!-- validation -->
        <div v-if="$v.password.$error">
          <p
            class="text-red-500 text-xs italic"
            v-if="!$v.password.required"
          >Password is required</p>
          <p
            class="text-red-500 text-xs italic"
            v-if="!$v.password.minLength"
          >Password must have at least {{$v.password.$params.minLength.min}} letters.</p>
        </div>
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
      class="text-center text-red-500 text-xs"
      v-if="error"
    >{{error}}</p>
    <p
      class="text-center text-gray-500 text-xs"
      v-if="message"
    >{{message}}</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
const { required, minLength, email } = require("vuelidate/lib/validators");
import Auth from "@/services/Auth";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      message: "",
      error: null,
      rememberme: false
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  watch: {
    rememberme: "setRememberMe"
  },
  methods: {
    ...mapActions(["setToken"]),
    handleLogin() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.message = "";
        this.error = null;
        this.loading = true;

        Auth.login({
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
              this.resetForm(); // method
              this.$router.push({ name: "profile" }).catch(() => {});
            }, 1000);
          })
          .catch(err => {
            this.loading = false;
            // console.log("err :", err.response);
            // console.dir(err);
            if (!err.response) {
              this.error = err.message;
            } else {
              this.error = err.response.data;
            }
            // this.error = err.response.data.errors;
          });
      }
    },
    resetForm() {
      this.email = "";
      this.password = "";
      this.loading = false;
      this.message = "";
      this.error = null;
      this.$v.$reset();
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
