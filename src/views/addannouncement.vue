<script setup>
import { onMounted, ref, computed } from "vue";

const category = ref([])

const announcementTitle = ref("")
const categoryId = ref(Number)
const announcementDescription = ref("")
const publishDate =ref("")
const publishTime = ref("")
const closeDate = ref("")
const closeTime = ref("")
const announcementDisplay = ref("")
const checkDate = /^(0?[1-9]|[12]\d|3[01])[\/](0?[1-9]|1[0-2])[\/](19|20)\d{2}$/g
const checkTime = /([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?/g

onMounted( async() => {
  try {
    const result = await fetch(
        `http://intproj22.sit.kmutt.ac.th:8080/kw1/api/categories`
    );
    if (result.status === 200) {
      const response = await result.json();
      category.value = response;
    }
  } catch (err) {
    console.log(err);
  }
})



const changeStringToDate = (date) => {
  if(!date) return null
  let [day, month, year] = date.split("/");
  if (day === undefined || month === undefined || year === undefined) return null
  if (day > 31 || month > 12 || day < 1 || month <1) return null
  
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
  if (year % 4 === 0) 
  {
    if (year % 100 === 0) 
    {
      if (year % 400 === 0) 
      {
        return 29
      }
      return 28
    }
    return 29
  }
  return 28
}


const comeTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })
const comeDate = new Date().toLocaleDateString("en-GB")


const isDateTimeFormat = () =>{
  if(checkDate.test(publishDate.value) || checkDate.test(closeDate.value)){
    alert("Please enter correct date format")
    return false
  }
  else if(checkTime.test(publishTime.value) || checkTime.test(closeTime.value)){
    alert("Please enter correct time format")
    return false
  }
  return true
} 

</script>

<template>
  <div class="p-2">
    <div class="border-2 m-auto p-4 rounded-lg">
      <p class="text-white font-bold text-3xl">Announcement Detail:</p>
      <form action="" :onsubmit="isDateTimeFormat()">
        <p class="text-white font-bold py-2">Title</p>
        <input type="text" class="border-2 rounded-md w-full py-1 ann-title" v-model="announcementTitle" required />
        <p class="text-white font-bold py-2">Category</p>
        <select class="w-3/12 shadow-md shadow-slate-300 ann-category" v-model="categoryId" required>
          <option :value="data.category_Id" v-for="(data,index) in category" :key="data.id">{{ data.categoryName }}</option>
        </select>
        <p class="text-white font-bold py-2">Description</p>
        <textarea
          cols="100"
          rows="10"
          class="w-full border-2 rounded-md ann-description"
          v-model="announcementDescription"
          required
        ></textarea>
        <p class="text-white font-bold py-2">Publish Date</p>
        <div class="flex space-x-4">
          <input
            type="text"
            class="border-2 rounded-md w-1/12 py-1 ann-publish-date"
            :placeholder="'  '+comeDate+''"
            v-model="publishDate"
            
          />
          <input
            type="text"
            class="border-2 rounded-md w-1/12 py-1 ann-publish-time"
            :placeholder="'  '+comeTime+''"
            v-model="publishTime"
            
          />
        </div>
        <p class="text-white font-bold py-2">Close Date</p>
        <div class="flex space-x-4">
          <input
            type="text"
            class="border-2 rounded-md w-1/12 py-1 ann-close-date"
            :placeholder="'  '+comeDate+''"
            v-model="closeDate"
            
          />
          <input
            type="text"
            class="border-2 rounded-md w-1/12 py-1 ann-close-time"
            :placeholder="'  '+comeTime+''"
            v-model="closeTime"
            
          />
        </div>
        <p class="text-white font-bold py-2">Display</p>
        <input type="checkbox" v-model="announcementDisplay" required/>
        <label class="font-semibold text-white"> Check to show this announcement</label>

        <div class="py-5 flex space-x-2">
          <button class="ann-button bg-gray-300 px-4 py-1 rounded-md">
            Submit
          </button>
          <button class="ann-button bg-gray-300 px-4 py-1 rounded-md"  @click="$router.push({name: 'homepage'})">
            Cancel
          </button>
        </div>
     

        <p class="text-white">
        {{publishDatePlueTime }}
        {{ closeDatePlueTime }}
        {{ announcementDisplay }}
        {{ categoryId }}
        {{ announcementDescription }}
      </p>
      </form>
    
    </div>
  </div>



</template>

<style scoped></style>
