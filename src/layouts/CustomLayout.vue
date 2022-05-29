<template>
  <q-layout view="hHh Lpr lff" container style="height: 100vh" class="shadow-2">
    <q-header class="bg-primary" style="height: 70px">
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
import { ref, onMounted, computed, initCustomFormatter } from "vue";
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

const remainingTime = ref("");

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
  await submissionStore.fetchSubmissions();
  const res = await problemStore.fetchProblems();
  if ($route.params.problemNum)
    problemStore.setCurrentProblem($route.params.problemNum - 1);
  else {
    $router.push({
      name: "main",
      params: { problemNum: 1 },
    });
  }
  //start timer
  updateTimer();
  setInterval(() => {
    updateTimer();
  }, 1000);

  // console.log(res);

  // console.log(submissionStore.submissions);
  // console.log(colors.value);
});
const updateTimer = () => {
  const startedTime = new Date(userStore.user.startedOn);
  //startedTime from shanghai to local time
  const localStartedTime = new Date(
    startedTime.getTime() - 2.5 * 60 * 60 * 1000
  );
  const currTime = new Date();
  const minLeft = 60 - date.getDateDiff(currTime, localStartedTime, "minutes");
  const secsLeft =
    60 - (date.getDateDiff(currTime, startedTime, "seconds") % 60);
  remainingTime.value = `00:${minLeft < 10 ? "0" + minLeft : minLeft}:${
    secsLeft % 60 < 10 ? "0" + (secsLeft % 60) : secsLeft % 60
  }`;
  if (minLeft <= 0) {
    endTest();
  }
};

const drawer = ref(false);
const miniState = ref(true);

const endTest = () => {
  userStore.logout();
  $router.push("/");
  $q.notify({
    color: "positive",
    textColor: "white",
    message: "Logged out successfully",
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
