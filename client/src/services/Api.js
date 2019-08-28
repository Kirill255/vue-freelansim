import Vue from "vue";
import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3001" });

api.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    // console.log("config :", config);
    let token = Vue.cookie.get("token");
    // console.log("token :", token);
    if (token) {
      // api.defaults.headers.common["Authorization"] = `Bearer ${token}`; // try this

      // let headers = { Authorization: `Bearer ${token}` }; // or try this
      // config.headers = Object.assign({}, config.headers, headers);

      config.headers.Authorization = `Bearer ${token}`; // or try this
    }
    // console.log("config2 :", config);
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export { api };
