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

      newDate.toLocaleDateString("en-GB", options).replace(/,/gi, '') +
      ", " +
      newDate.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", hour12: false})

  }`;
};

</script>

<template>
  <div class="">
    <p v-if="notFound" class="flex justify-center text-5xl text-center text-gray-400">
      No Announcement
    </p>
    <div v-for="(data,index) in announce" v-else :key="data.id" class="pb-5 ann-item">

        <div class="flex h-auto p-3 m-auto bg-white rounded-md ">
            <div class="text-black w-[8%] flex break-all items-center justify-center border-r-2 font-semibold ">No.{{ index+1 }}</div>
          <div class="h-full pl-4 grow">
          <div class="flex justify-between font-bold">
            <p class="pt-1 text-xl text-black ann-title">{{ data.announcementTitle }}</p>

            <div class="flex ">
                <button class="px-2 py-1 ml-2 text-black rounded-lg hover:bg-green-500 hover:text-white ann-button" @click="$router.push({name: 'announcementdetail', params: {id: data.id}})">view</button>
              <button class="px-2 py-1 ml-2 text-black rounded-lg hover:bg-red-500 hover:text-white ann-button">delete</button>
            </div>
          </div>
          <div class="flex mt-2">
            <p class="pt-1 text-[#4E6FE2] font-bold ann-publish-date">
              Publishdate: {{ changeTime(data.publishDate) !== null ? changeTime(data.publishDate) : '-' }}
            </p>
            <p class="pl-20 pt-1 text-[#A649A2] font-bold ann-close-date">
              Close Date: {{ changeTime(data.closeDate) !== null ? changeTime(data.closeDate) : '-' }}
            </p>

          </div>
          <div class="flex justify-between mt-4">
            <div
                class="text-white bg-[#628FB8] px-5 text-sm rounded-lg py-1 ann-category"
            >{{ data.announcementCategory }}
            </div>
            <div
                :class="data.announcementDisplay === 'Y' ? 'bg-green-500' : 'bg-red-500'"
                class="flex justify-center w-24 text-center text-white bg-green-500 rounded-lg ann-display"
            >{{ data.announcementDisplay === 'Y' ? 'Open' : 'Closed'}}

            </div>
          </div>
        </div>
        </div>
    </div>
  </div>
</template>

<style scoped></style>
