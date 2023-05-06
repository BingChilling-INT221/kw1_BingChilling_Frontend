<script setup>
import {computed, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import Addannouncement from "./addannouncement.vue";

useRouter();
const route = useRoute();

const announcement = ref({})


const newPublishDate = ref("")
const newPublishTime = ref("")

const newCloseDate = ref("")
const newCloseTime = ref("")

onMounted(async () => {
  try {
    const result = await fetch(
        `${import.meta.env.VITE_BASE_URL}/${route.params.id}`
    );
    if (result.status === 200) {
      const response = await result.json();
      // console.log(response)
      announcement.value = response;
      announcement.value.announcementDisplay = announcement.value.announcementDisplay === 'Y'
      // console.log(announcement.value);
    }
    if (announcement.value.publishDate !== null || announcement.value.publishDate) {
      const date = changeNewStringToDate(new Date(announcement.value.publishDate))
      const time = changeStringToTime(new Date(announcement.value.publishDate).toTimeString())
      newPublishDate.value = date ?? ""
      newPublishTime.value = time ?? ""
    }
  
    if (announcement.value.closeDate !== null || announcement.value.closeDate) {
      console.log(announcement.value.closeDate)
      const date = changeNewStringToDate(new Date(announcement.value.closeDate))
      const time = changeStringToTime(new Date(announcement.value.closeDate).toTimeString())
      console.log(date)
      console.log(time)
      newCloseDate.value = date ?? ""
      console.log(newCloseDate.value)
      newCloseTime.value = time ?? ''

    }
  } catch (err) {
    console.log(err);
  }
});


const changeNewStringToDate = (dates) => {
  if (!dates) return null
  let date, month, year;
  date = dates.getDate();
  month = dates.getMonth() + 1;
  year = dates.getFullYear();

  date = date
      .toString()
      .padStart(2, '0');

  month = month
      .toString()
      .padStart(2, '0');
  const result = `${year}-${month}-${date}`
  return result
}

const changeStringToTime = (time) => {
  if (!time) return null
  // console.log(time)
  let [hour, minute] = time.split(":");
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return null
  if (hour === undefined || minute === undefined) return null
  if (hour.length === 1) hour = `0${hour}`
  if (minute.length === 1) minute = `0${minute}`
  if (hour.length < 2 || minute.length < 2) return null
  return `${hour}:${minute}`
};

const updatePackage = computed(() => {
  return {
    "announcementTitle": announcement.value.announcementTitle,
    "announcementDescription": announcement.value.announcementDescription,
    "newPublishDate": newPublishDate.value,
    "newPublishTime": newPublishTime.value,
    "newCloseDate": newCloseDate.value,
    "newCloseTime": newCloseTime.value,
    "announcementDisplay": announcement.value.announcementDisplay,
    "categoryId": 3
  }
})
</script>

<template>
  <!-- {{ updatePackage }} -->
  <Addannouncement :updatePackage="updatePackage"></Addannouncement>

</template>

<style scoped></style>
