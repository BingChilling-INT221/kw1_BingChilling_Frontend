<script setup>
import globe from "./icons/Globe.vue";
const props = defineProps({
  timezone: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div>
    <div class="flex items-center">
      <globe class="w-[1.25rem] mx-2" />
      <span>{{ timezone }}</span>
    </div>
  </div>
</template>

<style scoped></style>
