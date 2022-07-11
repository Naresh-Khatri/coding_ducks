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
    path: "/playground",
    name: "playground",
    component: () => import("layouts/PlaygroundLayout.vue"),
    children: [
      {
        path: "",
        name: "playground",
        component: () => import("pages/PlaygroundPage.vue"),
      },
    ],
  },

  {
    path: "/main",
    component: () => import("layouts/CustomLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: ":problemNum",
        name: "main",

        component: () => import("pages/MainPage.vue"),
      },
    ],
  },
  {
    path: "/feedback",
    name: "feedback",
    meta: { requiresAuth: true },
    component: () => import("pages/FeedbackPage.vue"),
  },
  {
    path: "/results",
    name: "results",
    component: () => import("pages/ResultsPage.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
