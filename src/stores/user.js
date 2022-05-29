import { defineStore } from "pinia";
import { authServices } from "src/boot/firebase";
import { api } from "src/boot/axios";
import { Cookies, date } from "quasar";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {},
    currentScore: 30,
  }),
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    async fetchLoggedInUser() {
      try {
        //check if user is logged in
        const user = await authServices.getCurrentUser();
        // console.log("user", user);
        if (!user) {
          //remove cookies if not found locally
          Cookies.remove("token");
          Cookies.remove("refreshToken");
        }
        //if logged in then get extra info from server
        const response = await api.get("/users/" + user.uid);
        const { data } = response;
        //user not found on server
        if (!data) {
          this.user = {};
          return;
        }
        //user found on server
        const { fullname, email, photo_url, google_uid, roll, started_on } =
          data;
        this.user = {
          fullname,
          email,
          roll,
          photoURL: photo_url,
          googleUID: google_uid,
          startedOn: started_on,
        };
        Cookies.set("token", user.accessToken);
        Cookies.set("refreshToken", user.stsTokenManager.refreshToken);

        return this.user;
      } catch (err) {
        console.log(err);
        return "error";
      }
    },
    async logout() {
      try {
        authServices.logout();
        await api.post("users/logout");
        localStorage.clear();
        Cookies.remove("token");
        Cookies.remove("refreshToken");
        return (this.user = {});
      } catch (err) {
        console.log(err);
      }
    },
  },
});
