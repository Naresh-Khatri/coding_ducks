import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";

import { Notify } from "quasar";

import { authServices } from "src/boot/firebase.js";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });
  Router.beforeEach(async (to, from) => {
    try {
      const user = await authServices.getCurrentUser();
      // console.log(user);
      // console.log(from, to);
      // console.log(
      //   user,
      //   to.matched.some((record) => record.meta.requiresAuth),
      //   to.name !== "login"
      // );

      // check if to route requires auth and avoid infinite loop
      if (
        to.matched.some((record) => record.meta.requiresAuth) &&
        to.name !== "login"
      ) {
        //to requires auth so check if user is logged in
        if (Object.entries(user).length === 0) {
          Notify.create({
            message: "You must be logged in to access this page",
            color: "negative",
            position: "top",
            timeout: 3000,
          });

          return Router.push({ name: "login" });
        } else {
        }
      }
    } catch (err) {
      console.log(err);
    }
  });

  return Router;
});
