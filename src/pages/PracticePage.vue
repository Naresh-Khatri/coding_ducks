<template>
  <main>
    <div class="ro w">
      <codemirror
        v-model="code"
        placeholder="Code goes here..."
        class="full-width"
        :style="{
          height: '600px',
          fontSize: '20px',
        }"
        :autofocus="true"
        :indent-with-tab="true"
        :tabSize="4"
        :extensions="extensions"
        @change="change"
      />
    </div>
    <q-btn label="run" color="primary" @click="run" />
    <div class="ro">
      {{ result.error || result.stdout }}
      <!-- <codemirror
        v-model="result"
        class="full-width"
        :style="{
          height: '600px',
          fontSize: '20px',
        }"
        :autofocus="true"
        :indent-with-tab="true"
        :tabSize="4"
        :extensions="extensions"
      /> -->
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from "vue";
import { api } from "src/boot/axios";

import { Codemirror } from "vue-codemirror";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { oneDark } from "@codemirror/theme-one-dark";
const extensions = [python(), oneDark];

const code = ref("");
const selectedTheme = ref("oneDark");
const selectedLang = ref("python");

const updateEditorKey = ref(0);
const updateSaveFile = () => {};
const change = () => {};

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
</script>
<style lang="scss" scoped>
main {
}
</style>
