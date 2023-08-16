<script setup>
import { computed, inject, onMounted, ref, watch } from "vue";
import AnnBox from "@/components/AnnBox.vue";
import { useAnnouncerStore } from "@/stores/announcer";
import { fetchCate, fetched_api } from "../services/api.js";
import Navbar from "./Navbar.vue";
import AnnBox2 from "./AnnBox2.vue";
// import AnnBox2 from './AnnBox2.vue';
import dateTimeBox from "./DateTimeBox.vue";
import timeZoneBox from "./TimeZoneBox.vue";
import Pagination from "./Pagination.vue";
import CategoryBox from "./CategoryBox.vue";
const store = useAnnouncerStore();

// เวลาและ Time zone
const datetime = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
}).format();
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
// เวลาและ Time zone

const role = inject("role");
const checkAdmin = () => {
  return role === "admin";
};

const announces = ref([]);
const data = ref({});
const category = ref([]);
const isOpen = computed(() => {
  return store.mode === "active";
});
const fetchCat = ref(false);
const fetchDate = ref(false);
const loading = computed(() => {
  return fetchCat.value && fetchDate.value;
});
const notFound = ref(false);

onMounted(async () => {
  // try {
  //   const categoryResponse = await fetchCate();
  //   fetchCat.value = true;
  //   category.value = categoryResponse;
  // } catch (err) {
  //   alert(err.message);
  // }
  // await fetched();
});

watch(
  () => store.category,
  async () => {
    store.page = 0;
    await fetched();
  }
);

const fetches = async () => {
  if (!isOpen.value) {
    store.setMode("active");
    store.setPage(0);
  } else {
    store.setMode("close");
    store.setPage(0);
  }
  await fetched();
};

const fetched = async () => {
  const response = await fetched_api(
    role,
    store.category,
    store.mode,
    store.page,
    store.pageSize
  );
  if (response.status === 200) {
    fetchDate.value = true;
    data.value = await response.json();
    announces.value = data.value.content;
    if (announces.value.length === 0) {
      notFound.value = true;
    }
  } else {
    const errorResponse = await response.json();
    alert(errorResponse.message);
  }
};

// pagination
const changePage = (page) => {
  console.log(page);
  store.setPage(page);
  fetched();
};
// pagination
</script>

<template>
  <div class="w-full">
    <Navbar></Navbar>
    <div class="mx-6 bg-gray-700">
      <div class="flex items-center justify-center my-2">
        <dateTimeBox :time="datetime"></dateTimeBox>
        <timeZoneBox :timezone="timezone"></timeZoneBox>
      </div>
      <div class="flex flex-col gap-y-2">
        <div class="flex justify-around">
        <CategoryBox />
        <button class="py-1 rounded-md ann-button" @click="fetches()">
          {{ isOpen ? "Closed announcements" : "Active announcements" }}
        </button>
      </div>
      <div class="min-w-full">
        <div class="flex flex-col justify-center text-center gap-y-3">
          <p
            v-if="announces.length <= 0"
            class="flex justify-center text-5xl text-center text-gray-400"
          >
            No Announcement
          </p>
          <div v-for="(announce, index) in announces" v-else class="h-auto">
            <AnnBox2
              :ann-data="announce"
              :index="index + store.pageSize * store.page"
            ></AnnBox2>
          </div>
        </div>
      </div>
      </div>
      

      <Pagination
        @changePage="changePage"
        :totalPages="data.totalPages"
        :last="data.last"
        :first="data.first"
        :current="store.page"
      ></Pagination>
    </div>
  </div>
  <div class="h-auto min-w-full min-h-screen pt-5 md:px-12 xl:px-12 md:pt-12">
    <!-- <p class="hidden m-auto text-4xl font-bold md:block">
      <img
        alt=""
        class="inline-block w-20 h-[13.9] mr-4"
        src="../assets/annou.png"
      />SIT Announcement System
    </p> -->
    <!-- <div class="flex w-1/3 m-auto text-2xl font-semibold text-center md:hidden">
      <img alt="" class="w-20 h-12 mr-4" src="../assets/annou.png" /><span
        class="m-auto"
        >SAS</span
      >
    </div> -->
    <div v-if="!loading" class="absolute mt-2 mr-2">
      <!-- <svg
        class="w-20 h-20 bg-transparent border-2 border-transparent border-opacity-50 rounded-full animate-spin"
        style="border-right-color: white; border-top-color: white"
        viewBox="0 0 24 24"
      ></svg> -->
    </div>
    <div class="flex flex-col pt-16 md:flex-row">
      <div class="flex flex-col md:basis-11/12">
        <!-- <div class="flex flex-col xl:hidden basis-full">
          <div class="flex">
            <img alt="" class="w-6 h-6 my-auto" src="../assets/1845948.png" />
            <p class="h-8 py-1 my-auto text-xl font-normal">
              <span class="hidden md:inline-block">
                Date/Time shown in Timezone:</span
              >{{ timezone }}
            </p>
          </div>
          <div class="flex">
            <div class="">
              <div class="flex font-normal">
                <p class="hidden py-2 text-xl md:inline-block">Category:</p>
                <select
                  v-model="store.category"
                  class="pl-10 ml-2 text-black ann-category-filter select"
                >
                  <option value="">ทั้งหมด</option>
                  <option
                    v-for="data in category"
                    :key="data.id"
                    :value="data.categoryId"
                    class="text-black"
                  >
                    {{ data.categoryName }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div> -->
        <!-- <div class="flex justify-between pt-10 lg:pt-0">
          <p class="pl-5 text-2xl font-semibold md:max-h-16 md:min-h-16">
            Announcement
          </p>
          <div v-if="!checkAdmin()" class="flex">
            <button class="px-2 py-1 rounded-md ann-button" @click="fetches()">
              {{ isOpen ? "Closed announcements" : "Active announcements" }}
            </button>
            <div
              :class="isOpen ? 'bg-green-400' : 'bg-red-400'"
              class="w-3 h-3 m-auto rounded-full"
            ></div>
          </div>
          <button
            v-else
            class="px-2 py-1 rounded-md bg-black2Cus hover:bg-black3Cus ann-button"
            @click="$router.push({ name: 'addannouncement' })"
          >
            Add Announcement
          </button>
        </div> -->

        <!-- <div class="min-w-full">
          <div class="flex flex-col justify-center text-center">
            <p
              v-if="announces.length <= 0"
              class="flex justify-center text-5xl text-center text-gray-400"
            >
              No Announcement
            </p>
            <div v-for="(announce, index) in announces" v-else class="h-auto">
              <AnnBox
                :ann-data="announce"
                :index="index + store.pageSize * store.page"
              ></AnnBox>
            </div>
          </div>
        </div> -->

        <!-- <div
          v-if="announces.length > 0 && data.totalPages !== 1"
          class="flex justify-center py-5 text-2xl"
        >
          <div class="flex items-center space-x-2">
            <button
              v-if="data.totalPages !== 1"
              :class="data.first ? 'opacity-25' : ''"
              :disabled="data.first"
              class="ann-page-prev"
              @click="goToPreviousPage"
            >
              Prev
            </button>
            <ul class="flex flex-row space-x-2">
              <li
                v-for="(pageNumber, index) in wantPage"
                :key="pageNumber"
                :class="[
                  { 'text-red-500': store.page === pageNumber - 1 },
                  `ann-page-${index}`
                ]"
                @click="clickPage(pageNumber - 1)"
              >
                {{ pageNumber }}
              </li>
            </ul>
            <button
              v-if="data.totalPages !== 1"
              :class="data.last ? 'opacity-25' : ''"
              :disabled="data.last"
              class="ann-page-next"
              @click="goToNextPage"
            >
              Next
            </button>
          </div>
        </div> -->
      </div>
      <!-- <div class="hidden pl-20 basis-1/12 xl:block">
        <p class="py-1 text-xl font-normal">
          Date/Time shown in Timezone:
          <span class="font-normal">{{ timezone }}</span>
        </p>
        <div class="flex font-normal">
          <p class="py-2 text-xl">Category:</p>

          <select v-model="store.category" class="pl-10 ml-2 text-black select">
            <option value="">ทั้งหมด</option>
            <option
              v-for="data in category"
              :key="data.id"
              :value="data.categoryId"
              class="text-black"
            >
              {{ data.categoryName }}
            </option>
          </select>
        </div>

        <div></div>
      </div> -->
    </div>
  </div>
</template>

<style scoped></style>
