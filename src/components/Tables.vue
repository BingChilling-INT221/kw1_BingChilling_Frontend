<script setup>
import { onMounted,ref,onUpdated } from "vue";


const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
const announces = ref([]);
const notFound = ref(false)

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

    <div>
        <p class="flex justify-center font-bold text-3xl py-2">SIT Announcesment System (SAS)</p>
    </div>
    <div class="mx-[2%] w-[96%]">
        <p class="font-bold">Date/Time shown in Timezone: <span class="font-normal">{{ timezone }}</span></p>
    
        <p class="text-5xl flex justify-center text-center text-red-600 pt-5" v-if="notFound" >
          No Announcements
    </p>

<table class=" w-full border-2 rounded-lg" v-else>
  <tr class="bg-gray-200 font-bold border-b-2">
    <th class="py-3">No.</th>
    <td>Title</td>
    <td>Category</td>
    <td>Publish Date</td>
    <td>Close Date</td>
    <th>Display</th>
    <th>Action</th>
  </tr>
  <tr class="ann-item border-b-2" v-for="(announce,index) in announces"  >
    <td class="text-center py-4">{{ index+1}}</td>
    <td class="ann-title">{{ announce?.announcementTitle }}</td>
    <td class="ann-category">{{ announce?.announcementCategory }}</td>
    <td class="ann-publish-date">{{ changeTime(announce?.publishDate) }}</td>
    <td class="ann-close-date">{{ changeTime(announce?.closeDate) }}</td>
    <td class="ann-display text-center">{{ announce?.announcementDisplay }}</td>
    
    <td class="text-center">
      <RouterLink :to="{name: 'Tablesdetail', params: {id: announce.id}}">
      <button class="ann-button bg-gray-300 px-2 py-1 rounded-lg">view</button>
      </RouterLink>
    </td>
  
  </tr>
  
</table>
</div>


</template>
 
<style scoped>

</style>