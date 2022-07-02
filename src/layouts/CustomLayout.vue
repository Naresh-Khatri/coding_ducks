<template>
  <q-layout view="hHh Lpr lff" container style="height: 100vh" class="shadow-2">
    <q-header
      class="bg-primary"
      :class="minLeft < 5 ? 'bg-negative' : ''"
      style="height: 70px"
    >
      <q-toolbar class="flex justify-between">
        <div class="flex">
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title class="flex flex-center">
            <img
              src="https://ik.imagekit.io/couponluxury/unknown_7LXFMJZP1.png"
              width="35"
              class="q-mr-md"
            />
            Coding Ducks</q-toolbar-title
          >
        </div>
        <div class="text-h6 flex flex-center">
          <q-icon class="q-mr-md" name="schedule" size="md" />
          {{ remainingTime }}
        </div>
        <div class="flex">
          <ProfileInfo />
          <q-btn
            class="q-ml-md"
            color="negative"
            style="height: fit-content; align-self: center"
            icon="exit_to_app"
            label="end test"
            @click="endTest"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :width="200"
      :breakpoint="500"
      class="bg-dark"
    >
      <q-scroll-area class="fit">
        <q-list padding @click="miniState = true">
          <router-link
            v-for="problem in problems"
            :key="problem.id"
            :to="{
              name: 'main',
              params: {
                problemNum: problem.id,
              },
            }"
          >
            <q-item
              :active="$route.params.problemNum == problem.id"
              clickable
              class="tried"
              :class="'bg-' + colors[problem.id - 1].color"
            >
              <q-item-section avatar>
                {{ problem.id }}
              </q-item-section>

              <q-item-section> {{ problem.topic }} </q-item-section>
            </q-item>
          </router-link>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view :key="$route.params" />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import ProfileInfo from "src/components/ProfileInfo.vue";
import { useRoute, useRouter } from "vue-router";
import { useQuasar, date } from "quasar";

import { useProblemStore } from "src/stores/problems";
import { useUserStore } from "src/stores/user";
import { useSubmissionStore } from "src/stores/submissions";

const $route = useRoute();
const $router = useRouter();
const $q = useQuasar();

const problemStore = useProblemStore();
const userStore = useUserStore();
const submissionStore = useSubmissionStore();

const problems = computed(() => problemStore.problems);

const remainingTime = ref("calculating...");
const timer = ref(null);
const minLeft = ref(1000);
const secsLeft = ref(0);

const colors = computed(
  () =>
    problems.value.map((problem) => {
      const sub = submissionStore.submissions.find(
        (sub) => sub.problem_id == problem.id - 1
      );
      return {
        id: problem.id - 1,
        color: sub ? (sub.marks > 9 ? "positive" : "orange") : "red",
      };
    })
  // submissionStore.submissions.map((problem) => {
  //   return {
  //     id: problem.problem_id,
  //     color: problem.marks == 0 ? "red" : "green",
  //   };
  // })
);

onMounted(async () => {
  setTimeout(() => {
    if (remainingTime.value == "calculating...") {
      console.log("trying to logout");
      $q.notify({
        position: "top",
        message: "There was a problem! Please login again.",
        color: "info",
      });
      $router.push({ name: "login" });
      userStore.logout();
    }
  }, 3000);
  await problemStore.fetchProblems();
  setTimeout(async () => {
    await submissionStore.fetchSubmissions();
  }, 1000);
  if ($route.params.problemNum)
    problemStore.setCurrentProblem($route.params.problemNum - 1);
  else {
    $router.push({
      name: "main",
      params: { problemNum: 1 },
    });
  }

  const user = await userStore.fetchLoggedInUser();
  const startTime = new Date(userStore.user.startedOn);

  //redirect to login if not user
  //start timer
  timer.value = setInterval(() => {
    if (!userStore.user.startedOn) {
      remainingTime.value = "calculating...";
      return;
    }
    //warn dialog if time is less than 10 minutes
    if (minLeft.value < 10) {
      // $q.dialog({
      //   title: "Warning",
      //   message: "You have less than 10 minutes left!",
      //   color: "negative",
      // });
    }
    //startTime from shanghai to local time
    const localStartedTime = new Date(
      startTime.getTime() - 2.5 * 60 * 60 * 1000
    );
    const currTime = new Date();
    minLeft.value =
      59 - date.getDateDiff(currTime, localStartedTime, "minutes");
    secsLeft.value =
      60 - (date.getDateDiff(currTime, startTime, "seconds") % 60);
    remainingTime.value = `00:${
      minLeft.value < 10 ? "0" + minLeft.value : minLeft.value
    }:${
      secsLeft.value % 60 < 10
        ? "0" + (secsLeft.value % 60)
        : secsLeft.value % 60
    }`;
    //dont let user when time is up
    if (minLeft.value <= 0) {
      clearInterval(timer.value);
      $q.notify({
        color: "negative",
        textColor: "white",
        message: "Your time is up!",
      });
      $router.push({ name: "feedback" });
    }
  }, 1000);
});

const drawer = ref(false);
const miniState = ref(true);

const endTest = (message) => {
  $q.notify({
    color: message ? "negative" : "positive",
    textColor: "white",
    message: message || "Logged out successfully",
  });
  $q.dialog({
    title: "Logout",
    message: "Are you sure you want to logout?",
  }).onOk(() => {
    $router.push({ name: "feedback" });
  });
};
</script>
<style scoped lang="scss">
.q-item--active {
  border: 5px solid $secondary;
  font-weight: bold;
  color: white;
  margin: 4px;
  border-radius: 20px;
}
.completed {
  background: $positive;
  margin: 4px;
  border-radius: 20px;
}
.tried {
  background: #ff9500;
  margin: 4px;
  border-radius: 20px;
}
</style>
