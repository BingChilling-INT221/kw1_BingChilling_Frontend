<script setup>
import {computed, onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";

const route = useRoute();

const props = defineProps(
    {
      updatePackage: {
        type: Object,
      }
    }
)

const updateCheck = ref(false)
watch(() => props.updatePackage, (newv) => {
  console.log(newv)
  if (JSON.stringify(newv).length > 0) {
    updateCheck.value = true
    updateInit();
  } else {
    updateCheck.value = false
  }
})

const category = ref([])
const announcementTitle = ref("")
const categoryId = ref(Number)
const announcementDescription = ref("")
const publishDate = ref("")
const publishTime = ref("")
const closeDate = ref("")
const closeTime = ref("")
const announcementDisplay = ref("")
const checkDate = /^(0?[1-9]|[12]\d|3[01])\/(0?[1-9]|1[0-2])\/(19|20)\d{2}$/g
const checkTime = /([01]?[0-9]|2[0-3]):[0-5][0-9]?/g
const router = useRouter()
const updateInit = () => {
  announcementTitle.value = props.updatePackage.announcementTitle
  categoryId.value = props.updatePackage.categoryId
  announcementDescription.value = props.updatePackage.announcementDescription
  publishDate.value = props.updatePackage.newPublishDate
  publishTime.value = props.updatePackage.newPublishTime
  closeDate.value = props.updatePackage.newCloseDate
  closeTime.value = props.updatePackage.newCloseTime
  announcementDisplay.value = props.updatePackage.announcementDisplay
}

const compObj = computed(() => {
  return {
    "announcementTitle": announcementTitle.value,
    "announcementDescription": announcementDescription.value,
    "newPublishDate": publishDate.value,
    "newPublishTime": publishTime.value,
    "newCloseDate": closeDate.value,
    "newCloseTime": closeTime.value,
    "announcementDisplay": announcementDisplay.value,
    "categoryId": categoryId.value
  }
})
let change = ref(false)
watch(() => compObj, () => {
  if (!updateCheck.value) return
  change.value = false
  for (const property in compObj.value) {
    if (compObj.value[property] !== props.updatePackage[property]) {

      change.value = true;
      break;
    }
  }
}, {deep: true})
onMounted(async () => {
  try {
    const result = await fetch(
        `http://intproj22.sit.kmutt.ac.th:8080/kw1/api/categories`
    );
    if (result.status === 200) {
      const response = await result.json();
      category.value = response;
      categoryId.value = category.value[0].category_Id
    }
  } catch (err) {
    console.log(err);
  }
})


const changeStringToDate = (date) => {
  if (!date) return null
  let [day, month, year] = date.split("/");
  if (day === undefined || month === undefined || year === undefined) return null
  if (day > 31 || month > 12 || day < 1 || month < 1) return null

  if (year.length === 2) year = `20${year}`

  if (month === 2 && day > checkFeb(year)) return null
  if (month.length === 1) month = `0${month}`
  if (day.length === 1) day = `0${day}`
  if (day.length < 2 || month.length < 2 || year.length < 4) return null

  return `${year}-${month}-${day}`
};


const changeStringToTime = (time) => {
  if (!time) return null
  console.log(time)
  let [hour, minute] = time.split(":");
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return null
  if (hour === undefined || minute === undefined) return null
  if (hour.length === 1) hour = `0${hour}`
  if (minute.length === 1) minute = `0${minute}`
  if (hour.length < 2 || minute.length < 2) return null
  return `${hour}:${minute}`
};


const publishDatePlueTime = computed(() => {
  if (!publishDate.value || !publishTime.value) return null
  if (publishTime.value.length < 5) return null
  const time = changeStringToTime(publishTime.value)
  const date = changeStringToDate(publishDate.value)
  if (!time || !date) return null
  return new Date(`${date}T${time}:00`).toISOString()
});


const closeDatePlueTime = computed(() => {
  if (!closeDate.value || !closeTime.value) return null
  if (closeTime.value.length < 5) return null
  const time = changeStringToTime(closeTime.value)
  const date = changeStringToDate(closeDate.value)
  if (!time || !date) return null
  return new Date(`${date}T${time}:00`).toISOString()
});


const checkFeb = (year) => {
  if (year % 4 === 0) {
    if (year % 100 === 0) {
      if (year % 400 === 0) {
        return 29
      }
      return 28
    }
    return 29
  }
  return 28
}


const comeTime = new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", hour12: false})
const comeDate = new Date().toLocaleDateString("en-GB")


const isDateFormat = (date) => {
  if (!checkDate.test(date)) {
    alert("Please enter correct date format")
    return false
  }
  return true
}

const isTimeFormat = (time) => {
  if (!checkTime.test(time)) {
    alert("Please enter correct time format")
    return false
  }
  return true
}

const sendSubmit = async (event) => {
  console.log(event)
  if (publishDate.value !== "") {
    if (isDateFormat(publishDate.value) === false) return false

  }
  if (publishTime.value !== "") {
    if (isTimeFormat(publishTime.value) === false) return false
  }
  if (closeDate.value !== "") {
    if (isDateFormat(closeDate.value) === false) return false
  }
  if (closeTime.value !== "") {
    if (isTimeFormat(closeTime.value) === false) return false
  }
  if (publishDate.value !== "" && publishTime.value !== "" && closeDate.value !== "" && closeTime.value !== "") {
    if (publishDatePlueTime.value >= closeDatePlueTime.value) {
      alert("Please enter correct date and time")
      return false
    }
  }
  if (publishDatePlueTime.value < new Date().toISOString() || publishDatePlueTime.value === null) {
    publishDate.value = comeDate
    publishTime.value = comeTime
  }
  event.preventDefault();
  if (announcementDisplay.value) {
    announcementDisplay.value = "Y"
  } else {
    announcementDisplay.value = "N"
  }
  const sendPackage = {
    announcementTitle: announcementTitle.value,
    announcementDescription: announcementDescription.value,
    announcementDisplay: announcementDisplay.value,
    publishDate: publishDatePlueTime.value,
    closeDate: closeDatePlueTime.value,
    categoryId: categoryId.value,
  }
  if (closeDatePlueTime.value !== null) sendPackage.closeDate = closeDatePlueTime.value
  if (updateCheck.value) {
    try {
      console.log(JSON.stringify(sendPackage))
      const result = await fetch(
          `${import.meta.env.VITE_BASE_URL}/${route.params.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(sendPackage),
          }
      );
      if (result.status === 200) {
        alert("update announcement success")
        await router.push({name: "homepage"})
      } else {
        console.log(result)
        alert("update announcement fail")
      }
    } catch (err) {
      alert(err)
    }
  } else {
    try {
      console.log(JSON.stringify(sendPackage))
      const result = await fetch(
          `http://intproj22.sit.kmutt.ac.th:8080/kw1/api/announcements`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(sendPackage),
          }
      );
      if (result.status === 200) {
        alert("Create announcement success")
        await router.push({name: "homepage"})
      } else {
        console.log(result)
        alert(result)
      }
    } catch (err) {
      alert(err)
    }
  }

}
</script>

<template>
  <div class="w-full flex  ">
    <div class=" w-[80%] mx-[10%]   ">
      <div class=" mt-5  text-white">
        <button class="text-2xl font-bold  ann-button  " @click="$router.back()"><span>&lt;</span> Back</button>
        <p class="text-5xl pt-5 font-bold ">{{ updateCheck ? "Edit" : "Create " }} Announcement</p>
      </div>
      <div class="m-auto border-2 mt-5 bg-white rounded-lg   text-purpleCustom1 px-20 pt-10 pb-2 ">
        <!-- <p class="text-2xl font-bold ">Announcement Detail:</p> -->
        <form action="" class="w-full" @submit="sendSubmit">
          <div class="flex w-full">
            <p class="py-2 font-bold w-1/4 text-2xl ">Title</p>
            <input v-model="announcementTitle" class=" bg-gray-200  ml-2 border-2 rounded-md ann-title w-3/4" required
                   type="text"/>
          </div>
          <div class="flex mt-6 w-full">
            <p class="py-2 font-bold w-1/4 text-2xl">Category</p>
            <select v-model="categoryId" class="w-3/4 shadow-md  ml-2 bg-gray-200 shadow-slate-300 ann-category"
                    required>
              <option v-for="(data) in category" :key="data.id" :value="data.category_Id">{{
                  data.categoryName
                }}
              </option>
            </select>
          </div>
          <div class="w-full flex mt-6">
            <p class="py-2 font-bold w-1/4 text-2xl">Publish Date</p>
            <div class="flex space-x-4 w-3/4 ">
              <input
                  v-model="publishDate"
                  :placeholder="'  '+comeDate+''"
                  class=" py-1 border-2 rounded-md ann-publish-date ml-2 w-1/4 bg-gray-200"
                  type="text"

              />
              <input
                  v-model="publishTime"
                  :placeholder="'  '+comeTime+''"
                  class="w-1/4 py-1 border-2 rounded-md ann-publish-time ml-2  bg-gray-200"
                  type="text"

              />
            </div>
          </div>
          <div class="flex w-full mt-6">
            <p class="py-2 font-bold w-1/4 text-2xl">Close Date</p>
            <div class="flex space-x-4 w-3/4">
              <input
                  v-model="closeDate"
                  :placeholder="'  '+comeDate+''"
                  class="w-1/4 py-1 border-2 rounded-md ann-close-date ml-2 bg-gray-200"
                  type="text"

              />
              <input
                  v-model="closeTime"
                  :placeholder="'  '+comeTime+''"
                  class="w-1/4 py-1 border-2 rounded-md ann-close-time ml-2 bg-gray-200"
                  type="text"

              />
            </div>
          </div>
          <div class="flex mt-5 py-2">
            <p class=" font-bold text-2xl w-1/4">Display</p>
            <input v-model="announcementDisplay" class="w-[2%]" type="checkbox"/>
            <label class="m-auto ml-2"> Check to show this announcement</label>
          </div>
          <p class="py-2 font-bold text-2xl mt-5 ">Description</p>
          <textarea
              v-model="announcementDescription"
              class="w-full border-2 rounded-md ann-description"
              cols="100"
              required
              rows="3"
          ></textarea>


          <div class="flex py-5 space-x-2 justify-end">
            <button :class="!change && updateCheck ?  'opacity-40' : ''" :disabled="!change && updateCheck"
                    class="px-4 py-1 bg-gray-300 rounded-md ann-button submit">
              {{ updateCheck ? "edit" : "submit" }}
            </button>
            <button class="px-4 py-1 bg-gray-300 rounded-md ann-button" @click="$router.push({name: 'homepage'})">
              Cancel
            </button>
          </div>

        </form>

      </div>
    </div>

  </div>
</template>

<style scoped></style>
