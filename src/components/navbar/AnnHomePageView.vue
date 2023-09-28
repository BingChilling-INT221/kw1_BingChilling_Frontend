<script setup>
import {computed, inject, onMounted, ref, watch} from "vue";
import {useAnnouncerStore} from "@/stores/announcer";
import {fetched_api} from "@/services/api.js";
import AnnBox2 from "../AnnBox2.vue";
import dateTimeBox from "../DateTimeBox.vue";
import timeZoneBox from "../TimeZoneBox.vue";
import Pagination from "../Pagination.vue";
import CategoryBox from "../CategoryBox.vue";

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
  <div class="h-auto min-w-full">
    <div class="mx-6">
      <div
          class="flex items-center justify-center my-2 md:justify-end xl:hidden"
      >
        <dateTimeBox :time="datetime" class="text-sm"></dateTimeBox>
        <timeZoneBox :timezone="timezone" class="text-sm"></timeZoneBox>
      </div>
      <div class="flex flex-col gap-y-2">
        <div class="flex justify-around xl:hidden">
          <CategoryBox/>
          <button
              class="px-4 py-2 text-xs rounded-md ann-button"
              :class="isOpen ? 'bg-green-400' : 'bg-red-400'"
              @click="fetches()"
              v-if="!checkAdmin()"
          >
            {{ isOpen ? "Closed " : "Active " }}
            <span class="hidden md:inline-block">announcement</span>
          </button>
          <div
              v-else
              class="ann-button"
              @click="$router.push({ name: 'addannouncement' })"
          >
            <button
                class="hidden px-2 py-2 rounded-md bg-gray-50 dark:bg-gray-700 md:inline-block"
            >
              Add announcements
            </button>
            <button
                class="fixed bottom-0 right-0 px-2 py-2 rounded-md bg-black2Cus hover:bg-black3Cus md:hidden bg-gray-50 dark:bg-gray-700"
            >
              Add
            </button>
          </div>
        </div>

        <div class="xl:flex xl:flex-row xl:gap-x-24 pt-2 xl:w-full">
          <div class="min-w-full xl:min-w-full">
            <div class="xl:flex xl:flex-row xl:gap-x-5">
              <div
                  class="flex flex-col justify-center text-center gap-y-3 xl:w-full"
              >
                <p
                    v-if="announces.length <= 0"
                    class="flex justify-center text-5xl text-center text-gray-400"
                >
                  No Announcement
                </p>
                <div
                    v-for="(announce, index) in announces"
                    v-else
                    class="xl:w-full h-auto"
                >
                  <AnnBox2
                      :ann-data="announce"
                      :index="index + store.pageSize * store.page"
                  ></AnnBox2>
                </div>
                <Pagination
                    :current="store.page"
                    :first="data.first"
                    :last="data.last"
                    :totalPages="data.totalPages"
                    @changePage="changePage"
                    class="xl:flex xl:justify-center"
                ></Pagination>
              </div>
              <div class="xl:flex xl:flex-col hidden">
                <div class="xl:flex xl:justify-end xl:pb-2">
                  <button
                      class="px-4 py-2 text-xs rounded-md ann-button xl:py-2 xl:text-base"
                      :class="isOpen ? 'bg-green-400' : 'bg-red-400'"
                      @click="fetches()"
                      v-if="!checkAdmin()"
                  >
                    {{ isOpen ? "Closed " : "Active " }}
                    <span class="hidden md:inline-block">announcement</span>
                  </button>
                  <div
                      v-else
                      class="ann-button"
                      @click="$router.push({ name: 'addannouncement' })"
                  >
                    <button
                        class="hidden px-2 py-2 rounded-md bg-gray-50 dark:bg-gray-700 md:inline-block xl:py-2 xl:text-base"
                    >
                      Add announcements
                    </button>
                    <button
                        class="fixed bottom-0 right-0 px-2 py-2 rounded-md bg-black2Cus hover:bg-black3Cus md:hidden bg-gray-50 dark:bg-gray-700"
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div
                    class="flex items-center justify-center my-2 md:justify-end"
                >
                  <dateTimeBox :time="datetime" class="text-sm"></dateTimeBox>
                  <timeZoneBox
                      :timezone="timezone"
                      class="text-sm"
                  ></timeZoneBox>
                </div>
                <div class="flex xl:gap-x-4">
                  <p class="xl:my-auto xl:text-xl">Category:</p>
                  <CategoryBox/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
