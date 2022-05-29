<template>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "./stores/user";

const $q = useQuasar();
const $router = useRouter();
const $route = useRoute();
const userStore = useUserStore();

onMounted(async () => {
  const loggedUser = await userStore.fetchLoggedInUser();
  console.log(loggedUser, $route.path);
  if ((!loggedUser || loggedUser === "error") && $route.path !== "/") {
    $q.notify({
      message: "Please login first!",
      color: "negative",
      icon: "warning",
    });
    $router.push("/login");
  } else {
  }
});
</script>
