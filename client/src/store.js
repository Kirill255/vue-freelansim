import Vue from "vue";
import Vuex from "vuex";

import router from "./router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    loading: false,
    error: null
  },
  getters: {
    user(state) {
      return state.user;
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearUser(state) {
      state.user = null;
    },
    clearError(state) {
      state.error = null;
    }
  },
  actions: {
    register({ commit }, payload) {
      commit("clearError");
      commit("setLoading", true);
      setTimeout(() => {
        const token = Date.now().toString();
        localStorage.setItem("token", token);
        payload.token = token;
        commit("setUser", payload);
        commit("setLoading", false);
      }, 3000);
    },
    login({ commit }, payload) {
      commit("clearError");
      commit("setLoading", true);
      setTimeout(() => {
        const token = Date.now().toString();
        localStorage.setItem("token", token);
        payload.token = token;
        commit("setUser", payload);
        commit("setLoading", false);
      }, 3000);
    },
    logout({ commit }) {
      commit("clearUser");
      localStorage.setItem("token", "");
      router.push("/").catch((err) => {});
    }
  }
});
