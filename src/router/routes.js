const routes = [
  { path: "/", component: () => import("pages/HomePage.vue") },
  {
    path: "/login",
    name: "login",
    component: () => import("pages/LoginPage.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: () => import("pages/TestPage.vue"),
  },

  {
    path: "/main",
    component: () => import("layouts/CustomLayout.vue"),
    children: [
      {
        path: ":problemNum",
        name: "main",

        component: () => import("pages/MainPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
