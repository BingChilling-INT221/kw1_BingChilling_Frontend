<script setup>
import { inject, onMounted, ref, computed } from "vue";
import { useAnnouncerStore } from "../stores/announcer.js";

const announce = ref([]);
const notFound = ref(false);
const role = inject("role");
const loading = ref(true);
const selectedCategory = props.selectedCategory;
const announcerStore = useAnnouncerStore();

const props = defineProps({
  selectedCategory: {
    type: String,
  },
});



onMounted(async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}announcements`
    );

    if (response.status === 200) {
      announce.value = await response.json();
      loading.value = false;
      if (announce.value.length === 0) {
        notFound.value = true;
      }
    }
  } catch (err) {
    alert("ยังหาข้อมูลไม่พบโปรดรีเฟรชหน้าอีกครั้งครับ");
    window.location.reload();
    console.log(err);
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
const deleteAnnouncement = async (id) => {
  if (confirm("Are you sure you want to delete this announcement?") === false) {
    return;
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}announcements/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      alert("Announcement deleted");
      window.location.reload();
    } else if (response.status === 404 || response.status === 400) {
      console.log("404");
      alert("The request page is not available");
    } else {
      console.log("Something went wrong");
    }
  } catch (err) {
    console.log(err);
  }
};
</script>

<template>
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
  <div v-else class="">
    <p
      v-if="notFound"
      class="flex justify-center text-5xl text-center text-gray-400"
    >
      No Announcement
    </p>
    <div
      v-for="(data, index) in announce"
      v-else
      :key="data.id"
      class="pb-5 ann-item"
    >
      <div class="flex h-auto p-3 m-auto bg-white rounded-md">
        <div
          class="text-black w-[8%] flex break-all items-center justify-center border-r-2 font-semibold"
        >
          No.{{ index + 1 }}
        </div>
        <div class="h-full pl-4 w-[92%]">
          <div class="flex justify-between font-bold">
            <p class="w-4/5 pt-1 text-xl text-black break-words ann-title">
              {{ data.announcementTitle }}
            </p>

            <div class="">
              <button
                class="px-2 py-1 ml-2 text-black rounded-lg hover:bg-green-500 hover:text-white ann-button"
                @click="
                  $router.push({
                    name: `${role}announcementdetail`,
                    params: { id: data.id },
                  })
                "
              >
                view
              </button>
              <button
                v-show="role === 'admin'"
                class="px-2 py-1 ml-2 text-black rounded-lg hover:bg-red-500 hover:text-white ann-button"
                @click="deleteAnnouncement(data.id)"
              >
                delete
              </button>
            </div>
          </div>
          <div class="flex mt-2">
            <p class="pt-1 text-[#4E6FE2] font-bold ann-publish-date">
              Publishdate:
              {{
                changeTime(data.publishDate) !== null
                  ? changeTime(data.publishDate)
                  : "-"
              }}
            </p>
            <p class="pl-20 pt-1 text-[#A649A2] font-bold ann-close-date">
              Close Date:
              {{
                changeTime(data.closeDate) !== null
                  ? changeTime(data.closeDate)
                  : "-"
              }}
            </p>
          </div>
          <div class="flex justify-between mt-4">
            <div
              class="text-white bg-[#628FB8] px-5 text-sm rounded-lg py-1 ann-category"
            >
              {{ data.announcementCategory }}
            </div>
            <div
              :class="
                data.announcementDisplay === 'Y' ? 'bg-green-500' : 'bg-red-500'
              "
              class="flex justify-center w-24 text-center text-white bg-green-500 rounded-lg ann-display"
            >
              {{ data.announcementDisplay }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="py-5 flex justify-center text-2xl">
        <div class="flex items-center space-x-2">
            <button>Prev</button>
            <ul class="flex flex-row space-x-2">
                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ul>
            <button>Next</button>
        </div>
    </div>
    
  </div>
</template>

<style scoped></style>
