<script setup>
import {computed, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import ModAnn from "@/components/announce/Modannouncedment.vue";
import {fetchShowEdit} from "@/services/annApi.js";
import format_page from "@/components/format_page.vue";

const router = useRouter();
const route = useRoute();

const announcement = ref({});

const newPublishDate = ref("");
const newPublishTime = ref("");

const newCloseDate = ref("");
const newCloseTime = ref("");
let loading = ref(true);

onMounted(async () => {
  try {
    const response = await fetchShowEdit(route.params.id);
    if (response.status === 200) {
      loading.value = false;
      announcement.value = await response.json();
      // console.log(route.params.id);
      // console.log(announcement.value);
      announcement.value.announcementDisplay =
          announcement.value.announcementDisplay === "Y";
      if (
          announcement.value.publishDate !== null ||
          announcement.value.publishDate
      ) {
        const date = changeNewStringToDate(
            new Date(announcement.value.publishDate)
        );
        const time = changeStringToTime(
            new Date(announcement.value.publishDate).toTimeString()
        );
        newPublishDate.value = date ?? "";
        newPublishTime.value = time ?? "";
      }

      if (
          announcement.value.closeDate !== null ||
          announcement.value.closeDate
      ) {
        const date = changeNewStringToDate(
            new Date(announcement.value.closeDate)
        );
        const time = changeStringToTime(
            new Date(announcement.value.closeDate).toTimeString()
        );
        newCloseDate.value = date ?? "";
        newCloseTime.value = time ?? "";
      }
    } else if (response.status === 404) {
      const error = await response.json();
      alert(error.message);
      await router.push(`/admin/announcement/`);
    }
    loading.value = false;
  } catch (err) {
    console.log(err);
  }
});

const changeNewStringToDate = (dates) => {
  if (!dates) return null;
  let date, month, year;
  date = dates.getDate();
  month = dates.getMonth() + 1;
  year = dates.getFullYear();

  date = date.toString().padStart(2, "0");

  month = month.toString().padStart(2, "0");
  return `${year}-${month}-${date}`;
};

const changeStringToTime = (time) => {
  if (!time) return null;
  let [hour, minute] = time.split(":");
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return null;
  if (hour === undefined || minute === undefined) return null;
  if (hour.length === 1) hour = `0${hour}`;
  if (minute.length === 1) minute = `0${minute}`;
  if (hour.length < 2 || minute.length < 2) return null;
  return `${hour}:${minute}`;
};

const updatePackage = computed(() => {
  return {
    announcementTitle: announcement.value.announcementTitle,
    announcementDescription: announcement.value.announcementDescription,
    newPublishDate: newPublishDate.value,
    newPublishTime: newPublishTime.value,
    newCloseDate: newCloseDate.value,
    newCloseTime: newCloseTime.value,
    announcementDisplay: announcement.value.announcementDisplay,
    categoryId: announcement.value.announcementCategory,
    ownerName: announcement.value.announcementOwner,
  };
});
</script>

<template>
  <!-- {{ announcement }} -->
  <format_page>
    <div
        v-if="loading"
        class="flex justify-center min-w-full min-h-full text-center"
    >
      <div class="absolute mt-2 mr-2">
        <svg
            class="w-20 h-20 bg-transparent border-2 border-transparent border-opacity-50 rounded-full animate-spin"
            style="border-right-color: white; border-top-color: white"
            viewBox="0 0 24 24"
        ></svg>
      </div>
    </div>

    <ModAnn v-if="!loading" :updatePackage="updatePackage"></ModAnn>
  </format_page>
</template>

<style scoped></style>
