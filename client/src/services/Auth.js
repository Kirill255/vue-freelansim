import { api } from "@/services/Api";

export default {
  registering(data) {
    return api.post("api/account/register", data);
  },

  login(data) {
    return api.post("api/account/login", data);
  },

  logout() {
    return api.get("api/account/logout");
  },

  getMe() {
    return api.get("api/account/me");
  }
};
