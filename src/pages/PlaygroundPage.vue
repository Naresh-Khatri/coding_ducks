<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <q-splitter v-model="splitterModel" horizontal style="height: 100vh">
          <template v-slot:before>
            <div style="height: 100%">
              <codemirror
                v-model="code"
                placeholder="Code goes here..."
                class="full-width"
                :style="{
                  height: '100%',
                  fontSize: '16px',
                }"
                :autofocus="true"
                :indent-with-tab="true"
                :tabSize="4"
                :extensions="extensions"
                @change="change"
              />
            </div>
          </template>
          <template v-slot:separator>
            <q-avatar style="height: 50px" size="40px"> </q-avatar>
          </template>
          <template v-slot:after>
            <div style="background: #282c34">
              <div
                class="text-center bg-white text-h6"
                style="border-radius: 25px 25px 0px 0px"
              >
                <div class="q-py-sm flex flex-center">
                  <div class="bar"></div>
                </div>
                <div class="row flex justify-between q-px-lg">
                  <div>Console:</div>
                  <div>
                    <q-btn
                      round
                      flat
                      label="share"
                      icon="img:src/assets/whatsapp.svg"
                      color="positive"
                      @click="shareCode"
                    />
                  </div>
                </div>
              </div>
              <pre
                class="q-pa-md bg-white"
                style="font-size: 16px; margin: 0; font-family: Hack, monospace"
                >{{ result.stdout || result.error }}</pre
              >
            </div>
          </template>
        </q-splitter>
        <q-page-sticky position="bottom-right" :offset="[30, 30]">
          <q-btn
            round
            size="lg"
            icon="play_arrow"
            color="positive"
            @click="run"
          />
        </q-page-sticky>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useQuasar, copyToClipboard } from "quasar";
import { api } from "src/boot/axios";

import Console from "src/components/OutputConsole.vue";

import { Codemirror } from "vue-codemirror";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { oneDark } from "@codemirror/theme-one-dark";
const extensions = [python(), oneDark];

const $route = useRoute();

const splitterModel = ref(60);
const code = ref("");
const selectedTheme = ref("oneDark");
const selectedLang = ref("python");

const updateEditorKey = ref(0);
const change = (e) => {
  //save in localstorage
  $q.localStorage.set(`savedPlayground`, e);
};

const $q = useQuasar();
onMounted(() => {
  //check for share params
  checkShareParams();

  //check for prev code in localstorage when not sharing
  if (!$route.query.code) loadSavedFile();

  //hide dialog in dev server
  if (window.location.port === "9000") return;
  $q.dialog({
    title: "Updates",
    html: true,
    message: `<ul>
      <li>This IDE currently doesn't support interactive user input so
      <b style='color:red'> dont use input() </b></li>
      <li>Only python is supported</li>
      <li>Code storage in your account will be added soon.</li>
      </ul>`,
  });
});

const loadSavedFile = () => {
  const savedCode = $q.localStorage.getItem(`savedPlayground`);
  if (savedCode) {
    code.value = savedCode;
    $q.notify({ message: "Previous session loaded 😎", color: "positive" });
  } else code.value = "";
  updateEditorKey.value++;
};

const checkShareParams = () => {
  const shareCode = $route.query.code;
  if (shareCode) {
    code.value = shareCode;
    $q.notify({ message: "Shared code loaded 😎", color: "positive" });
  }
};

const result = ref("");
const run = async () => {
  try {
    const res = await api.post("/playground", {
      code: code.value,
      lang: "python",
    });
    console.log(res.data);
    result.value = res.data;
  } catch (err) {
    console.log(err);
  }
};
const shareCode = () => {
  try {
    copyToClipboard(code.value);
    if (!navigator) throw new Error("No navigator");
    navigator.share({
      title: "Coding Ducks 🦆",
      text: "Hey, check out this code I wrote for you!",
      url: "https://coding-ducks.netlify.app/#/playground?code=" + code.value,
    });
  } catch (err) {
    console.log(err);
    $q.notify({
      message: "Your browser doesnt support sharing",
      color: "negative",
    });
  }
};
</script>
<style lang="scss" scoped>
pre {
  white-space: pre-wrap;
}
:deep(.q-splitter__separator) {
  background-color: #282c34;
}
.bar {
  background-color: #282c34;
  border-radius: 5px;
  width: 70px;
  height: 10px;
}
</style>
