<script setup>
import { onMounted,ref,onUpdated } from "vue";
import { useRouter } from "vue-router";
import AnnouncementBox from "./AnnouncementBox.vue";

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
const announces = ref([]);
const notFound = ref(false)

const router = useRouter();
onMounted(async () => {
  try {
    const result = await fetch(
      `${import.meta.env.VITE_BASE_URL}`
    );
    if (result.status === 200) {
      const response = await result.json();
      announces.value = response;
      if(announces.value.length === 0){
        notFound.value = true
      }
    }
  } catch (err) {
    console.log(err);
  }
});

const changeTime = (time) => {
  if(time === null){
    return "-"
  }
  const newDate = new Date(time);
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return `${
    
    newDate.toLocaleDateString("en-GB", options).replace(/[,]/gi, '')+
    ", " +
     newDate.toLocaleTimeString([],  { hour: "2-digit", minute: "2-digit" ,hour12: false }) 
    
  }`;
};

</script>
 
<template>

    
    <div class="mx-[2%] w-[96%] text-white">
      <div class="flex justify-between w-full ">
        <p class="font-bold">Date/Time shown in Timezone: <span class="font-normal">{{ timezone }}</span></p>
          <button class="px-2 py-1 text-black bg-white rounded-md ann-button">Add Announcement</button>
      </div>


<div class=" mt-9">
<!-- <p class="flex justify-center pt-5 text-5xl text-center text-red-600" v-if="notFound" >
          No Announcement
</p>


<table class="w-full rounded-lg border-spacing-28 " v-else>
  <tr class="font-bold ">
    <th class="py-3">No.</th>
    <td>Title</td>
    <td>Category</td>
    <td>Publish Date</td>
    <td>Close Date</td>
    <th>Display</th>
    <th>Action</th>
  </tr>
  
  <tr class="h-auto text-black bg-white border-b-2 p-7 ann-item w-12/12 hover:bg-gray-400" v-for="(announce,index) in announces"  @click=" router.push(`/admin/announcement/${announce.id}`)">

    <td class="py-4 text-center">{{ index+1}}</td>
    <td class="ann-title">{{ announce?.announcementTitle }}</td>
    <td class="ann-category">{{ announce?.announcementCategory }}</td>
    <td class="ann-publish-date">{{ changeTime(announce?.publishDate) }}</td>
    <td class="ann-close-date">{{ changeTime(announce?.closeDate) }}</td>
    <td class="text-center ann-display">{{ announce?.announcementDisplay }}</td>
    
    <td class="text-center">
      <RouterLink :to="{name: 'Tablesdetail', params: {id: announce.id}}">
      <button class="px-2 py-1 bg-gray-300 rounded-lg ann-button">view</button>
      </RouterLink>
    </td>
  
  </tr>
  
</table> -->
<AnnouncementBox></AnnouncementBox>
</div>
</div>


</template>
 
<style scoped>

</style>