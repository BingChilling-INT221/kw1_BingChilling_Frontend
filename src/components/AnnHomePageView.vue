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
    <div class="h-auto min-w-full min-h-screen pt-5 lg:px-36 lg:pt-12">
        <p class="hidden text-4xl font-bold lg:block">SIT Announcement System (SAS)</p>
        <p class="flex justify-center text-2xl font-semibold text-center lg:hidden">SIT Announcement System <br> (SAS)
        </p>
        <div v-if="!loading" class="absolute mt-2 mr-2 ">
            <svg class="w-20 h-20 bg-transparent border-2 border-transparent border-opacity-50 rounded-full animate-spin"
                 style="border-right-color: white; border-top-color: white;" viewBox="0 0 24 24"></svg>
        </div>
        <div v-else class="flex flex-col pt-16 lg:flex-row ">
            <div class="flex flex-col h-8 min-w-full lg:hidden">
                <p class="py-1 text-xl font-normal ">Date/Time shown in Timezone: <span class="font-normal">{{
                    timezone
                    }}</span></p>

                <div class="flex flex-row">
                    <p class="w-1/2 my-auto text-xl ">Choose Category:</p>
                    <div class="flex flex-col">
                        <select
                                v-model="store.category"
                                class="w-24 my-auto ml-2 text-black shadow-md shadow-slate-300 ann-category-filter">
                            <option v-for="(data) in category" :key="data.id" :value="data.category_Id"
                                    class="text-black">{{
                                data.categoryName
                                }}
                            </option>
                        </select></div>
                </div>
            </div>
            <br>
            <div class="flex flex-col lg:basis-4/6 ">
                <div class="flex justify-between ">
                    <p class="pl-5 text-2xl font-semibold md:max-h-16 md:min-h-16">Announcement</p>
                    <div v-if="!checkAdmin()" class="flex ">
                        <button class="px-2 py-1 rounded-md ann-button "
                                @click="fetches()">
                            {{ isOpen ? 'Closed announments' : 'Open announments' }}
                        </button>
                        <div :class="isOpen?'bg-green-400':'bg-red-400'" class="w-3 h-3 m-auto rounded-full"></div>
                    </div>
                    <button v-else
                            class="px-2 py-1 rounded-md bg-black2Cus hover:bg-black3Cus ann-button"
                            @click="$router.push({name: 'addannouncement'})">Add
                        Announcement
                    </button>
                </div>

                <div class="min-w-full ">
                    <div class="flex flex-col justify-center text-center ">

                        <p v-if="announces.length<=0" class="flex justify-center text-5xl text-center text-gray-400">
                            No Announcement
                        </p>
                        <div v-for="(announce,index) in announces " v-else class="h-auto">
                            <AnnBox :ann-data="announce" :index="index"></AnnBox>
                        </div>
                    </div>
                </div>

                <div class="flex justify-center py-5 text-2xl">
                    <div class="flex items-center space-x-2">
                        <button>Prev</button>
                        <ul class="flex flex-row space-x-2">
                            <li v-if="store.page-1 >= 0">{{ store.page }}</li>
                            <li>{{ store.page + 1 }}</li>
                            <li>{{ store.page + 2 }}</li>
                        </ul>
                        <button>Next</button>
                    </div>
                </div>
            </div>
            <div class="hidden pl-32 lg:basis-1/3 lg:block">
                <p class="py-1 text-xl font-normal ">Date/Time shown in Timezone: <span class="font-normal">{{
                    timezone
                    }}</span></p>
                <div class="flex justify-between font-normal ">
                    <p class="py-2 text-xl ">Choose Category:</p>
                    <select
                            v-model="store.category"
                            class="pl-10 text-black shadow-md shadow-slate-300 ann-category-filter " required>
                        <option v-for="(data) in category" :key="data.id" :value="data.category_Id"
                                class="text-black">{{
                            data.categoryName
                            }}
                        </option>
                    </select>
                </div>

                <div>


                </div>
            </div>
        </div>

    </div>
    <!-- <div v-else class="flex pt-16">
      <div class="flex flex-col lg:basis-4/6">
        <div class="flex justify-between">
          <p class="pl-5 text-2xl font-semibold md:max-h-16 md:min-h-16">
            Announcement
          </p>
          <div v-if="!checkAdmin()" class="flex">
            <button class="px-2 py-1 rounded-md ann-button" @click="fetches()">
              {{ isOpen ? "Closed announments" : "Open announments" }}
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

        <div class="flex justify-center py-5 text-2xl">
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
      <div class="pl-32 lg:basis-1/3">
        <p class="py-1 text-xl font-normal">
          Date/Time shown in Timezone:
          <span class="font-normal">{{ timezone }}</span>
        </p>
        <div class="flex justify-between font-normal">
          <p class="py-2 text-xl">Choose Category:</p>
          <select
            v-model="store.category"
            class="pl-10 text-black shadow-md shadow-slate-300 ann-category-filter"
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
    </div> -->
  </div>
</template>

<style scoped></style>
