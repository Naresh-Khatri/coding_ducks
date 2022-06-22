<template>
  <div class="bg">
    <q-card class="container">
      <!-- take feedback from the students -->
      <div class="q-gutter-y-md column q-px-lg">
        <div v-if="step == 0">
          <div class="row q-pa-lg">
            <div class="col">
              <q-img
                style="max-width: 500px"
                src="https://ik.imagekit.io/couponluxury/86844d70936397.5bb439fbdbf6b_O3aiJ_elz.gif"
              />
            </div>
            <div class="col flex flex-center">
              <div class="text-h3">
                Awesome job! Now, let's take a look at your feedback.
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="step == 1" class="flex column flex-center">
          <div class="text-h2 text-center">
            How was your experience with the user interface?
          </div>
          <div class="flex items-center" style="margin-top: 150px">
            bad
            <q-rating
              style="margin: 0 20px"
              v-model="uiRating"
              max="5"
              size="5em"
              icon="img:https://ik.imagekit.io/couponluxury/tr:w-60/emojisky.com-17483518_cUrwImraZ.png"
            />
            excellent
          </div>
          <div class="q-mt-md text-h5">{{ uiRating }}/5</div>
          <div class="q-mt-md text-body1">(Tap on the ducks to rate)</div>
        </div>
        <div v-else-if="step == 2" class="flex column flex-center">
          <div class="text-h2 text-center">
            How was the difficulty level of the questions?
          </div>
          <div class="flex items-center" style="margin-top: 150px">
            easy
            <q-rating
              style="margin: 0 20px"
              v-model="diffRating"
              max="5"
              size="5em"
              icon="img:https://ik.imagekit.io/couponluxury/tr:w-60/emojisky.com-17483518_cUrwImraZ.png"
            />
            hard
          </div>
          <div class="q-mt-md text-h5">{{ diffRating }}/5</div>
          <div class="q-mt-md text-body1">(Tap on the ducks to rate)</div>
        </div>
        <div v-else-if="step == 3" class="flex column flex-center">
          <div class="text-h2 text-center">How was the event usefullness?</div>
          <div class="flex items-center" style="margin-top: 150px">
            not useful
            <q-rating
              style="margin: 0 20px"
              v-model="usefulRating"
              max="5"
              size="5em"
              icon="img:https://ik.imagekit.io/couponluxury/tr:w-60/emojisky.com-17483518_cUrwImraZ.png"
            />
            advantageous
          </div>
          <div class="q-mt-md text-h5">{{ usefulRating }}/5</div>
          <div class="q-mt-md text-body1">(Tap on the ducks to rate)</div>
        </div>
        <div v-else-if="step == 4" class="flex column flex-center">
          <div class="text-h2 text-center">How was the overall experience?</div>
          <div class="flex items-center" style="margin-top: 150px">
            bad
            <q-rating
              style="margin: 0 20px"
              v-model="overallRating"
              max="5"
              size="5em"
              icon="img:https://ik.imagekit.io/couponluxury/tr:w-60/emojisky.com-17483518_cUrwImraZ.png"
            />
            satisfied
          </div>
          <div class="q-mt-md text-h5">{{ overallRating }}/5</div>
          <div class="q-mt-md text-body1">(Tap on the ducks to rate)</div>
        </div>
        <div v-else-if="step == 5" class="flex column flex-center">
          <div class="text-h2 text-center">
            Would you like to see future events like this?
          </div>
          <div
            class="flex items-center justify-evenly"
            style="margin-top: 150px; width: 100%"
          >
            <div
              class="flex column items-center"
              :class="!futureEvent ? 'selected-border' : ''"
              @click="futureEvent = false"
            >
              <q-img
                width="150px"
                src="https://ik.imagekit.io/couponluxury/63d98670936397.5bb439fbdfabb_jxOOxoUWlm.gif"
              />
              <div class="text-h4">NO</div>
            </div>
            <div
              class="flex column items-center"
              :class="futureEvent ? 'selected-border' : ''"
              @click="futureEvent = true"
            >
              <q-img
                width="150px"
                src="https://ik.imagekit.io/couponluxury/4d576970936397.5bb439fbdc379_Xb4K44zuY.gif"
              />
              <div class="text-h4">Yusss</div>
            </div>
          </div>
        </div>
        <div v-else-if="step == 6" class="flex column flex-center">
          <div class="text-h2 text-center">Got any comments? (optional)</div>
          <div
            class="flex items-center justify-evenly"
            style="margin-top: 150px; width: 100%"
          >
            <q-input
              style="width: 600px"
              placeholder="Type your comments here"
              v-model="text"
              filled
              type="textarea"
            />
          </div>
        </div>
        <div v-else class="flex column flex-center">
          <div class="text-h2 text-center">
            We really appreciate you for your time and effort.
          </div>
          <div
            class="flex items-center justify-evenly"
            style="margin-top: 150px; width: 100%"
          >
            <q-btn
              size="50px"
              color="primary"
              label="Finish test"
              rounded
              @click="submit"
            />
          </div>
        </div>
      </div>
      <q-card-actions align="right">
        <q-btn
          v-show="step != 0"
          style="margin-right: 50px; padding: 12px"
          color="primary"
          size="md"
          rounded
          outline
          label="back"
          icon="arrow_back"
          @click="changeTick(-1)"
        />
        <q-btn
          v-show="step < 7"
          style="margin-right: 50px; padding: 12px"
          color="primary"
          size="md"
          rounded
          outline
          label="next"
          icon-right="arrow_forward"
          @click="changeTick(1)"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

import { api } from "src/boot/axios";
import { useUserStore } from "src/stores/user";

const $q = useQuasar();
const $router = useRouter();
const userStore = useUserStore();

const diffRating = ref(4);
const uiRating = ref(4);
const usefulRating = ref(4);
const overallRating = ref(4);
const futureEvent = ref(false);
const text = ref("");
const step = ref(0);

const changeTick = (val = 1) => {
  step.value += val;
};

const submit = async () => {
  try {
    const payload = {
      ui: uiRating.value,
      difficulty: diffRating.value,
      usefulness: usefulRating.value,
      overall: overallRating.value,
      future_event: futureEvent.value,
      text: text.value,
    };
    const res = await api.post("/users/feedback", payload);
    console.log(res);
    $q.notify({
      message: "Thank you for participating 😍😍!",
      color: "positive",
      textColor: "white",
      position: "top",
      timeout: 5000,
    });
    $router.push("/");
    userStore.logout();
  } catch (error) {
    console.log(error);
  }
};
</script>
<style lang="scss" scoped>
.bg {
  height: 100vh;
  width: 100vw;
  background-color: $primary;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  height: 80vh;
  width: 70vw;
  padding: 100px 0;
  border-radius: 30px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.selected-border {
  border: 5px solid $primary;
  border-radius: 25px;
  padding: 10px;
  transform: scale(1.2);
}
</style>
