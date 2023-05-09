<script setup>
import {inject} from "vue";
import AnnouncementBox from "./AnnouncementBox.vue";
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
const role = inject('role')
</script>
<template>

    <div class="text-white mx-[10%] w-[80%] pt-10">
        <div class="flex justify-between w-full ">
            <p class="py-1 text-2xl font-bold">Date/Time shown in Timezone: <span class="font-normal">{{
                timezone
                }}</span>
            </p>
            <button v-show="role === 'admin'"
                    class="px-2 py-1 text-black bg-white rounded-md ann-button" @click="$router.push({name: 'addannouncement'})">Add
                Announcement
            </button>
            <button v-show="role === 'user'"
                    class="px-2 py-1 text-black bg-white rounded-md ann-button">Closed
                Announcements
            </button>
        </div>
        <div class="mt-10 ">
            <AnnouncementBox></AnnouncementBox>
        </div>
    </div>


</template>

<style scoped>

</style>