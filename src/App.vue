<script setup>
import Announcement from './components/Announcementbanner.vue';</script>

<template>

  <div class="w-full min-h-screen bg-blackCustom">
    <Announcement class="bg-purpleCustom1"/>
    <div class="w-full h-auto ">
      <RouterView class="pt-10 mx-[10%] w-[80%]"/>
    </div>
  </div>


</template>

<style scoped>


</style>