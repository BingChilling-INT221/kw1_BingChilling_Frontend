<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const queryAnnounce = ref({});
const route = useRoute();

onMounted(async () => {
  try {
    const result = await fetch(
      `${import.meta.env.VITE_BASE_URL}/${route.params.id}`
    );
    if (result.status === 200) {
      const response = await result.json();
      queryAnnounce.value = response;
      console.log(queryAnnounce.value);
    }
  } catch (err) {
    console.log(err);
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
  const newDate = new Date(time);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return `${
    newDate.toLocaleTimeString("en-US") +
    " " +
    newDate.toLocaleDateString("en-US", options)
  }`;
};
</script>

<template>
  <div class="font-mono w-full h-screen">
    <div class="h-auto m-auto flex">
      <div class="flex pl-12 space-x-2 w-full">
        <div class="w-6 pt-3">
            <button @click="$router.back()"><img src="../assets/image.png" alt="" /></button>
        </div>
        <div>
          <p class="font-bold text-xl pt-2.5">Back</p>
        </div>
      </div>

      <div class="flex pt-2 w-full justify-end w-4/6">
        <p class="pr-2 text-lg">{{ toHoursAndMinutes(UTC) }}</p>
        <img src="../assets/1845948.png" alt="" class="h-6 pr-1" />
      </div>
    </div>
    <div class="pt-5">
      <div class="bg-white h-auto w-11/12 m-auto p-3 rounded-lg">
        <div class="flex justify-between font-bold">
          <p class="text-black text-2xl pt-1">
            Title:
            {{ queryAnnounce.announcementTitle }}
          </p>
          <div class="pr-5 pt-1">
            <a
              href="#"
              class="flex text-white bg-green-500 p-2 rounded-lg w-20 justify-center"
              :class="
              queryAnnounce.announcementDisplay === 'Y' ? 'bg-green-500' : 'bg-red-500'
            "
              >{{ queryAnnounce.announcementDisplay }}</a
            >
          </div>
        </div>
        <div class="flex">
          <p class="pt-1 text-[#4E6FE2] font-bold">
            Publishdate: {{ changeTime(queryAnnounce.publishDate) }}
          </p>
          <p class="pl-20 pt-1 text-[#A649A2] font-bold">
            Close Date: {{ changeTime(queryAnnounce.closeDate) }}
          </p>
        </div>
        <div class="text-black font-bold pt-5 rounded-lg border-2">
            <p class="pl-5">Description:</p>
            <div class="h-auto">
                <p class="p-5 pl-5">{{ queryAnnounce.announcementDescription }}</p>
            </div>
        </div>
        <div class="pt-5">
                <a
          href="#"
          class="text-white bg-[#628FB8] px-5 text-sm rounded-lg py-1"
          >{{ queryAnnounce.announcementCategory }}</a
        >
            </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
