<script setup>
import Announcement from './components/Announcementbanner.vue';
import { RouterView } from "vue-router";
import {computed,watch} from "vue";
import {useAnnouncerStore} from "@/stores/announcer.js";
const announcer = useAnnouncerStore();
const {  setDarkMode } = announcer;

const colorBg = computed(() => {
    return announcer.darkMode ? 'bg-blackCustom' : 'bg-white'
})
const colorText = computed(() => {
    return announcer.darkMode ? 'text-white' : 'text-black'
})

</script>
<template>

<!--    <div class="w-full min-h-screen bg-blackCustom">-->
<!--        <Announcement class="bg-purpleCustom1"/>-->
<!--        <div class="w-full h-auto ">-->
<!--            <RouterView/>-->
<!--        </div>-->
<!--    </div>-->
    <button @click="setDarkMode">a</button>
    {{ announcer?.darkMode  }}
    <RouterView :class="[colorBg,colorText]" ></RouterView>

</template>

<style scoped>

html {
    scroll-behavior: smooth;

}
</style>