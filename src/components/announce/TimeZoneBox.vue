<script setup>
import globe from "../icons/Globe.vue";

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
      <globe class="mx-1"/>
      <span class="ann-timezone">{{ timezone }}</span>
    </div>
  </div>
</template>

<style scoped></style>
