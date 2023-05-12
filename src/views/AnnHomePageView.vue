<script setup>
import {useRoute} from "vue-router";
import {computed, onMounted, ref} from "vue";
import AnnBox from "@/components/AnnBox.vue";
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
const route = useRoute();
const loading = ref(true)
const checkAdmin = computed(() => {
    return route.path.includes('admin')
})
const announces = ref([{}]);
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

</script>

<template>
    <div class="min-w-full min-h-screen p-10 ">
        <p class="text-2xl font-bold text-center">SIT Announcement System (SAS)</p>
        <div class="flex ">
            <div class="lg:basis-4/6 ">
                <div>
                    <p class="text-xl font-semibold">Announcement</p>
                    <div class="max-h-screen min-w-full min-h-full overflow-auto">
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
                <p>catagory <span></span></p>
            </p>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>