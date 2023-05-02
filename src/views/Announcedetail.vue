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
    else if (result.status === 404 || result.status === 400) {
      alert("The request page is not available")
      router.push(`/admin/announcement/`)
    }
    else {
      alert("Something went wrong")
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
    newDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })

    }`;
};
</script>

<template>
  <div class="w-full h-screen font-mono">
    <div class="flex h-auto m-auto">
      <div class="flex w-full pl-12 space-x-2">
        <div class="w-6 pt-3">
            <button class="ann-button" @click="$router.back()">Back</button>
        </div>
      </div>

      <div class="flex justify-end w-full pt-2 ">
        <p class="pr-2 text-lg">{{ toHoursAndMinutes(UTC) }}</p>
        <img src="../assets/1845948.png" alt="" class="h-6 pr-1" />
      </div>
    </div>
    <div class="pt-5">
      <div class="w-11/12 h-auto p-3 m-auto bg-white rounded-lg">
        <div class="flex justify-between font-bold">
          <p class="pt-1 text-2xl text-black ann-title">
            Title:
            {{ queryAnnounce.announcementTitle }}
          </p>
          <div class="pt-1 pr-5 ann-display">
            <a
              href="#"
              class="flex justify-center w-20 p-2 text-white bg-green-500 rounded-lg"
              :class="
              queryAnnounce.announcementDisplay === 'Y' ? 'bg-green-500' : 'bg-red-500'
            "
              >{{ queryAnnounce.announcementDisplay }}</a
            >
          </div>
        </div>
        <div class="flex">
          <p class="pt-1 text-[#4E6FE2] font-bold ann-publish-date">
            Publishdate: {{ changeTime(queryAnnounce.publishDate) }}
          </p>
          <p class="pl-20 pt-1 text-[#A649A2] font-bold ann-close-date">
            Close Date: {{ changeTime(queryAnnounce.closeDate) }}
          </p>
        </div>
        <div class="pt-5 font-bold text-black border-2 rounded-lg">
            <p class="pl-5">Description:</p>
            <div class="h-auto">
                <p class="p-5 pl-5 ann-description">{{ queryAnnounce.announcementDescription }}</p>
            </div>
        </div>
        <div class="pt-5 ann-category">
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
