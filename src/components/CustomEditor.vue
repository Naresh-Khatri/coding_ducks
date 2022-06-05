<template>
  <div
    class="monaco-container"
    ref="container"
    @keydown.ctrl.s.prevent.stop="
      () => {
        $emit('run');
      }
    "
  >
    <!-- theme: {{ cmOptions }} -->
    <div class="monaco-frame">
      <div class="monaco-frame-header">
        <div class="controls">
          <div class="control close"></div>
          <div class="control minimize"></div>
          <div class="control maximize"></div>
        </div>
        <div class="title">{{ headerName }}</div>
      </div>
    </div>
    <code>
      <codemirror
        style="font-family: monospace"
        v-model="cCode"
        placeholder="Code goes here..."
        :style="{
          height: '600px',
          fontSize: '24px',
        }"
        :autofocus="true"
        :indent-with-tab="true"
        :tabSize="4"
        :extensions="extensions"
        @change="change"
        :key="language + theme"
      />
    </code>
    <!-- <Codemirror
      class="codemirror-editor"
      v-model:value="cCode"
      :options="cmOptions"
      :theme="theme"
      placeholder="test placeholder"
      :height="'600px'"
      @change="change"
    /> -->
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

import { Codemirror } from "vue-codemirror";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

const extensions = [python(), oneDark];

const emits = defineEmits(["run", "update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  headerName: {
    type: String,
    required: true,
  },
  theme: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    required: false,
  },
  fontSize: {
    type: Number,
    default: 18,
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
  headerColor: {
    type: String,
    required: false,
    default: "#000000aa",
  },
});
const cCode = ref("");

// const lang2mode = {
//   c: "text/x-c",
//   cpp: "text/x-c++src",
//   java: "text/x-java",
//   python: "text/x-python",
//   javascript: "text/javascript",
// };

// const cmOptions = ref({
//   mode: lang2mode[props.language], // Language mode
//   theme: props.theme, // Theme
//   lineNumbers: true, // Show line number
//   smartIndent: true, // Smart indent
//   indentUnit: 4, // The smart indent unit is 2 spaces in length
//   foldGutter: true, // Code folding
//   fontSize: 200, // Font size
//   styleActiveLine: true, // Display the style of the selected row
// });

watch(
  () => props.theme,
  (newVal, oldVal) => {
    cmOptions.value.theme = newVal;
  }
);
watch(
  () => props.language,
  (newVal) => {
    switch (newVal) {
      case "python":
        extensions[0] = python();
        break;
      case "c":
        extensions[0] = cpp();
        break;
      case "cpp":
        extensions[0] = cpp();
        break;
      case "java":
        extensions[0] = java();
        break;
      case "javascript":
        extensions[0] = javascript();
        break;
    }
  }
);

const container = ref(null);

const change = (e) => {
  // console.log(e);
  const ok = e.length > 0 ? e : "null";
  emits("update:modelValue", ok);
};

onMounted(() => {
  cCode.value = props.modelValue;
});
</script>

<style lang="scss" scoped>
* {
  overflow: hidden;
}
.monaco-editor {
  border-radius: 30px;
}
.editor {
  border-radius: 0px 0px 10px 10px;
  /* border: 1px solid rgba(255, 255, 255, 0.125);
  border-top: 0px; */
}
.monaco-container {
  overflow: hidden;
  backdrop-filter: blur(4px);
  padding: 0px 15px;
}
.monaco-frame {
  position: relative;
  width: 100%;
  background-color: #000000aa;
  border-radius: 12px 12px 0px 0px;
  height: 45px;
  display: flex;
  align-items: center;
  /* border: 1px solid rgba(255, 255, 255, 0.25);
  border-bottom: 0px; */
}

.monaco-frame-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px;
}
.monaco-frame-header {
  display: grid;
  grid-template-columns: 60px auto 60px;
  height: 15px;
}

.controls {
  display: flex;
  z-index: 2;
}
.control {
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.17);
  margin-right: 8px;
}
.title {
  text-align: center;
  color: white;
}
.editor-header {
  height: 50px;
  max-width: 300px;
  margin-top: 30px;
  border: 3px solid black;
  background: orange;
  font-size: 2em;
  margin: 10px 5px;
  box-shadow: -5px 7px 0px 1px rgba(0, 0, 0, 1);
  -webkit-box-shadow: -5px 7px 0px 1px rgba(0, 0, 0, 1);
  -moz-box-shadow: -5px 7px 0px 1px rgba(0, 0, 0, 1);
}
.CodeMirror * {
  /*          ^
*/
  font-family: Arial, monospace;
  font-size: 16px;
}
// .codemirror-editor {
//   display: block;
//   font-family: monospace;
//   white-space: pre;
//   font-size: 1.5em;
//   border-radius: 0 0 10px 10px;
// }
// .CodeMirror * {
//   font-family: Consolas, monaco, monospace;
// }
</style>
