<script setup>
import {onMounted, ref} from 'vue';
import {useAnnouncerStore} from '@/stores/announcer';
import {fetchCate} from '@/services/catApi.js';

const store = useAnnouncerStore();
const category = ref([]);
store.category = -1;
onMounted(async () => {
  try {
    // fetchCat.value = true;
    category.value = await fetchCate();
    store.category = '';
  } catch (err) {
    // alert(err.message);
  }
});
</script>

<template>
  <div>
    <div class="lg:w-[200px]">
      <!-- <p class="hidden py-2 text-xl md:inline-block">Category:</p> -->
      <select
          v-model="store.category"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1
        dark:bg-blackCustom dark:border-white dark:placeholder-gray-400 dark:text-white ann-category-filter"

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
