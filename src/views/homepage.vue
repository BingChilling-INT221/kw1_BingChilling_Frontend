<script setup>
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import AnnouncementBox from "../components/AnnouncementBox.vue";

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
const announces = ref([]);
const notFound = ref(false)

const router = useRouter();
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

const changeTime = (time) => {
  if (time === null) {
    return "-"
  }
  const newDate = new Date(time);
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return `${

      newDate.toLocaleDateString("en-GB", options).replace(/[,]/gi, '') +
      ", " +
      newDate.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", hour12: false})

  }`;
};

</script>

<template>

  <div class="text-white ">
    <div class="flex justify-between w-full ">
      <p class="py-1 text-2xl font-bold">Date/Time shown in Timezone: <span class="font-normal">{{ timezone }}</span>
      </p>
      <button class="px-2 py-1 text-black bg-white rounded-md ann-button" @click="$router.push({name: 'Addtables'})">Add Announcement</button>
    </div>
    <div class="mt-10 ">
      <AnnouncementBox></AnnouncementBox>
    </div>
  </div>


</template>

<style scoped>

</style>