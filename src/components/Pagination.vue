<script setup>
import { computed } from 'vue';
const props = defineProps({
  totalPages: {
    type: Number,
    default: 0
  },
  first: {
    type: Boolean,
    default: false
  },
  last: {
    type: Boolean,
    default: false
  },
  current: {
    type: Number,
    default: 0
  }
});

const wantPage = computed(() => {
  const newArray = [];
  const page = props.current + 1;
  const startLength = page - 9 > 1 ? page - 9 : 1;
  const endLength =
    startLength + 9 > props.totalPages ? props.totalPages : startLength + 9;

  for (let i = startLength; i <= endLength; i++) {
    newArray.push(i);
  }

  return newArray;
});
// const emit = defineEmits(['changePage']);
// const goToPreviousPage = () => {
//   if (current > 0) {
//     store.setPage(current - 1);
//     fetched();
//   }
// };

// const goToNextPage = () => {
//   store.setPage(current + 1);
//   fetched();
// };
// const clickPage = (page) => {
//   store.setPage(page);
//   fetched();
// };
</script>

<template>
  <div class="justify-center flex">
    <div class="flex items-center space-x-2 basis-4/5">
      <button
        v-if="totalPages !== 1"
        :class="first ? 'opacity-25' : ''"
        :disabled="first"
        class="ann-page-prev"
        @click="$emit('changePage', current - 1)"
      >
        Prev
      </button>
      <ul class="flex flex-row basis-full">
        <li
          v-for="(pageNumber, index) in wantPage"
          class="mx-auto"
          :key="pageNumber"
          :class="[
            { 'text-red-500': current === pageNumber - 1 },
            `ann-page-${index}`
          ]"
          @click="$emit('changePage', pageNumber - 1)"
        >
          {{ pageNumber }}
        </li>
      </ul>
      <button
        v-if="totalPages !== 1"
        :class="last ? 'opacity-25' : ''"
        :disabled="last"
        class="ann-page-next"
        @click="$emit('changePage', current + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<style scoped></style>
