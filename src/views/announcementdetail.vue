<script setup>
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const queryAnnounce = ref({});
const route = useRoute();
const router = useRouter();
onMounted(async () => {
  try {
    const result = await fetch(
        `${import.meta.env.VITE_BASE_URL}/${route.params.id}`
    );
    if (result.status === 200) {
      const response = await result.json();
      queryAnnounce.value = response;
      console.log(queryAnnounce.value);
    } else if (result.status === 404 || result.status === 400) {
      console.log("404")
      alert("The request page is not available")
      router.push(`/admin/announcement/`)
    } else {
      console.log("Something went wrong")
    }
  } catch (err) {
    alert("The request page is not available")
    router.push(`/admin/announcement/`)
  }
});

const date = new Date();
const UTC = date.getTimezoneOffset();

function toHoursAndMinutes(totalMinutes) {
  const negetive = totalMinutes > 0 ? "UTC-" : "UTC+";
  if (totalMinutes < 0) {
    totalMinutes *= -1;
  }
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${negetive + padToTwoDigits(hours)}:${padToTwoDigits(minutes)}`;
}

function padToTwoDigits(num) {
  return num.toString().padStart(2, "0");
}

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
  return `${newDate.toLocaleDateString("en-GB", options).replace(/[,]/gi, '') +
  ", " +
  newDate.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", hour12: false})

  }`;
};

</script>

<template>
  <div class="">
    <div class="">
      <button class="text-2xl font-bold text-white ann-button " @click="$router.back()"><span>&lt;</span> Back</button>
    </div>
    <div class="mt-2 ">
      <div class="w-full px-8 pt-4 pb-4 bg-white rounded-lg ">
        <div class="flex justify-between font-bold">
          <p class="text-2xl text-black ann-title w-4/5">
            Title:
            {{ queryAnnounce.announcementTitle }}
          </p>
          <div class="flex justify-end">
            <div
              :class="
              queryAnnounce.announcementDisplay === 'Y' ? 'bg-green-500' : 'bg-red-500'
            "
              class="flex justify-center w-24 p-2 h-10 text-white bg-green-500 rounded-lg ann-display"
          >{{ queryAnnounce.announcementDisplay }}
          </div>
          </div>  
          
        </div>
        <div class="flex justify-between">
          <div class="flex">
            <p class="pt-1 text-[#4E6FE2] font-bold ann-publish-date">
              Publishdate: {{ changeTime(queryAnnounce.publishDate) }}
            </p>
            <p class="pl-20 pt-1 text-[#A649A2] font-bold ann-close-date">
              Close Date: {{ changeTime(queryAnnounce.closeDate) }}
            </p>
          </div>

        </div>

        <div class="py-5 ann-category">
          <a
              class="text-white bg-[#628FB8] px-5 text-sm rounded-lg py-1"
              href="#"
          >{{ queryAnnounce.announcementCategory }}</a
          >
        </div>
        <div class="pt-5 font-bold text-black border-2 rounded-lg">
          <p class="pl-5">Description:</p>
          <div class="h-auto">
            <p class="p-5 pl-5 ann-description">{{ queryAnnounce.announcementDescription }}</p>
          </div>
        </div>
        <div class="flex justify-end">
          <button class="px-2 py-1 mt-2 ml-6 text-black border-2 rounded-lg ann-button hover:bg-gray-300" @click="$router.push({
            name: 'editannouncement',
            params: { id: queryAnnounce.id}
          })">edit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
