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
          :class="{'border-red-500 mb-3': $v.username.$error}"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          placeholder="Username"
          type="text"
          v-model.trim="$v.username.$model"
        />
        <!-- validation -->
        <div v-if="$v.username.$error">
          <p
            class="text-red-500 text-xs italic"
            v-if="!$v.username.required"
          >Username is required</p>
          <p
            class="text-red-500 text-xs italic"
            v-if="!$v.username.minLength"
          >Username must have at least {{$v.username.$params.minLength.min}} letters.</p>
        </div>
      </div>
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
      <div class="mb-6">
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
      <div class="flex items-center justify-between">
        <button
          :disabled="loading"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >Register</button>
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
const { required, minLength, email } = require("vuelidate/lib/validators");
import Auth from "@/services/Auth";

export default {
  name: "Register",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      loading: false,
      message: "",
      error: null
    };
  },
  validations: {
    username: {
      required,
      minLength: minLength(4)
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  methods: {
    handleRegister() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.message = "";
        this.error = null;
        this.loading = true;

        Auth.registering({
          username: this.username,
          email: this.email,
          password: this.password
        })
          .then(res => {
            console.log("res ", res);
            this.message = res.data.message;
            setTimeout(() => {
              this.resetForm(); // method
              this.$router.push({ name: "login" }).catch(() => {});
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
      this.username = "";
      this.email = "";
      this.password = "";
      this.loading = false;
      this.message = "";
      this.error = null;
      this.$v.$reset();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
