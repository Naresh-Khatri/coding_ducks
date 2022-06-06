<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="border-radius: 30px; width: 900px">
      <div class="row">
        <div class="col">
          <q-img :src="duckImg" height="280px" width="280px" />
        </div>
        <div class="col flex flex-center column">
          <div v-if="newStars > 0" class="text-center">
            <div class="text-h2 q-mt-xl">
              +{{ newStars
              }}<q-icon
                name="star"
                style="margin-top: -10px"
                size="60px"
                color="orange-6"
              />
            </div>
            <div class="text-body1">added to your score</div>
          </div>
          <div v-else>
            <span class="text-h4 q-mt-xl q-pr-lg">
              Some test cases failed, check the console.
            </span>
          </div>
        </div>
      </div>
      <q-card-actions align="center">
        <q-btn
          class="q-mb-md q-mr-md"
          color="primary"
          size="lg"
          rounded
          label="OK"
          @click="onOKClick"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed } from "vue";
import { useDialogPluginComponent } from "quasar";

const props = defineProps({
  newStars: {
    type: Number,
    required: true,
  },
});
const positiveImgs = [
  "https://ik.imagekit.io/couponluxury/86844d70936397.5bb439fbdbf6b_O3aiJ_elz.gif",
  "https://ik.imagekit.io/couponluxury/185d4d70936397.5bb439fbd97fc_fCcWMr1bG.gif",
  "https://ik.imagekit.io/couponluxury/4d576970936397.5bb439fbdc379_Xb4K44zuY.gif",
  "https://ik.imagekit.io/couponluxury/2d037c70936397.5bb439fbda19f_leAvQOZbz.gif",
];
const negativeImgs = [
  "https://ik.imagekit.io/couponluxury/0959c570936397.5bb439fbde3d2_lGsUwk-M9.gif",
  "https://ik.imagekit.io/couponluxury/63d98670936397.5bb439fbdfabb_jxOOxoUWlm.gif",
  "https://ik.imagekit.io/couponluxury/b9eb2b42094811.57c019c4dd143_D0CjrE5ta.gif",
  "https://ik.imagekit.io/couponluxury/614ab270936397.5bb439fbdab5d_BzKOTRnS-.gif",
];
const duckImg = computed(() => {
  const randNum = Math.floor(Math.random() * positiveImgs.length);
  return props.newStars > 0 ? positiveImgs[randNum] : negativeImgs[randNum];
});

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
// this is part of our example (so not required)
function onOKClick() {
  onDialogOK();
}
</script>
