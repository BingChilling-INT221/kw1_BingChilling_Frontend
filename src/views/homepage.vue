<script setup>
import {onMounted, ref} from "vue";
import AnnouncementBox from "../components/AnnouncementBox.vue";

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
const announces = ref([]);
const notFound = ref(false);
onMounted(async () => {
  try {
    const result = await fetch(
        `${import.meta.env.VITE_BASE_URL}`
    );
    if (result.status === 200) {
      const response = await result.json();
      announces.value = response;
      if (announces.value.length === 0) {
        notFound.value = true
      }
    }
  } catch (err) {
    console.log(err);
  }
});
</script>

<template>

  <div class="text-white mx-[10%] w-[80%] pt-10">
    <div class="flex justify-between w-full ">
      <p class="py-1 text-2xl font-bold">Date/Time shown in Timezone: <span class="font-normal">{{ timezone }}</span>
      </p>
      <button class="px-2 py-1 text-black bg-white rounded-md ann-button"
              @click="$router.push({name: 'addannouncement'})">Add Announcement
      </button>
    </div>
    <div class="mt-10 ">
      <AnnouncementBox></AnnouncementBox>
    </div>
  </div>


</template>

<style scoped>

</style>