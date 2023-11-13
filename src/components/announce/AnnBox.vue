<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { fetchDelete } from "@/services/annApi.js";
import Eye from "../icons/Eye.vue";
import { useAnnouncerStore } from "@/stores/announcer";

const route = useRoute();
const router = useRouter();

const store = useAnnouncerStore();

const isAdminPath = computed(() => {
  if (route.path.includes("viewer")) {
    // console.log("viwer", route.path)
    return false;
  }
  console.log(route.path);
  if (route.path.includes("admin")) {
    // console.log("admin", route.path)
    return true;
  }

  return false;
});

const props = defineProps({
  annData: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
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
const printError = (err) => {
  let message = "";
  for (const i in err.detail) {
    message += `${JSON.stringify(err.detail[i])}\n`;
  }
  // alert(message);
};
const deleteAnnouncement = async (id) => {
  if (confirm("Are you sure you want to delete this announcement?") === false) {
    return;
  }
  try {
    const response = await fetchDelete(id);
    if (response.status === 200) {
      alert("Announcement deleted");
      window.location.reload();
    } else if (response.status === 404 || response.status === 400) {
      const errorResponse = await response.json();
      alert(errorResponse.message);
      window.location.reload();
    } else {
      const errorResponse = await response.json();
      printError(errorResponse);
    }
  } catch (err) {
    console.log(err);
  }
};

const padStart = (number, length) => {
  let str = "" + number;
  while (str.length < length) {
    str = "0" + str;
  }
  return str;
};

const isClosed = computed(() => {
  return store.mode === "close";
});
const role = computed(() => {
  // console.log(route.path)
  if (route.path.includes("viewer")) {
    return "viewer";
  }

  if (route.path.includes("admin")) {
    return "admin";
  }
  return "user";
});
const seeDetail = (env) => {
  env.preventDefault();
  // console.log(role.value, "role")
  // console.log(route.path, "route.path")
  // console.log(`${role.value}announcementdetail`)
  router.push({
    name: `${role.value}announcementdetail`,
    params: { id: `${props.annData.id}` },
  });
};
</script>

<template>
  <div v-if="!isAdminPath" class="xl:w-full">
    <div
      :class="isAdminPath ? 'cursor-default' : 'cursor-pointer'"
      class="xl:w-full w-72 max-h-full border-[1px] rounded-xl border-blackCustom dark:border-whiteCustom m-auto"
      @click="seeDetail"
    >
      <div class="ml-2 pt-[0.5rem]">
        <div class="flex flex-row">
          <div class="flex w-48 text-xs gap-x-2 xl:text-lg">
            No. {{ padStart(index + 1, 2) }}
            <div
              v-show="isAdminPath"
              class="flex gap-x-[0.15rem] xl:gap-x-[0.5rem]"
            >
              <Eye />
              {{ annData.viewCount }}
            </div>
          </div>
          <div v-if="isAdminPath" class="">
            owner:{{ annData.announcementOwner }}
          </div>
          <div class="xl:flex xl:justify-end xl:w-full xl:pr-5">
            <div
              class="rounded-lg border-2 border-white w-20 h-full text-[0.7rem] xl:text-lg xl:h-9 xl:w-28 xl:pt-[0.15rem]"
            >
              <p class="">{{ annData.announcementCategory }}</p>
            </div>
          </div>
        </div>
        <div class="flex gap-x-[4.2rem] pt-[0.5rem]">
          <div
            :class="{ 'pb-5': !isAdminPath }"
            class="flex text-left w-44 xl:text-lg xl:w-full"
          >
            <p>{{ annData.announcementTitle }}</p>
          </div>
          <div v-if="isAdminPath" class="xl:w-full">
            <div class="xl:flex xl:justify-end xl:w-full xl:pr-5">
              <div
                :class="
                  annData.announcementDisplay === 'Y'
                    ? 'bg-green-500'
                    : 'bg-red-500'
                "
                class="w-6 rounded-xl xl:w-14 xl:text-xl"
              >
                <p class="text-black">{{ annData.announcementDisplay }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col pt-[0.2rem]">
          <div class="flex">
            <div v-if="isAdminPath" class="text-left">
              <p class="text-xs text-gray-400 xl:text-xl ann-publish-date">
                Publishdate:
                {{
                  changeTime(annData.publishDate) !== null
                    ? changeTime(annData.publishDate)
                    : "-"
                }}
              </p>
            </div>
          </div>
          <div class="flex flex-row justify-between">
            <div v-if="isClosed || isAdminPath">
              <p class="pb-1 text-xs text-gray-400 xl:text-xl ann-close-date">
                Close Date:
                {{
                  changeTime(annData.closeDate) !== null
                    ? changeTime(annData.closeDate)
                    : "-"
                }}
              </p>
            </div>
            <div v-show="isAdminPath" class="flex">
              <button
                class="ml-2 text-xs font-medium rounded-lg xl:text-xl hover:bg-green-500 ann-button"
                @click="seeDetail"
              >
                view
              </button>
              <button
                class="pr-2 ml-2 text-xs font-medium rounded-lg xl:text-xl hover:bg-red-500 ann-button"
                @click="deleteAnnouncement(annData.id)"
              >
                delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div v-if="isAdminPath"> -->
  </div>
  <th v-if="isAdminPath" class="px-6 py-4 whitespace-nowrap" scope="row">
    {{ index + 1 }}
  </th>
  <td v-if="isAdminPath" class="px-6 py-4 ann-username">
    {{ annData.announcementTitle }}
  </td>
  <td v-if="isAdminPath" class="px-6 py-4 ann-name">
    {{ annData.announcementCategory }}
  </td>
  <td v-if="isAdminPath" class="px-6 py-4 ann-email">
    {{
      changeTime(annData.publishDate) !== null
        ? changeTime(annData.publishDate)
        : "-"
    }}
  </td>
  <td v-if="isAdminPath" class="px-6 py-4 ann-role">
    {{
      changeTime(annData.closeDate) !== null
        ? changeTime(annData.closeDate)
        : "-"
    }}
  </td>
  <td v-if="isAdminPath" class="px-6 py-4 text-center ann-created-on">
    {{ annData.announcementDisplay }}
  </td>
  <td v-if="isAdminPath" class="px-6 py-4 ann-updated-on">
    {{ annData.announcementOwner }}
  </td>
  <td v-if="isAdminPath" class="px-6 py-4 text-center ann-updated-on">
    {{ annData.viewCount }}
  </td>
  <td v-if="isAdminPath" class="px-6 py-4 text-right">
    <div class="inline-flex">
      <button
        class="px-4 py-2 rounded-l bg-gray-50 dark:bg-gray-700 ann-button"
        @click="seeDetail"
      >
        view
      </button>
      <button
        class="px-4 py-2 rounded-r bg-gray-50 dark:bg-gray-700 ann-button"
        @click="deleteAnnouncement(annData.id)"
      >
        delete
      </button>
    </div>
  </td>
  <!-- </div> -->
</template>

<style scoped></style>
