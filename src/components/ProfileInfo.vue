<template>
  <div class="flex items-center justify-center q-gutter-md row">
    <div class="q-mx-md flex flex-center text-body1">
      {{ Math.floor(submissionStore.score) }}/100
      <q-icon style="margin-top: -5px" size="md" name="star" color="yellow" />
    </div>
    <div>
      <div class="row justify-end text-caption">
        {{ userStore.user.fullname }}
      </div>
      <div class="row justify-end text-body1">
        {{ userStore.user.roll }}
      </div>
    </div>

    <q-img class="profile-img" :src="userStore.user.photoURL" />
  </div>
</template>
<script setup>
import { useUserStore } from "src/stores/user";
import { useSubmissionStore } from "src/stores/submissions";

const userStore = useUserStore();
const submissionStore = useSubmissionStore();
</script>
<style lang="scss" scoped>
.profile-img {
  padding: 0.5rem;
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
</style>
