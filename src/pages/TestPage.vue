<template>
  <codemirror
    v-model="code"
    placeholder="Code goes here..."
    :style="{ height: '80vh' }"
    :autofocus="true"
    :indent-with-tab="true"
    :tabSize="2"
    :extensions="extensions"
    @ready="log('ready', $event)"
    @change="log('change', $event)"
    @focus="log('focus', $event)"
    @blur="log('blur', $event)"
  />
</template>

<script>
import { ref } from "vue";
import { Codemirror } from "vue-codemirror";

import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";

import { oneDark } from "@codemirror/theme-one-dark";

export default {
  components: {
    Codemirror,
  },
  setup() {
    const code = ref(`console.log('Hello, world!')`);
    const extensions = [cpp(), oneDark];

    return {
      code,
      extensions,
      log: console.log,
    };
  },
};
</script>
