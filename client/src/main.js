import Vue from "vue";
import VueCookie from "vue-cookie";
import Vuelidate from "vuelidate";

Vue.use(VueCookie);
Vue.use(Vuelidate);

import App from "./App.vue";

import { router } from "./router";
import { store } from "./store";

Vue.config.productionTip = false;

const checkAuthentication = (store) => {
  const token = Vue.cookie.get("token");
  if (token) {
    store.dispatch("setToken", token);
  }
};

if (localStorage.getItem("rememberme")) {
  checkAuthentication(store);
} else {
  Vue.cookie.delete("token");
}

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
