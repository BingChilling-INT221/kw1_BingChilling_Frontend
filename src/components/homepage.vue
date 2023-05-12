<script setup>
import {inject,ref,computed,onMounted} from "vue";
import AnnouncementBox from "./AnnouncementBox.vue";
import { useAnnouncerStore } from "../stores/announcer.js";

const category = ref([])
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
const role = inject('role')
const isOpen = ref(false)
const announcerStore = useAnnouncerStore()
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




</script>
<template>

    <div class="text-white mx-[10%] w-[80%] pt-10">
        <div class="flex justify-between w-full ">
            <p class="py-1 text-2xl font-bold">Date/Time shown in Timezone: <span class="font-normal">{{
                timezone
                }}</span>
            </p>
            <button v-show="role === 'admin'"
                    class="px-2 py-1 text-black bg-white rounded-md ann-button"
                    @click="$router.push({name: 'addannouncement'})">Add
                Announcement
            </button>
            <button v-show ="role === 'user'"
            @click="isOpen = !isOpen"
                    class="px-2 py-1 text-black bg-white rounded-md ann-button">{{ isOpen ? 'Closed announments' : 'Open announments' }}
            </button>

        </div>
        <div class="flex w-full mt-6 text-black">
                        <p class="py-2 text-xl text-white">Choose Category:</p>
                        <select
                                class="w-1/12 ml-2 shadow-md shadow-slate-300 ann-category-filter"
                                required v-model="selectedCategory">
                                <option v-for="(data) in category" :key="data.id" :value="data.category_Id">{{
                                data.categoryName
                                }}
                            </option>
                        </select>
                    </div>
        <div class="mt-10 ">
            <AnnouncementBox :selectedCategory="selectedCategory"></AnnouncementBox>
        </div>
    </div>


</template>

<style scoped>

</style>