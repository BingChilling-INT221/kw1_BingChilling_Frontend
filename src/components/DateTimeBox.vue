<script setup>
import TimeIcon from "./icons/Time_duotone_line.vue";
const props = defineProps({
  time: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div>
    <div class="flex items-center">
      <TimeIcon class="mr-1"></TimeIcon>
      <span> {{ time }}</span>
    </div>
  </div>
</template>

<style scoped></style>
