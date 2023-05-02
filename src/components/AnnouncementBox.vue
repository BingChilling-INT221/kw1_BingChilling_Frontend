<script setup>
import {onMounted, ref} from "vue";

const announce = ref([]);
const notFound = ref(false)
onMounted(async () => {
  try {
    const result = await fetch(
        `${import.meta.env.VITE_BASE_URL}`
    );
    if (result.status === 200) {
      const response = await result.json();
      announce.value = response;
      if (announce.value.length === 0) {
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
  <div>
    <p v-if="notFound" class="flex justify-center pt-5 text-5xl text-center text-gray-400">
      No Announcement
    </p>


    <div v-for="data in announce" v-else :key="data.id" class="px-5 pt-5 pb-2 font-mono ann-item">
      <RouterLink :to="{name: 'Tablesdetail', params: {id: data.id}}">
        <div class="h-auto p-3 m-auto bg-white w-12/12 hover:bg-gray-400">
          <div class="flex justify-between font-bold">
            <p class="pt-1 pl-3 text-3xl text-black ann-title">{{ data.announcementTitle }}</p>
            <div class="pt-1 pr-5">
              <a
                  :class="
              data.announcementDisplay === 'Y' ? 'bg-green-500' : 'bg-red-500'
            "
                  class="flex justify-center p-2 text-white bg-green-500 rounded-full h-7 w-7 ann-display"
                  href="#"
              >{{ data.announcementDisplay }}</a
              >
            </div>
          </div>
          <div class="pt-5 pl-3 pr-3 m-auto">
            <a
                class="text-white bg-[#628FB8] px-5 text-sm rounded-lg py-1 ann-category"
                href="#"
            >{{ data.announcementCategory }}</a
            >

            <div class="flex">
              <p class="pt-1 text-[#4E6FE2] font-bold ann-publish-date">
                Publishdate: {{ changeTime(data.publishDate) !== null ? changeTime(data.publishDate) : '-' }}
              </p>
              <p class="pl-20 pt-1 text-[#A649A2] font-bold ann-close-date">
                Close Date: {{ changeTime(data.closeDate) !== null ? changeTime(data.closeDate) : '-' }}
              </p>
            </div>
            <div class="flex ">
              <RouterLink :to="{name: 'Tablesdetail', params: {id: data.id}}">
                <button class="px-2 py-1 bg-gray-300 rounded-lg ann-button">view</button>
              </RouterLink>
            </div>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped></style>
