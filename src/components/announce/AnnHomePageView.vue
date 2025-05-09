<script setup>
import {computed, inject, onMounted, ref, watch, watchEffect, onBeforeMount} from "vue";
import {useAnnouncerStore} from "@/stores/announcer";
import {useUsersStore} from "@/stores/user";
import {fetched_api} from "@/services/annApi.js";
import {useRoute, useRouter} from "vue-router";
import {fetchCate} from '@/services/catApi.js';
import AnnBox2 from "./AnnBox.vue";
import dateTimeBox from "./DateTimeBox.vue";
import timeZoneBox from "./TimeZoneBox.vue";
import Pagination from "./Pagination.vue";
import CategoryBox from "./CategoryBox.vue";
import {emailverification} from "@/services/verificationapi.js";

const route = useRoute();
const router = useRouter();
const store = useAnnouncerStore();
const userStore = useUsersStore();
// เวลาและ Time zone
const datetime = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
}).format();
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
// เวลาและ Time zone
const loading = inject("loading");

const announces = ref([]);
const data = ref({});
const category = ref([]);
const isOpen = computed(() => {
  return store.mode === "active";
});
const fetchCat = ref(false);
const fetchDate = ref(false);
const fetchSub = ref(false);
watchEffect(() => {
  loading.value = fetchDate.value || fetchCat.value || fetchSub.value;
});
const notFound = ref(false);

const isAdminPath = computed(() => {
  if (route.path.includes('viewer')) {
    // console.log(route.path, "viwer")
    return false
  }
  if (route.path.includes('admin')) {
    // console.log(route.path, "admin")
    return true
  }
  // console.log(route.path, "free")
  return false
});
watch(
    () => store.category,
    async () => {
      store.page = 0;
      await fetched();
    }
);


const checkedCategories = ref([]);
onMounted(async () => {
  try {
    fetchCat.value = true;
    category.value = await fetchCate();
    fetchCat.value = false;
    store.category = '';
  } catch (err) {
    // alert(err.message);
  }
});

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
  const auth = isAdminPath.value;
  // console.log(auth, "auth");
  let role;
  if (route.path.includes("viewer")) {
    role = "user";
    // console.log(role, "role");
  }
  const response = await fetched_api(
      role,
      store.category,
      store.mode,
      store.page,
      store.pageSize,
      auth
  );
  if (response.status === 200) {
    console.log(response.status, "status");
    fetchDate.value = true;
    data.value = await response.json();
    fetchDate.value = false;
    // console.log(data.value, "data");
    announces.value = data.value.content;
    if (announces.value.length === 0) {
      notFound.value = true;
    }
  } else if (response.status === 404) {
    notFound.value = true;
  } else if (response === 401) {
    userStore.logout();
  }
};

// pagination
const changePage = (page) => {
  // console.log(page);
  store.setPage(page);
  fetched();
};

const email = ref("");
watchEffect(() => {
  if (userStore.token) {
    email.value = userStore.email;
  } else {
    email.value = "";
  }
});

const isLogin = ref(!!userStore.token);


onMounted(async () => {
  userStore.recall();
});

watchEffect(() => {
  isLogin.value = !!userStore.token;
});


const sendSubmit = async (event) => {
  event.preventDefault();
  fetchSub.value = true;
  const sendData = {
    subscribes: checkedCategories.value,
    email: email.value,
  };
  try {
    const response = await emailverification(sendData);

    if (response.status === 200) {
      fetchSub.value = false;
      await router.push({name: `verify`});
      console.log(response.tokenOtp);
    }
    checkedCategories.value = [];
    email.value = '';
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};


// pagination
onMounted(async () => {
  store.setPage(0);
  store.setMode("active");
  await fetched();
})



</script>

<template>
  <div class="min-w-full min-h-full">
    <div v-if="!isAdminPath" class="mx-6">
      <div class="flex items-center justify-center my-2 md:justify-end xl:hidden">
        <dateTimeBox :time="datetime" class="text-sm"></dateTimeBox>
        <timeZoneBox :timezone="timezone" class="text-sm"></timeZoneBox>
      </div>
      <div class="flex flex-col gap-y-2">
        <div class="flex justify-around xl:hidden">
          <CategoryBox/>
          <button v-if="!isAdminPath" :class="isOpen ? 'bg-green-400' : 'bg-red-400'"
                  class="px-4 py-2 text-xs rounded-md ann-button" @click="fetches()">
            {{ isOpen ? "Closed " : "Active " }}
            <span class="hidden md:inline-block">announcement</span>
          </button>
          <div v-else class="ann-button" @click="$router.push({ name: 'addannouncement' })">
            <button class="hidden px-2 py-2 rounded-md bg-gray-700 md:inline-block">
              Add announcements
            </button>
            <button
                class="fixed bottom-0 right-0 px-2 py-2 rounded-md bg-black2Cus hover:bg-black3Cus md:hidden bg-gray-700">
              Add
            </button>
          </div>
          
          

        </div>

        <div class="pt-2 xl:flex xl:flex-row xl:gap-x-24 xl:w-full">
          <div class="min-w-full xl:min-w-full">
            <div class="xl:flex xl:flex-row xl:gap-x-5">
              <div class="flex flex-col justify-center text-center gap-y-3 xl:w-full">
                <p v-if="announces.length <= 0" class="flex justify-center text-5xl text-center text-gray-400">
                  No Announcement
                </p>
                <div v-for="(announce, index) in announces" v-else class="h-auto xl:w-full">
                  <AnnBox2 :ann-data="announce" :index="index + store.pageSize * store.page"></AnnBox2>
                </div>
                <Pagination :current="store.page" :first="data.first" :last="data.last" :totalPages="data.totalPages"
                            class="xl:flex xl:justify-center" @changePage="changePage"></Pagination>
              </div>
              <div class="hidden xl:flex xl:flex-col">
                <div class="xl:flex xl:justify-end xl:pb-2">
                  <button v-if="!isAdminPath" :class="isOpen ? 'bg-green-400' : 'bg-red-400'"
                          class="px-4 py-2 text-xs rounded-md ann-button xl:py-2 xl:text-base" @click="fetches()">
                    {{ isOpen ? "Closed " : "Active " }}
                    <span class="hidden md:inline-block">announcement</span>
                  </button>
                  <div v-else class="ann-button" @click="$router.push({ name: 'addannouncement' })">
                    <button
                        class="hidden px-2 py-2 rounded-md bg-gray-700 md:inline-block xl:py-2 xl:text-base">
                      Add announcements
                    </button>
                    <button
                        class="fixed bottom-0 right-0 px-2 py-2 rounded-md bg-black2Cus hover:bg-black3Cus md:hidden bg-gray-700">
                      Add
                    </button>
                  </div>
                </div>
                <div class="flex items-center justify-center my-2 md:justify-end">
                  <dateTimeBox :time="datetime" class="text-sm"></dateTimeBox>
                  <timeZoneBox :timezone="timezone" class="text-sm"></timeZoneBox>
                </div>
                <div class="flex xl:gap-x-4">
                  <p class="xl:my-auto xl:text-xl">Category:</p>
                  <CategoryBox/>
                </div>

                <div class="flex justify-end pt-2 sub">
                  <!-- The button to open modal -->
                  <label class="btn bg-bgNav border-none text-white" for="my_modal_6">Subscribe</label>
                  <!-- The modal -->
                  <input id="my_modal_6" class="modal-toggle" type="checkbox"/>
                  <div class="modal">
                    <div class="modal-box bg-white text-black">
                      <form action="" @submit.prevent="sendSubmit">
                        <div class="flex space-x-5 justify-center ">
                          <label v-for="datas in category" :key="datas.id" class="flex items-center">
                            <input :id="'category' + datas.id" v-model="checkedCategories" :value="datas.categoryId"
                                   class="mr-2 " type="checkbox"/>
                            <span>{{ datas.categoryName }}</span>
                          </label>
                        </div>
                        <label class="block mb-2" for="email">Email:</label>
                        <input v-model="email" class="w-full p-2 border rounded"
                               placeholder="Enter your email" required type="email"/>
                        <div class="modal-action">
                          <button class="btn submit text-white bg-bgNav" type="submit">Subscribe</button>
                          <label class="btn  bg-white border-0 hover:border-2" for="my_modal_6">Close</label>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div v-else class="h-full min-w-full pt-2 ">
      <div class="pt-2 text-4xl text-center ann-title">
        <p>Announcements</p>
      </div>
      <div class="flex justify-between">
        <div class="flex">
          <dateTimeBox :time="datetime" class="text-sm"></dateTimeBox>
          <timeZoneBox :timezone="timezone" class="text-sm"></timeZoneBox>
        </div>
        <div class="flex pr-2">
          <div class="ann-button" @click="$router.push({ name: 'addannouncement' })">
            <button class="hidden px-2 py-2 rounded-md bg-bgNav md:inline-block">
              Add announcements
            </button>
          </div>
        </div>
      </div>
      <p v-if="announces.length <= 0" class="flex justify-center text-5xl text-center text-gray-400">
        No Announcement
      </p>
      <div v-else class="overflow-x-auto w-72 sm:w-[720px] xl:w-full">
        <table class=" text-left mb-0 w-72 xl:w-full">
          <thead class="text-xs">
          <tr>
            <th class="px-6 py-3 text-lg" scope="col">No.</th>
            <th class="px-6 py-3 text-lg" scope="col">Title</th>
            <th class="px-6 py-3 text-lg" scope="col">Category</th>
            <th class="px-6 py-3 text-lg" scope="col">Publish Date</th>
            <th class="px-6 py-3 text-lg" scope="col">Close Date</th>
            <th class="px-6 py-3 text-lg text-center" scope="col">Display</th>
            <th class="px-6 py-3 text-lg" scope="col">Owner</th>
            <th class="px-6 py-3 text-lg text-center" scope="col">Views</th>
            <th class="px-6 py-3 text-lg text-center" scope="col">
              Action
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(announcez, index) in announces">
            <AnnBox2 :ann-data="announcez" :index="index + store.pageSize * store.page"></AnnBox2>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sub {
  z-index: 20;
}

</style>
