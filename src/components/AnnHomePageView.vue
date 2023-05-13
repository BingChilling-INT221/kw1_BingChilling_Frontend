<script setup>
import { computed, inject, onMounted, ref } from "vue";
import AnnBox from "@/components/AnnBox.vue";
import { useAnnouncerStore } from "@/stores/announcer";

const store = useAnnouncerStore();
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const role = inject("role");
const checkAdmin = () => {
  return role === "admin";
};
const announces = ref([]);
const category = ref([]);
const isOpen = ref(false);
const fetchCat = ref(false);
const fetchDate = ref(false);
const loading = computed(() => {
  return fetchCat.value && fetchDate.value;
});


const wantPage = ref(10)


onMounted(async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}categories`);
    if (response.status === 200) {
      fetchCat.value = true;
      category.value = await response.json();
      console.log(response);
    }
  } catch (err) {
    console.log(err);
  }
});


onMounted(async () => {
  if (checkAdmin()) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}announcements`
      );

      if (response.status === 200) {
        fetchDate.value = true;
        announces.value = await response.json();
        if (announces.value.length === 0) {
          notFound.value = true;
        }
      }
    } catch (err) {
      alert("ยังหาข้อมูลไม่พบโปรดรีเฟรชหน้าอีกครั้งครับ");
      window.location.reload();
      console.log(err);
    }
  } else {
    await fetches();
  }
});

const fetches = async () => {
  if (!isOpen.value) {
    store.setMode("active");
    isOpen.value = !isOpen.value;
  } else {
    store.setMode("closed");
    isOpen.value = !isOpen.value;
  }
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}announcements/pages?mode=${
        store.mode
      }&page=${store.page}&size=${store.pageSize}`
    );

    if (response.status === 200) {
      fetchDate.value = true;
      announces.value = await response.json();
      announces.value = announces.value.content;

      if (announces.value.length === 0) {
        notFound.value = true;
      }
    }
  } catch (err) {
    alert("ยังหาข้อมูลไม่พบโปรดรีเฟรชหน้าอีกครั้งครับ");
    window.location.reload();
    console.log(err);
  }
};

const fetched = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}announcements/pages?mode=${
        store.mode
      }&page=${store.page}&size=${store.pageSize}`
    );

    if (response.status === 200) {
      fetchDate.value = true;
      announces.value = await response.json();
      announces.value = announces.value.content;

      if (announces.value.length === 0) {
        notFound.value = true;
      }
    }
  } catch (err) {
    alert("ยังหาข้อมูลไม่พบโปรดรีเฟรชหน้าอีกครั้งครับ");
    window.location.reload();
    console.log(err);
  }
};


const goToPreviousPage = () => {
  if (store.page > 0) {
    store.setPage(store.page - 1);
    fetched()
  }
}

const goToNextPage = () => {
  store.setPage(store.page + 1);
  fetched()
}


</script>

<template>
  <div class="min-w-full min-h-screen h-auto px-36 pt-12">
    <p class="text-4xl font-bold">SIT Announcement System (SAS)</p>
    <div v-if="!loading" class="absolute mt-2 mr-2">
      <svg
        class="w-20 h-20 bg-transparent border-2 border-transparent border-opacity-50 rounded-full animate-spin"
        style="border-right-color: white; border-top-color: white"
        viewBox="0 0 24 24"
      ></svg>
    </div>
    <div v-else class="flex pt-16">
      <div class="lg:basis-4/6 flex flex-col">
        <div class="flex justify-between">
          <p class="text-2xl font-semibold pl-5 md:max-h-16 md:min-h-16">
            Announcement
          </p>
          <div v-if="!checkAdmin()" class="flex">
            <button class="px-2 py-1 rounded-md ann-button" @click="fetches()">
              {{ isOpen ? "Closed announments" : "Open announments" }}
            </button>
            <div
              :class="isOpen ? 'bg-green-400' : 'bg-red-400'"
              class="w-3 h-3 rounded-full m-auto"
            ></div>
          </div>
          <button
            v-else
            class="px-2 py-1 bg-black2Cus hover:bg-black3Cus rounded-md ann-button"
            @click="$router.push({ name: 'addannouncement' })"
          >
            Add Announcement
          </button>
        </div>

        <div class="min-w-full">
          <div class="flex flex-col justify-center text-center">
            <p
              v-if="announces.length <= 0"
              class="flex justify-center text-5xl text-center text-gray-400"
            >
              No Announcement
            </p>
            <div v-for="(announce, index) in announces" v-else class="h-auto">
              <AnnBox :ann-data="announce" :index="index"></AnnBox>
            </div>
          </div>
        </div>

        <div class="py-5 flex justify-center text-2xl">
          <div class="flex items-center space-x-2">
            <button @click="goToPreviousPage" :disabled="store.page === 0">
              Prev
            </button>
            <ul class="flex flex-row space-x-2">
            <li v-for="pageNumber in wantPage" :key="pageNumber" 
            :class="{ 'text-red-500': store.page === pageNumber - 1}">
            {{ pageNumber }}
            </li>
            </ul>
            <button @click="goToNextPage">Next</button>
          </div>
        </div>
      </div>
      <div class="lg:basis-1/3 pl-32">
        <p class="py-1 text-xl font-normal">
          Date/Time shown in Timezone:
          <span class="font-normal">{{ timezone }}</span>
        </p>
        <div class="flex font-normal justify-between">
          <p class="py-2 text-xl">Choose Category:</p>
          <select
            v-model="store.category"
            class="text-black shadow-md shadow-slate-300 ann-category-filter pl-10"
            required
          >
            <option
              v-for="data in category"
              :key="data.id"
              :value="data.category_Id"
              class="text-black"
            >
              {{ data.categoryName }}
            </option>
          </select>
        </div>

        <div>
          <!--                    <p>Top Announcement</p>-->
          <!--                    <div class="w-full">-->
          <!--                        <div class="flex flex-col justify-center text-center ">-->

          <!--                            <div v-for="(announce,index) in announces ">-->
          <!--                                <div v-if="index<5 &&announce.announcementDisplay === 'Y'" class="w-full">-->
          <!--                                    <p>{{ announce.announcementTitle }}</p>-->
          <!--                                    <p>{{ announce.publishDate }}</p>-->
          <!--                                    <p>view</p>-->
          <!--                                </div>-->

          <!--                            </div>-->
          <!--                        </div>-->
          <!--                    </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
