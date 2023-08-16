<script setup>
import { ref, onMounted } from 'vue';
import { useAnnouncerStore } from '@/stores/announcer';
import { fetchCate } from '@/services/api.js';
const store = useAnnouncerStore();
const category = ref([]);
store.category = -1;
onMounted(async () => {
  try {
    const categoryResponse = await fetchCate();
    // fetchCat.value = true;
    category.value = categoryResponse;
    store.category = '';
  } catch (err) {
    alert(err.message);
  }
});
</script>

<template>
  <div>
    <div class="">
      <!-- <p class="hidden py-2 text-xl md:inline-block">Category:</p> -->
      <select
        v-model="store.category"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ann-category-filter"
      >
        <option value="">All</option>
        <option
          v-for="data in category"
          :key="data.id"
          :value="data.categoryId"
        >
          {{ data.categoryName }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped></style>
