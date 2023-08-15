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
      <TimeIcon class="w-[1.25rem] mr-2"></TimeIcon>
      <span> {{ time }}</span>
    </div>
  </div>
</template>

<style scoped></style>
