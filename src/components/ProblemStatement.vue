<template>
  <q-scroll-area
    :thumb-style="thumbStyle"
    :bar-style="barStyle"
    style="width: 100%; height: 100%"
  >
    <div class="left-section">
      <div class="text-h4">
        #{{ currentProblem.id }}.
        {{ currentProblem.title }}
      </div>
      <!-- {{ currentProblem }} -->
      <QuestionStats class="q-mt-sm" :diffLevel="currentProblem.diffLevel" />
      <div class="text-body1 q-mt-xl">
        <span v-html="currentProblem.description"></span>
      </div>
      <q-separator class="q-my-md" color="primary" />
      <div v-for="(testCase, index) in testCases" :key="index">
        <div style="font-size: 30px; margin-top: 20px">
          Test Case: {{ index + 1 }}
        </div>
        <Example :testCase="testCase" />
      </div>
      <!-- <q-btn label="run" @click="isLoading = !isLoading" /> -->
    </div>
  </q-scroll-area>
</template>

<script setup>
import { ref, computed } from "vue";
import Example from "./ExampleTestcase.vue";
import QuestionStats from "./QuestionStats.vue";
// const props = defineProps({
//   num: {
//     type: Number,
//     required: true,
//   },
//   title: {
//     type: String,
//     required: true,
//   },
//   desc: {
//     type: String,
//     required: true,
//   },
//   testCases: {
//     type: Array,
//     required: true,
//   },
//   diffLevel: {
//     type: Number,
//     required: true,
//   },
// });

const props = defineProps({
  currentProblem: {
    required: true,
  },
});
const testCases = computed(() =>
  props.currentProblem.testCases.map((testCase) =>
    testCase.hidden ? {} : testCase
  )
);

const thumbStyle = ref({
  right: "4px",
  borderRadius: "4px",
  backgroundColor: "#742ff6",
  width: "10px",
  opacity: 0.5,
});

const barStyle = ref({
  right: "2px",
  borderRadius: "4px",
  backgroundColor: "#742ff6",
  width: "15px",
  opacity: 0.2,
});
</script>
