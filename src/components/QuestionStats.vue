<template>
  <div class="container">
    <q-chip color="positive" text-color="white" icon="speed">
      {{ diffLevel }}
    </q-chip>
    <!-- <q-chip v-if="likes" color="dark" text-color="white" icon="thumb_up">
      {{ likes }}
    </q-chip>
    <q-chip v-if="dislikes" color="dark" text-color="white" icon="thumb_down">
      {{ dislikes }}
    </q-chip>
    <q-icon
     v-if="isFav"
      :color="isFav ? 'pink' : 'white'"
      size="sm"
      :name="isFav ? 'favorite' : 'favorite_border'"
    />
    <q-icon
      :color="isBookmarked ? 'pink' : 'white'"
      size="sm"
      :name="isFav ? 'bookmark' : 'bookmark_border'"
    />
    <q-icon
      :color="isBookmarked ? 'pink' : 'white'"
      size="sm"
      :name="isFav ? 'star' : 'star_border'"
    /> -->
  </div>
</template>

<script setup>
const props = defineProps({
  diffLevel: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
  },
  dislikes: {
    type: Number,
  },
  isFav: {
    type: Boolean,
  },
  isBookmarked: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.container {
  width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
