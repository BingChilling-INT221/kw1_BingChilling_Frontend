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
        class="flex h-56 m-auto bg-gradient-to-r from-purple-950 via-gray-500 to-blue-950"
      >
        <div class="flex w-full pl-24 space-x-16">
          <div class="flex items-center w-48 justify-items-center">
            <img src="../assets/boost.png" alt=""  class="w-full h-auto"/>
          </div>
          <div class="flex items-center justify-items-center" >
            <p class="flex py-2 space-x-16 font-bold text-white text-7xl ">SIT Announcement System (SAS)</p>
          </div>
        </div>
      </div>
    <div>
        
    </div>

    </div>
  </div>
</template>

<style scoped></style>
