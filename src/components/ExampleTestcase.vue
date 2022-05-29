<template>
  <div class="container text-white">
    <div v-if="testCase.input">
      Input:
      <span
        style="padding-left: 20px"
        :style="testCase.inputFront.includes('<br>') ? ' display: block' : ''"
        v-html="testCase.inputFront"
      ></span>
    </div>
    <div>
      Output:
      <span style="padding-left: 20px">{{ testCase.output }}</span>
    </div>
    <div v-if="testCase.explaination">Explaination:</div>
    <div style="padding-left: 20px">{{ testCase.explaination }}</div>
  </div>
</template>

<script>
export default {
  props: ["testCase"],
};
</script>

<style scoped>
.container {
  min-height: 100px;
  min-width: 400px;
  width: fit-content;
  font-size: 20px;
  padding: 20px;
  font-family: Consolas, "Courier New", monospace;
  backdrop-filter: blur(4px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(17, 25, 40, 0.75);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
}
</style>
