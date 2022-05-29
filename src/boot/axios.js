import { boot } from "quasar/wrappers";
import axios from "axios";
import { Cookies } from "quasar";
import { getAuth } from "firebase/auth";

// const baseURL = "https://compiler.panipuri.tech"
let api = null;

export default boot(({ app }) => {
  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies;
  const baseURL = "https://coding_ducks.panipuri.tech";
  // const baseURL = process.env.DEV
  //   ? "http://localhost:3333"
  //   : "https://coding_ducks.panipuri.tech";
  // process.env.SERVER
  // ? "http://localhost:3333"
  // : "http://api.couponluxury.com";

  api = axios.create({
    baseURL,
    timeout: 3000,
    transformRequest: [
      (data, headers) => {
        headers["Authorization"] = `Bearer ${cookies.get("token")}`;
        return data;
      },
      ...axios.defaults.transformRequest,
    ],
  });
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response && error.response.status === 401) {
        // if token expired
        const refreshToken = cookies.get("refreshToken");
        if (refreshToken) {
          // refresh token
          const response = await axios.post(baseURL + "/users/refreshToken", {
            refreshToken,
          });
          const { accessToken } = response.data;
          // set new token
          cookies.set("token", accessToken);
        }
      }

      return Promise.reject(`${error}: Do that again`);
    }
  );
});
export { api };

const getNewToken = (refreshToken) => {};
