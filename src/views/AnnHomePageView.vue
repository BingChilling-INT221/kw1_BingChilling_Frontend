<script setup>
import {useRoute} from "vue-router";
import {computed, onMounted, ref} from "vue";
import AnnBox from "@/components/AnnBox.vue";
import { useCalendar } from "vue3-calendar-composable";

const calendar = useCalendar();
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
const route = useRoute();
const loading = ref(true)
const checkAdmin = computed(() => {
    return route.path.includes('admin')
})
const announces = ref([{}]);
const category = ref([]);
const selectedCategory = ref('');
onMounted(async () => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}categories`
        );
        if (response.status === 200) {
            category.value = await response.json();
            console.log(response);
        }
    } catch (err) {
        console.log(err);
    }
})
onMounted(async () => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}announcements`
        );

        if (response.status === 200) {

            announces.value = await response.json();
            loading.value = false
            if (announces.value.length === 0) {
                notFound.value = true
            }

        }

    } catch (err) {
        alert("ยังหาข้อมูลไม่พบโปรดรีเฟรชหน้าอีกครั้งครับ")
        window.location.reload()
        console.log(err);
    }
});
const isOpen = ref(false)
</script>

<template>
    <div class="min-w-full min-h-screen p-10 ">
        <p class="text-2xl font-bold text-center">SIT Announcement System (SAS)</p>
        <div class="flex ">
            <div class="lg:basis-4/6 ">
                <div>
                    <p class="text-xl font-semibold">Latest  Announcement</p>
                    <button   @click="isOpen = !isOpen"
                    class="px-2 py-1 text-black bg-white rounded-md ann-button">{{ isOpen ? 'Closed announments' : 'Open announments' }}
            </button>
                    <div class="max-h-screen min-w-full min-h-full overflow-auto scrollbar scrollbar-thumb-gray-100 ">
                    <div class="flex flex-col justify-center text-center ">
                        <!-- <div class="absolute mt-2 mr-2 ">
                            <svg class="w-20 h-20 bg-transparent border-2 border-transparent border-opacity-50 rounded-full animate-spin"
                                 style="border-right-color: white; border-top-color: white;" viewBox="0 0 24 24"></svg>
                        </div> -->
                        <!-- <p class="flex justify-center text-5xl text-center text-gray-400">
                            No Announcement
                        </p> -->
                        <div v-for="(announce,index) in announces " >
                            <AnnBox :ann-data="announce" :index="index"></AnnBox>
                        </div>
                    </div>
                    </div>
                </div>
              
            </div>
            <div class="lg:basis-2/6">
                <p class="py-1 text-2xl font-bold">Date/Time shown in Timezone: <span class="font-normal">{{
                timezone
                }}</span>
                <div class="flex font-normal">
                  <p class="py-2 text-xl ">Choose Category:</p>
                        <select
                                class="text-black shadow-md shadow-slate-300 ann-category-filter"
                                required v-model="selectedCategory">
                                <option v-for="(data) in category" :key="data.id" :value="data.category_Id" class="text-black">{{
                                data.categoryName
                                }}
                            </option>
                        </select></div>
            </p>
            <div>
                {{ calendar.value  }}
                <p>Top Announcement</p>
                <div class="w-full">
                    <div class="flex flex-col justify-center text-center ">
                        
                        <div v-for="(announce,index) in announces "  >
                            <div v-if="index<5 &&announce.announcementDisplay === 'Y'" class="w-full">
                             <p>{{announce.announcementTitle}}</p>
                             <p>{{announce.publishDate}}</p>
                             <p>view</p>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>