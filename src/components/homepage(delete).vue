<!--<script setup>-->
<!--import {inject, onMounted, ref} from "vue";-->
<!--import AnnouncementBox from "./AnnouncementBox(delete).vue";-->
<!--import {useAnnouncerStore} from "@/stores/announcer";-->

<!--const category = ref([])-->
<!--const announces = ref([])-->
<!--const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone-->
<!--const role = inject('role')-->
<!--const isOpen = ref(false)-->
<!--useAnnouncerStore();-->
<!--const selectedCategory = ref('');-->


<!--onMounted(async () => {-->
<!--    try {-->
<!--        const response = await fetch(-->
<!--            `${import.meta.env.VITE_BASE_URL}categories`-->
<!--        );-->
<!--        if (response.status === 200) {-->
<!--            category.value = await response.json();-->
<!--            console.log(response);-->
<!--        }-->
<!--    } catch (err) {-->
<!--        console.log(err);-->
<!--    }-->
<!--})-->

<!--onMounted(async () => {-->
<!--    try {-->
<!--        const response = await fetch(-->
<!--            `${import.meta.env.VITE_BASE_URL}announcements`-->
<!--        );-->

<!--        if (response.status === 200) {-->

<!--            announces.value = await response.json();-->
<!--            loading.value = false-->
<!--            if (announces.value.length === 0) {-->
<!--                notFound.value = true-->
<!--            }-->
<!--        }-->

<!--    } catch (err) {-->
<!--        alert("ยังหาข้อมูลไม่พบโปรดรีเฟรชหน้าอีกครั้งครับ")-->
<!--        window.location.reload()-->
<!--        console.log(err);-->
<!--    }-->
<!--});-->


<!--</script>-->
<!--<template>-->


<!--    <div class="text-white mx-[10%] w-[80%] pt-10">-->
<!--        <div class="flex justify-between w-full ">-->
<!--            <p class="py-1 text-2xl font-bold">Date/Time shown in Timezone: <span class="font-normal">{{-->
<!--                timezone-->
<!--                }}</span>-->
<!--            </p>-->
<!--            <button v-show="role === 'admin'"-->
<!--                    class="px-2 py-1 text-black bg-white rounded-md ann-button"-->
<!--                    @click="$router.push({name: 'addannouncement'})">Add-->
<!--                Announcement-->
<!--            </button>-->
<!--            <button v-show="role === 'user'"-->
<!--                    class="px-2 py-1 text-black bg-white rounded-md ann-button"-->
<!--                    @click="isOpen = !isOpen">-->
<!--                {{ isOpen ? 'Closed announments' : 'Open announments' }}-->
<!--            </button>-->

<!--        </div>-->
<!--        <div class="flex w-full mt-6 text-black">-->
<!--            <p class="py-2 text-xl text-white">Choose Category:</p>-->
<!--            <select-->
<!--                    v-model="selectedCategory"-->
<!--                    class="w-1/12 ml-2 shadow-md shadow-slate-300 ann-category-filter" required>-->
<!--                <option v-for="(data) in category" :key="data.id" :value="data.category_Id">{{-->
<!--                    data.categoryName-->
<!--                    }}-->
<!--                </option>-->
<!--            </select>-->
<!--        </div>-->
<!--        <div class="mt-10 ">-->
<!--            <AnnouncementBox :selectedCategory="selectedCategory"></AnnouncementBox>-->
<!--        </div>-->

<!--    </div>-->


<!--</template>-->

<!--<style scoped>-->

<!--</style>-->