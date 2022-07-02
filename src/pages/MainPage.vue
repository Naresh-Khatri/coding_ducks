<template>
  <q-page class="q-py-lg q-pl-lg bg-secondary">
    <q-splitter v-model="splitterModelX" style="height: 90vh">
      <template v-slot:before>
        <!-- v-if helps render when problems are fetched -->
        <ProblemStatement
          v-if="problemStore.currentProblem"
          :currentProblem="problemStore.currentProblem"
        />
      </template>
      <template v-slot:separator>
        <q-avatar
          color="primary"
          text-color="white"
          size="40px"
          icon="drag_indicator"
        />
      </template>

      <template v-slot:after>
        <div class="q-px-md q-mb-sm flex justify-between" style="height: 40px">
          <q-btn flat round icon="light_mode" color="primary" disable>
            <q-menu transition-show="jump-down" transition-hide="jump-up">
              <q-list style="max-width: 100px">
                <q-item
                  style="display: grid; place-items: center; width: 100px"
                  v-for="(theme, index) in themeOptions"
                  :key="index"
                  clickable
                  v-close-popup
                  @click="setTheme(theme)"
                >
                  <q-item-label>{{ theme }}</q-item-label>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <div class="flex justify-end q-mr-md q-gutter-md">
            <q-btn label="Run" color="orange" icon="play_arrow" @click="run" />
            <q-btn
              label="Submit"
              color="positive"
              icon="save"
              @click="submit"
            />
          </div>
          <q-btn flat round>
            <img :src="langLogos[selectedLang]" style="width: 30px" />
            <q-menu transition-show="jump-down" transition-hide="jump-up">
              <q-list>
                <q-item
                  style="width: max-content"
                  v-for="(lang, index) in langOptions"
                  :key="index"
                  clickable
                  v-close-popup
                  :disable="lang.disabled"
                  @click="changeLang(lang.lang)"
                >
                  <img :src="langLogos[lang.lang]" style="width: 50px" />
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
        <q-splitter v-model="splitterModelY" horizontal style="height: 80vh">
          <template v-slot:before>
            <code>
              <CustomEditor
                header-name="editor.exe"
                v-model="code"
                @update:modelValue="updateSaveFile"
                :theme="selectedTheme"
                :language="selectedLang"
                :key="updateEditorKey"
                @run="run"
              />
            </code>
          </template>
          <template v-slot:separator>
            <q-avatar
              color="primary"
              text-color="white"
              size="30px"
              icon="drag_indicator"
            />
          </template>

          <template v-slot:after>
            <Console
              header-name="console"
              :value="output"
              :theme="selectedTheme"
              :consoleExpanded="true"
            />
          </template>
        </q-splitter>
      </template>
    </q-splitter>
  </q-page>
</template>

<script setup>
import confetti from "https://cdn.skypack.dev/pin/canvas-confetti@v1.5.1-FOulXvdGbkdJFGKB7EdB/mode=imports,min/optimized/canvas-confetti.js";
import { ref, onMounted, onUnmounted, watchEffect, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProblemStore } from "src/stores/problems";
import { useSubmissionStore } from "src/stores/submissions";
import { useQuasar } from "quasar";

import { api } from "src/boot/axios";

import SubmissionDialog from "src/components/dialogs/SubmissionDialog.vue";
import InactiveWarnDialog from "src/components/dialogs/InactiveWarnDialog.vue";

import cLogo from "../assets/c.svg";
import cppLogo from "../assets/cpp.svg";
import javaLogo from "../assets/java.svg";
import jsLogo from "../assets/javascript.svg";
import pythonLogo from "../assets/python.svg";

import CustomEditor from "../components/CustomEditor.vue";
import ProblemStatement from "src/components/ProblemStatement.vue";
import Console from "../components/OutputConsole.vue";

const problemStore = useProblemStore();
const submissionStore = useSubmissionStore();

const $route = useRoute();
const $router = useRouter();
const $q = useQuasar();

const leftDrawerOpen = ref(false);
const currentFile = ref({});
const newFileDialog = ref(false);

const savedFiles = ref([]);
const updateEditorKey = ref(0);

const newFile = ref({
  name: "",
  content: "",
  lang: "cpp",
});
const lang2ext = ref({
  python: "py",
  java: "java",
  c: "c",
  cpp: "cpp",
  javascript: "js",
});
const langLogos = ref({
  python: pythonLogo,
  java: javaLogo,
  c: cLogo,
  cpp: cppLogo,
  javascript: jsLogo,
});
const themeOptions = ref([
  "dracula",
  "yonce",
  "xq-light",
  "twilight",
  "material-darker",
  "duotone-dark",
]);
const selectedTheme = ref("dracula");
const splitterModelX = ref(40);
const splitterModelY = ref(70);
const code = ref("");
const langOptions = ref([
  { lang: "python", disabled: false },
  { lang: "cpp", disabled: false },
  { lang: "c", disabled: false },
  { lang: "java", disabled: true },
  { lang: "javascript", disabled: true },
]);
const selectedLang = ref("python");

const isLoading = ref(false);
const output = ref("");

const editorHeight = ref(750);
const consoleExpanded = ref(false);

const setTheme = (theme) => {
  selectedTheme.value = theme;
};
const changeLang = (lang) => {
  selectedLang.value = lang;
  updateSaveFile();
};

const inactiveWarnCount = ref(3);
const showingWarning = ref(false);

const showWarningdialog = () => {
  if (document.visibilityState == "hidden") {
    if (showingWarning.value) return;
    inactiveWarnCount.value--;
    showingWarning.value = true;
    $q.dialog({
      component: InactiveWarnDialog,
      componentProps: {
        count: inactiveWarnCount.value,
      },
    })
      .onOk(() => (showingWarning.value = false))
      .onCancel(() => (showingWarning.value = false))
      .onDismiss(() => (showingWarning.value = false));
  }
};
onMounted(() => {
  document.addEventListener("visibilitychange", showWarningdialog);
  loadSavedFile();
  //TODO: show 404 page if problem not found
  try {
    problemStore.setCurrentProblem($route.params.problemNum - 1);
    // console.log(problemStore);
  } catch (err) {
    $router.push("/404");
  }
});
onUnmounted(() => {
  document.removeEventListener("visibilitychange", showWarningdialog);
});

const loadSavedFile = () => {
  const savedFile = $q.localStorage.getItem(
    `savedFile${$route.params.problemNum}`
  );
  if (savedFile) {
    selectedLang.value = savedFile.lang;
    code.value = savedFile.code;
  } else code.value = "";
  updateEditorKey.value++;
};

const updateSaveFile = () => {
  const file = {
    qNum: problemStore.currentProblem.id,
    code: code.value,
    lang: selectedLang.value,
  };
  $q.localStorage.set(`savedFile${$route.params.problemNum}`, file);
};

const run = async () => {
  output.value = "";
  isLoading.value = true;
  $q.loading.show({
    message: "Running...",
    delay: 0,
  });
  try {
    const res = await api.post("/", {
      code: code.value,
      lang: selectedLang.value,
      problemNum: $route.params.problemNum - 1,
    });
    showResult(res.data);
  } catch (err) {
    console.log(err);
    $q.loading.hide();
    output.value = "error: " + err.message;
  }
};
const submit = async () => {
  // console.log("subbmitted");
  output.value = "";
  isLoading.value = true;
  $q.loading.show({
    message: "Running...",
    delay: 0,
  });
  try {
    const res = await api.post("/submit", {
      code: code.value,
      lang: selectedLang.value,
      problemNum: $route.params.problemNum - 1,
    });
    // console.log(res.data);
    submissionStore.fetchSubmissions();
    showResult(res.data);
    $q.dialog({
      component: SubmissionDialog,
      componentProps: {
        newStars: Number((res.data.passedCount / res.data.totalCount) * 10),
      },
    });
  } catch (err) {
    console.log(err);
    $q.loading.hide();
    output.value = "error: " + err.message;
  }
};
const showConfetti = () => {
  confetti({
    particleCount: 300,
    spread: 360,
    gravity: 0.5,
    shapes: ["circle", "circle", "square"],
  });
};

const handleConsoleExpansion = (isExpanded) => {
  consoleExpanded.value = isExpanded;
  editorHeight.value = isExpanded ? 550 : 750;
};

const showResult = (res) => {
  $q.loading.hide();
  output.value = res.stdout || res.stderr || "";
  if (res.error) {
    output.value = `error: ${res.error}`;
    return;
  }
  //show 🎊🎊🎊 when passed
  if (res.totalCount == res.passedCount) showConfetti();
  // console.log(problemStore.problems, problemStore.currentProblem);
  problemStore.problems[problemStore.currentProblem.id - 1].score =
    res.passedCount / res.totalCount;

  output.value = `tests passed: ${res.passedCount}/${res.totalCount} ${
    res.passedCount / res.totalCount === 1 ? "😎😍" : "😵"
  }\n\n`;
  let testCases = res.tests;
  // console.log(testCases);
  if (!testCases) return;
  testCases.forEach((test, index) => {
    output.value += `test #${index + 1}\ninput :\n${test.input}
expected  output: ${test.expout}
your code output: ${test.stdout}\n${
      test.passed ? "Passed ✅" : "Failed ❌"
    }\n\n`;
  });
};
</script>
