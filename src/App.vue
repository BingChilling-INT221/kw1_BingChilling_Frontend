<script setup>
import Announcement from './components/Announcement.vue';</script>

<template>

  <div class="w-full h-screen bg-[#1D2040]">
    <Announcement/>
    <div class=" w-full h-auto bg-[#1D2040] bg-cover mt-10">
      <RouterView/>
    </div>

  </div>


</template>

<style scoped>


</style>