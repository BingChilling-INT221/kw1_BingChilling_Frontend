<script setup>
import {computed, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useAnnouncerStore} from "@/stores/announcer";
import {fetchCountParam} from "@/services/annApi.js";
import Eye from "@/components/icons/Eye.vue";

const queryAnnounce = ref({});
const route = useRoute();
const router = useRouter();
const loading = ref(true);
const store = useAnnouncerStore();
const isAdminPath = computed(() => {
  console.log(route.path);
  if (route.path.includes('viewer')) {
    return false
  }
  return route.path.includes('admin');
});
onMounted(async () => {
  if (route.path.includes("admin")) {
    store.setCount(true);
  }
  try {
    const response = await fetchCountParam(route.params.id, store.count);

    if (response.status === 200) {
      queryAnnounce.value = await response.json();
      console.log(queryAnnounce.value);
      loading.value = false;
    } else if (response.status === 404 || response.status === 400) {
      console.log("404");
      alert("The request page is not availables");
      await router.push(`/admin/announcement/`);
    } else {
      console.log("Something went wrong");
    }
  } catch (err) {
    alert("The request page is not available");
    await router.push(`/admin/announcement/`);
  }
});

const changeTime = (time) => {
  if (time === null) {
    return "-";
  }
  const newDate = new Date(time);
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return `${
      newDate.toLocaleDateString("en-GB", options).replace(/,/gi, "") +
      ", " +
      newDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
  }`;
};
</script>

<template>
  <div class="mx-[10%] w-[80%] pt-10">
    <div class="">
      <button class="text-2xl font-bold ann-button" @click="$router.back()">
        <span>&lt;</span> Back
      </button>
    </div>
    <div
        v-if="loading"
        class="flex justify-center min-w-full min-h-full text-center bg-slate-400"
    >
      <div class="absolute mt-2 mr-2">
        <svg
            class="w-20 h-20 bg-transparent border-2 border-transparent border-opacity-50 rounded-full animate-spin"
            style="border-right-color: white; border-top-color: white"
            viewBox="0 0 24 24"
        ></svg>
      </div>
    </div>
    <div v-else class="mt-2">
      <div class="w-full px-8 pt-4 pb-4 rounded-lg">
        <div class="flex justify-between font-bold">
          <p class="w-4/5 text-xl break-words ann-title">
            Title:
            {{ queryAnnounce.announcementTitle }}
          </p>

          <div v-show="isAdminPath" class="flex justify-end">
            <div
                :class="
                queryAnnounce.announcementDisplay === 'Y'
                  ? 'bg-green-500'
                  : 'bg-red-500'
              "
                class="flex justify-center w-24 h-10 p-2 py-3 bg-green-500 rounded-lg ann-display sm:w-28 sm:h-12"
            >
              {{ queryAnnounce.announcementDisplay }}
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

          <div v-show="isAdminPath" class="flex">
            <Eye></Eye>
            <p class="py-1">{{ queryAnnounce.viewCount }}</p>
          </div>
        </div>

        <div class="py-5 ann-category">
          <a class="bg-[#628FB8] px-5 text-sm rounded-lg py-1" href="#">{{
              queryAnnounce.announcementCategory
            }}</a>
        </div>
        <div class="pt-5 font-bold border-2 rounded-lg">
          <!-- <h1 class="pl-5">Description:</h1> -->
          <div class="h-auto">
            <p
                class="p-5 pl-5 ann-description ql-editor"
                v-html="queryAnnounce.announcementDescription"
            ></p>
          </div>
        </div>
        <div class="flex justify-end">
          <button
              v-show="isAdminPath"
              class="px-2 py-1 mt-2 ml-6 border-2 rounded-lg ann-button hover:bg-gray-300"
              @click="
              $router.push({
                name: 'editannouncement',
                params: { id: queryAnnounce.id },
              })
            "
          >
            edit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
