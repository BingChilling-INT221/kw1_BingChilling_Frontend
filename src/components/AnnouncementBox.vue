<script setup>
import { onMounted, computed } from "vue";
import { ref } from "vue";

const announce = ref([]);
const notFound = ref(false)
onMounted(async () => {
  try {
    const result = await fetch(
      `${import.meta.env.VITE_BASE_URL}`
    );
    if (result.status === 200) {
      const response = await result.json();
      announce.value = response;
      if(announce.value.length === 0){
        notFound.value = true
      }
    }
  } catch (err) {
    console.log(err);
  }
});

// const date = newDate(announce.value.announcementTitle)

const changeTime = (time) => {
    const newDate = new Date(time);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };    
    return `${newDate.toLocaleTimeString('en-US')+' '+ newDate.toLocaleDateString("en-US", options)}`
}


</script>

<template>
  <div >
    <p class="text-5xl flex justify-center text-center text-gray-400 pt-5" v-if="notFound" >
    Announcement is empty
    </p>
    
  
  <div class="px-5 pt-5 pb-2 font-mono" v-else v-for="data in announce" :key="data.id">
    <RouterLink :to="{name: 'Announcementdetail', params: {id: data.id}}">
    <div class="bg-white m-auto w-12/12 h-auto p-3 hover:bg-gray-400">
      <div class="flex justify-between font-bold">
        <p class="text-black pl-3 text-3xl pt-1">{{ data.announcementTitle }}</p>
        <div class="pr-5 pt-1">
          <a
            href="#"
            class="flex text-white bg-green-500 p-2 h-7 w-7 rounded-full justify-center"
            :class="
              data.announcementDisplay === 'Y' ? 'bg-green-500' : 'bg-red-500'
            "
            ></a
          >
        </div>
      </div>
      <div class="pl-3 pt-5 pr-3 m-auto">
        <a
          href="#"
          class="text-white bg-[#628FB8] px-5 text-sm rounded-lg py-1"
          >{{ data.announcementCategory }}</a
        >
        
        <div class="flex">
          <p class="pt-1 text-[#4E6FE2] font-bold" v-if="data.publishDate !== null">
            Publishdate: {{ changeTime(data.publishDate) }}
          </p>
          <p class="pt-1 text-[#4E6FE2] font-bold" v-else>
            Publishdate: -
          </p>
          <p class="pl-20 pt-1 text-[#A649A2] font-bold" v-if="data.closeDate !== null">
            Close Date: {{ changeTime(data.closeDate) }}
          </p>
          <p class="pl-20 pt-1 text-[#A649A2] font-bold" v-else>
            Closedate: -
          </p>
        </div>
      </div>
    </div>
  </RouterLink>
  </div>
</div>
</template>

<style scoped></style>
