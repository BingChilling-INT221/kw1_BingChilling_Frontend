<script setup>
import { onMounted,computed } from "vue";
import AnnouncementBox from "./AnnouncementBox.vue";
import { ref } from "vue";
const date = new Date();
const UTC = date.getTimezoneOffset();
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
function toHoursAndMinutes(totalMinutes) {
  const negetive = totalMinutes > 0 ? 'UTC-' : 'UTC+';
  if (totalMinutes < 0) {
    totalMinutes *= -1;
  }
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${negetive+padToTwoDigits(hours)}:${padToTwoDigits(minutes)}`;
}
function padToTwoDigits(num) {
  return num.toString().padStart(2, "0");
}
console.log(toHoursAndMinutes(UTC));


</script>

<template>
  <div class="font-mono">
    <div class="w-full h-full">
      <div
        class="bg-gradient-to-r from-purple-950 via-gray-500 to-blue-950 h-56 m-auto flex"
      >
        <div class="flex pl-24 space-x-16 w-full">
          <div class="w-44 pt-14">
            <img src="../assets/boost.png" alt="" />
          </div>
          <div>
            <p class="font-bold text-5xl pt-24">Announcement</p>
          </div>
        </div>

        <div class="flex pt-2 w-full justify-end space-x-2">
          <p class="text-lg">Time zone: {{ timezone }}</p>
          <p class="text-lg">{{toHoursAndMinutes(UTC) }}</p>
          <img src="../assets/1845948.png" alt="" class="h-6 pr-1" />
        </div>
      </div>
      
      <div class="pt-10">
        <div class="m-auto w-11/12 rounded-xl h-auto">
          <div class="flex space-x-16 pt-3 pr-5 w-full">
            <div class="flex w-8/12 space-x-14 text-xl font-bold">
              <p class="pl-5">All Announcement</p>
              <p class="">Open</p>
              <p class="">Closed</p>
            </div>
            <div class="w-full flex justify-end font-bold pt-1 text-xl">
              <p>Sort by date</p>
            </div>
          </div>
          
          <AnnouncementBox/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
