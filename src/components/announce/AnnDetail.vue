<script setup>
import { computed, onMounted, ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAnnouncerStore } from "@/stores/announcer";
import { fetchCountParam } from "@/services/annApi.js";
import {emailverification} from "@/services/verificationapi.js";
import {fetchCate} from '@/services/catApi.js';
import {fetchPreview} from '@/services/annApi.js';
import Eye from "@/components/icons/Eye.vue";
import PreviewFile from "@/components/announce/PreviewFile.vue";
import {useUsersStore} from "@/stores/user";

const queryAnnounce = ref({});
const route = useRoute();
const router = useRouter();
const loading = ref(true);
const store = useAnnouncerStore();
const email = ref("");
const category = ref([]);
const categories = ref([]);
const userStore = useUsersStore();
const isAdminPath = computed(() => {
  // console.log(route.path);
  if (route.path.includes("viewer")) {
    return false;
  }
  return route.path.includes("admin");
});
onMounted(async () => {
  fetchPreviewF();
  if (route.path.includes("admin")) {
    store.setCount(true);
  }
  try {
    const auth = isAdminPath.value;

    const response = await fetchCountParam(route.params.id, store.count, auth);
    if (response.status === 200) {
      queryAnnounce.value = await response.json();
      // console.log(queryAnnounce.value);
      loading.value = false;
    } else if (response.status === 404 || response.status === 400) {
      console.log("404");
      alert("The request page is not availables");
      await router.push(`/admin/announcement/`);
    } else if (response.status === 403) {
      await router.push(`/403`);
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
  return `${newDate.toLocaleDateString("en-GB", options).replace(/,/gi, "") +
    ", " +
    newDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    }`;
};
const preview = ref({});
const fetchPreviewF =async ()=>{
  const response = await fetchPreview(route.params.id);
  preview.value = await response.json();
}
const fetchPreviewMode = ref(false);

const fetchCat = ref(false);
const fetchDate = ref(false);
const fetchSub = ref(false);
watchEffect(() => {
  loading.value = fetchDate.value || fetchCat.value || fetchSub.value;
});


onMounted(async () => {
  try {
    fetchCat.value = true;
    categories.value = await fetchCate();
    fetchCat.value = false;
    store.category = '';
  } catch (err) {
    // alert(err.message);
  }
  
});

const sendSubmit = async (event) => {
  event.preventDefault();
  // console.log(categories.value);
  // console.log(queryAnnounce.announcementCategory);
  const selectedCategory = categories.value.find(category => category.categoryName === queryAnnounce.value.announcementCategory);
  console.log(selectedCategory);
  fetchSub.value = true;
  const sendData = {
    subscribes: [selectedCategory.categoryId],
    email: email.value,
  };
  console.log(sendData);
  try {
    const response = await emailverification(sendData);
    if (response.status === 200) {
      fetchSub.value = false;
      await router.push({name: `verify`});
      console.log(response.tokenOtp);
    }
    email.value = '';
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};


watchEffect(() => {
  if (userStore.token) {
    if (route.path.includes('viewer')) {
      email.value = '';
    } else {
      email.value = userStore.email;
    }
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

</script>

<template>
  {{ category }}
  {{ categories }}
  {{ queryAnnounce.announcementCategory }}
  
  <div class="mx-[10%] w-[80%] pt-10">
    <div class="">
      <button class="text-2xl font-bold ann-button" @click="$router.back()">
        <span>&lt;</span> Back
      </button>
    </div>
    <div v-if="loading" class="flex justify-center min-w-full min-h-full text-center bg-slate-400">
      <div class="absolute mt-2 mr-2">
        <svg class="w-20 h-20 bg-transparent border-2 border-transparent border-opacity-50 rounded-full animate-spin"
          style="border-right-color: white; border-top-color: white" viewBox="0 0 24 24"></svg>
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
            <div :class="queryAnnounce.announcementDisplay === 'Y'
                ? 'bg-green-500'
                : 'bg-red-500'
              " class="flex justify-center w-24 h-10 p-2 py-3 bg-green-500 rounded-lg ann-display sm:w-28 sm:h-12">
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

        <div class="py-5 ann-category flex justify-between">
          <a class="bg-[#628FB8] px-5 text-sm rounded-lg py-1 my-auto" href="#">{{
            queryAnnounce.announcementCategory
          }}</a>

          <div class="flex justify-end" v-show="isAdminPath">
            <!-- The button to open modal -->
            <label class="btn btn-sm" for="my_modal_admin">Subscribe</label>
            <!-- The modal -->
            <input id="my_modal_admin" class="modal-toggle" type="checkbox" />
            <div class="modal">
              <div class="modal-box bg-white text-black">
                <form action="" @submit.prevent="sendSubmit">
                  <label class="block mb-2" for="email">Email:</label>
                  <input v-model="email" class="w-full p-2 border rounded" placeholder="Enter your email" required
                    type="email" />
                  <div class="modal-action">
                    <button class="btn submit text-white bg-bgNav" type="submit">Subscribe</button>
                    <label class="btn bg-bgNav" for="my_modal_admin">Close</label>
                  </div>
                </form>
              </div>
            </div>
          </div>


        </div>
        <div class=" font-bold border-2 rounded-lg">
          <!-- <h1 class="pl-5">Description:</h1> -->
          <div class="h-auto">
            <p class="p-5 pl-5 ann-description ql-editor" v-html="queryAnnounce.announcementDescription"></p>
          </div>
        </div>
        <div class="flex justify-end">
          <button v-show="isAdminPath" class="px-2 py-1 mt-2 ml-6 border-2 rounded-lg ann-button hover:bg-gray-300"
            @click="
              $router.push({
                name: 'editannouncement',
                params: { id: queryAnnounce.id },
              })
              ">
            edit
          </button>
        </div>
        <div class="flex justify-end" v-show="!isAdminPath">
          <div class="flex justify-end pt-2 sub">
            <!-- The button to open modal -->
            <label class="btn btn-sm" for="my_modal_nonadmin">Subscribe</label>
            <!-- The modal -->
            <input id="my_modal_nonadmin" class="modal-toggle" type="checkbox" />
            <div class="modal">
              <div class="modal-box bg-white text-black">
                <form action="" @submit.prevent="sendSubmit">
                  <label class="block mb-2" for="email">Email:</label>
                  <input v-model="email" class="w-full p-2 border rounded" placeholder="Enter your email" required
                    type="email" />
                  <div class="modal-action">
                    <button class="btn submit text-white bg-bgNav" type="submit">Subscribe</button>
                    <label class="btn bg-bgNav" for="my_modal_nonadmin">Close</label>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
    <div>attachment</div>
      <div v-for="file in preview">
<!--        {{file.fileName}}-->
<!--        {{file.fileType}}-->
<!--        {{file.fileUrl}}-->
        <preview-file :preview-name="file.fileName" :preview-type="file.fileType" :preview-url="file.fileUrl"></preview-file>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
