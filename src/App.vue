<script setup>
import Announcement from './components/Announcementbanner.vue';</script>

<template>

    <div class="w-full min-h-screen bg-blackCustom">
        <Announcement class="bg-purpleCustom1"/>
        <div class="w-full h-auto ">
            <RouterView/>
        </div>
    </div>


</template>

<style scoped>


</style>