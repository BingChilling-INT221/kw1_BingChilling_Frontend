<script setup>
import { computed, inject, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { fetchCateForMod, fetchCreate, fetchUpdate } from "../services/api.js";
import { Quill, QuillEditor } from "@vueup/vue-quill";

const route = useRoute();
const limit = 10000;

const props = defineProps({
  updatePackage: {
    type: Object,
  },
});

const updateCheck = ref(false);
watch(
  () => props.updatePackage,
  (newv) => {
    console.log(JSON.stringify(newv).length);
    if (JSON.stringify(newv).length > 0) {
      updateCheck.value = true;
      updateInit();
    } else {
      console.log("no update");
      updateCheck.value = false;
    }
  }
);

const category = ref([]);
const announcementTitle = ref("");
const categoryId = ref(Number);
const announcementDescription = ref(null);
const publishDate = ref("");
const publishTime = ref("");
const closeDate = ref("");
const closeTime = ref("");
const announcementDisplay = ref("");
const router = useRouter();
const role = inject("role");
const cacheDescription = ref("");

const compObj = computed(() => {
  return {
    announcementTitle: announcementTitle.value,
    announcementDescription: announcementDescription.value,
    newPublishDate: publishDate.value,
    newPublishTime: publishTime.value,
    newCloseDate: closeDate.value,
    newCloseTime: closeTime.value,
    announcementDisplay: announcementDisplay.value,
    categoryId: categoryId.value,
  };
});

let change = ref(false);
watch(
  () => compObj,
  () => {
    if (!updateCheck.value) return;
    change.value = false;
    for (const property in compObj.value) {
      if (compObj.value[property] === undefined) continue;
      if (property === "categoryId") {
        if (
          category.value[compObj.value[property] - 1]?.categoryName !==
          props.updatePackage.categoryId
        ) {
          console.log(
            category.value[compObj.value[property]]?.categoryName,
            props.updatePackage[property]
          );
          change.value = true;
          break;
        }
        continue;
      }
      if (compObj.value[property] !== props.updatePackage[property]) {
        change.value = true;
        break;
      }
    }
  },
  { deep: true }
);

onMounted(async () => {
  try {
    const response = await fetchCateForMod();
    if (response.status === 200) {
      category.value = await response.json();
      console.log(response);

      if (!updateCheck.value) {
        categoryId.value = category.value[0].categoryId;
      } else {
        updateInit();
      }
    }
  } catch (err) {
    console.log(err);
  }
});
const updateInit = () => {
  const indexcategories = category.value.findIndex(
    (c) => c.categoryName == props.updatePackage.categoryId
  );
  announcementTitle.value = props.updatePackage.announcementTitle;
  categoryId.value = category.value[indexcategories]?.categoryId;
  if (cacheDescription.value === "") {
    announcementDescription.value = props.updatePackage.announcementDescription;
  } else {
    announcementDescription.value = cacheDescription.value;
  }
  publishDate.value = props.updatePackage.newPublishDate;
  publishTime.value = props.updatePackage.newPublishTime;
  closeDate.value = props.updatePackage.newCloseDate;
  closeTime.value = props.updatePackage.newCloseTime;
  announcementDisplay.value = props.updatePackage.announcementDisplay;
};

const publishDatePlusTime = computed(() => {
  if (!publishDate.value || !publishTime.value) return null;
  return new Date(`${publishDate.value}T${publishTime.value}:00`).toISOString();
});

const closeDatePlusTime = computed(() => {
  if (!closeDate.value || !closeTime.value) return null;
  return new Date(`${closeDate.value}T${closeTime.value}:00`).toISOString();
});

const checkDisableTime = (date) => {
  if (date === null) return true;
  return date.length !== 10;
};

const comeTime = ref(
  new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
);
const comeDate = ref(new Date().toLocaleDateString("en-Us"));
const sixhour = new Date("August 19, 1975 00:00:00");
sixhour.setHours(sixhour.getHours() + 6);
const eighteenth = new Date("August 19, 1975 00:00:00");
eighteenth.setHours(eighteenth.getHours() + 18);

const compareDates = (d1, d2) => {
  if (!d1 || !d2) {
    return false;
  }
  console.log(d1, d2);
  const date1 = new Date(d1);
  date1.setHours(0, 0, 0, 0);
  const date2 = new Date(d2);
  date2.setHours(0, 0, 0, 0);
  console.log(date1, date2);
  return date1 < date2 ? -1 : date1 > date2 ? 1 : 0;
};
const compareTimes = (t1, t2) => {
  if (!t1 || !t2) {
    return false;
  }
  const date1 = new Date(`1970-01-01 ${t1}`);
  const date2 = new Date(`1970-01-01 ${t2}`);
  return date1 < date2 ? -1 : date1 > date2 ? 1 : 0;
};

const checkPublishDate = () => {
  if (!publishDate.value) {
    publishTime.value = null;
    return true;
  }
  if (publishDate.value.length > 10) {
    return false;
  }
  if (compareDates(publishDate.value, comeDate.value) < 0) {
    alert("Please enter a correct publish date.");
    return false;
  }
  return true;
};
const checkPublishTime = () => {
  if (!publishTime.value && publishDate.value) {
    publishTime.value = sixhour.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }
  if (!publishTime.value) {
    return true;
  }
  if (publishTime.value.length > 5) {
    return false;
  }
  if (
    compareDates(publishDate.value, comeDate.value) === 0 &&
    compareTimes(publishTime.value, comeTime.value) < 0
  ) {
    alert("Please enter a correct publish time.");
    return false;
  }
  return true;
};

const checkCloseDate = () => {
  if (closeDate.value === null || closeDate.value === "") {
    closeTime.value = null;
    return true;
  }
  if (closeDate.value.length > 10) return false;
  if (publishDate.value !== null || publishDate.value !== "") {
    if (compareDates(closeDate.value, publishDate.value) < 0) {
      alert("Please enter correct date format close");
      return false;
    }
  }
  return true;
};
const checkCloseTime = () => {
  if (
    (closeTime.value === null || closeTime.value === "") &&
    closeDate.value !== null &&
    closeDate.value !== ""
  ) {
    closeTime.value = eighteenth.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }
  if (closeTime.value === null || closeTime.value === "") return true;
  if (closeTime.value.length > 5) return false;
  if (
    compareDates(closeDate.value, publishDate.value) === 0 &&
    compareTimes(closeTime.value, publishTime.value) <= 0
  ) {
    alert("Please enter correct time format close");
    return false;
  }
  return true;
};
const errm = ref();
const sendSubmit = async (event) => {
  if (
    !(
      checkPublishDate() &&
      checkPublishTime() &&
      checkCloseDate() &&
      checkCloseTime()
    )
  ) {
    event.preventDefault();
    return;
  }
  event.preventDefault();
  if (announcementDisplay.value) {
    announcementDisplay.value = "Y";
  } else {
    announcementDisplay.value = "N";
  }
  console.log(categoryId.value);
  const sendPackage = {
    announcementTitle: announcementTitle.value,
    announcementDescription: announcementDescription.value,
    announcementDisplay: announcementDisplay.value,
    categoryId: categoryId.value,
  };
  if (publishDatePlusTime.value !== null)
    sendPackage.publishDate = publishDatePlusTime.value;
  if (closeDatePlusTime.value !== null)
    sendPackage.closeDate = closeDatePlusTime.value;
  if (updateCheck.value) {
    try {
      console.log(JSON.stringify(sendPackage));
      const response = await fetchUpdate(sendPackage, route);
      if (response.status === 200) {
        alert("update announcement success");
        await router.push({ name: `${role}homepage` });
      } else {
        console.log(response);
        alert("update announcement fail");
        errm.value = await response.json();
        alert(errm.value.message);
        // console.log(errm.value.message)
      }
    } catch (err) {
      alert(err);
    }
  } else {
    try {
      console.log(JSON.stringify(sendPackage));
      const response = await fetchCreate(sendPackage);
      if (response.status === 200) {
        alert("Create announcement success");
        await router.push({ name: `${role}homepage` });
      } else {
        alert("Create announcement fail");
        errm.value = await response.json();
        alert(errm.value.message);
      }
    } catch (err) {
      alert(err);
    }
  }
};

const countTitleCharac = computed(() => {
  const maxLength = 200;
  if (announcementTitle.value === null) return maxLength;
  return maxLength - (announcementTitle.value.length || 0);
});

const countDesCharac = computed(() => {
  const maxLength = 10000;
  if (announcementDescription.value === null) return maxLength;
  return maxLength - (announcementDescription.value.length || 0);
});

const myEditor = ref();

watch(announcementDescription, (newValue, oldValue) => {
  if (announcementDescription.value.length > 10000) {
    alert("Please enter a correct description.");
    if (oldValue.length < 10000) {
      myEditor.value.setHTML(oldValue);
    } else {
      myEditor.value.setHTML(oldValue.slice(0, 10000));
    }
  }
});
</script>
<template>
  <div class="flex flex-col h-auto md:flex-row">
    <div class="w-full md:w-[80%] mx-auto md:mx-[10%]">
      <div class="mt-5">
        <button class="text-2xl font-bold ann-button" @click="$router.back()">
          <span>&lt;</span> Back
        </button>
        <p class="pt-5 text-5xl font-bold">
          {{ updateCheck ? "Edit" : "Create" }} Announcement
        </p>
      </div>
      <div
        class="px-5 pt-10 pb-2 m-auto mt-5 border-2 rounded-lg bg-whiteCustom md:px-20 dark:bg-blackCustom"
      >
        <form action="" class="w-full" @submit="sendSubmit">
          <div class="flex flex-col md:flex-row">
            <p class="w-full py-2 text-2xl font-bold md:w-1/4">Title</p>
            <input
              v-model="announcementTitle"
              class="w-full ml-2 rounded-md md:w-3/4 md:ml-2 ann-title bg-whitesecondCustom dark:bg-darksecondCustom"
              maxlength="200"
              required
              type="text"
            />
          </div>
          <p class="flex justify-end">Remaining: {{ countTitleCharac }}</p>
          <div class="flex flex-col mt-2 md:flex-row">
            <p class="w-full py-2 text-2xl font-bold md:w-1/4">Category</p>
            <select
              v-model="categoryId"
              class="w-full ml-2 shadow-md bg-whitesecondCustom dark:bg-darksecondCustom md:w-3/4 md:ml-2 shadow-slate-300 ann-category"
              required
            >
              <option
                v-for="data in category"
                :key="data.id"
                :value="data.categoryId"
              >
                {{ data.categoryName }}
              </option>
            </select>
          </div>
          <div class="flex flex-col mt-6 md:flex-row">
            <p class="w-full py-2 text-2xl font-bold md:w-1/4">Publish Date</p>
            <div class="flex w-full space-x-4 md:w-3/4">
              <input
                v-model="publishDate"
                :placeholder="'  ' + comeDate + ''"
                class="w-1/2 py-1 ml-2 border-2 rounded-md bg-whitesecondCustom dark:bg-darksecondCustom md:w-1/4 ann-publish-date"
                type="date"
              />
              <input
                v-model="publishTime"
                :class="checkDisableTime(publishDate) ? 'opacity-50' : ''"
                :disabled="checkDisableTime(publishDate)"
                :placeholder="'  ' + comeTime + ''"
                class="w-1/2 py-1 ml-2 border-2 rounded-md bg-whitesecondCustom dark:bg-darksecondCustom md:w-1/4 ann-publish-time"
                type="time"
              />
            </div>
          </div>
          <div class="flex flex-col mt-6 md:flex-row">
            <p class="w-full py-2 text-2xl font-bold md:w-1/4">Close Date</p>
            <div class="flex w-full space-x-4 md:w-3/4">
              <input
                v-model="closeDate"
                :placeholder="'  ' + comeDate + ''"
                class="w-1/2 py-1 ml-2 border-2 rounded-md bg-whitesecondCustom dark:bg-darksecondCustom md:w-1/4 ann-close-date"
                type="date"
              />
              <input
                v-model="closeTime"
                :class="checkDisableTime(closeDate) ? 'opacity-50' : ''"
                :disabled="checkDisableTime(closeDate)"
                :placeholder="'  ' + comeTime + ''"
                class="w-1/2 py-1 ml-2 border-2 rounded-md bg-whitesecondCustom dark:bg-darksecondCustom md:w-1/4 ann-close-time"
                type="time"
              />
            </div>
          </div>
          <div class="flex flex-col py-2 mt-5 md:flex-row">
            <p class="w-full text-2xl font-bold md:w-1/4">Display</p>
            <div class="flex w-full space-x-4 md:w-3/4">
              <input
                v-model="announcementDisplay"
                class="w-[2%] md:w-[10%] ann-display"
                type="checkbox"
              />
              <label class="m-auto ml-2">Check to show this announcement</label>
            </div>
          </div>
          <p class="py-2 mt-5 text-2xl font-bold">Description</p>
          <QuillEditor
            ref="myEditor"
            v-model:content="announcementDescription"
            class="w-full border-2 rounded-md ann-description"
            contentType="html"
            maxlength="10000"
            theme="snow"
            toolbar="full"
          />

          <p class="flex justify-end">Remaining: {{ countDesCharac }}</p>
          <div class="flex justify-end py-5 space-x-2">
            <button
              :class="change || !updateCheck ? 'bg-blue-500' : 'opacity-40 '"
              :disabled="!change && updateCheck"
              class="px-4 py-1 rounded-md ann-button submit"
            >
              {{ updateCheck ? "edit" : "submit" }}
            </button>
            <button
              class="px-4 py-1 rounded-md bg-whitesecondCustom dark:bg-darksecondCustom ann-button"
              @click="$router.push({ name: `${role}homepage` })"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
