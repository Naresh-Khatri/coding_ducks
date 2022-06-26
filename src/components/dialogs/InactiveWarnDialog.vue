<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="border-radius: 30px; width: 900px">
      <div class="row flex justify-center">
        <div class="">
          <q-img :src="duckImg" height="280px" width="280px" />
        </div>
        <div class="flex flex-center column justify-between">
          <div></div>
          <div class="row flex flex-center">
            <q-avatar
              class="text-white q-mr-md"
              icon="warning"
              color="orange"
              size="60px"
            />
            <div class="text-body1 col">
              Dont close the window else you'll be disqualified
            </div>
          </div>
        </div>
      </div>
      <q-card-actions align="center">
        <div style="align-self: flex-end">
          <q-btn
            class="q-px-lg rounded"
            color="primary"
            size="lg"
            label="sorry"
            @click="onOKClick"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed } from "vue";
import { useDialogPluginComponent } from "quasar";

const props = defineProps({
  count: {
    type: Number,
    required: true,
  },
});
const negativeImgs = [
  "https://ik.imagekit.io/couponluxury/63d98670936397.5bb439fbdfabb_jxOOxoUWlm.gif",
  "https://ik.imagekit.io/couponluxury/b9eb2b42094811.57c019c4dd143_D0CjrE5ta.gif",
];
const duckImg = computed(() => {
  const randNum = Math.floor(Math.random() * negativeImgs.length);
  return negativeImgs[randNum];
});

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
// this is part of our example (so not required)
function onOKClick() {
  onDialogOK();
}
</script>
