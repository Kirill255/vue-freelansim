import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    auth: false,
    token: null
  },
  getters: {
    auth(state) {
      return state.auth;
    },
    token(state) {
      return state.token;
    }
  },
  mutations: {
    changeAuth(state, payload) {
      state.auth = payload;
    },
    setToken(state, payload) {
      state.token = payload;
    },
    resetToken(state, payload) {
      state.token = null;
    }
  },
  actions: {
    setToken(store, payload) {
      // console.log("payload :", payload);
      store.commit("setToken", payload);
      store.commit("changeAuth", true);
    },
    resetToken(store) {
      store.commit("resetToken");
      store.commit("changeAuth", false);
    }
  }
});
