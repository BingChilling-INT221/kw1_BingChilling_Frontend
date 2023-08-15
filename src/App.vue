<script setup>
import {RouterView} from "vue-router";
import {computed} from "vue";
import {useAnnouncerStore} from "@/stores/announcer.js";

const announcer = useAnnouncerStore();


/// ref form https://tailwindcss.com/docs/dark-mode
// On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}
// Whenever the user explicitly chooses light mode
// localStorage.theme = 'light'
// // Whenever the user explicitly chooses dark mode
// localStorage.theme = 'dark'
// // Whenever the user explicitly chooses to respect the OS preference
// localStorage.removeItem('theme')
///


</script>
<template>

  <div class="w-full min-h-screen bg-whiteCustom dark:bg-blackCustom text-blackCustom dark:text-whiteCustom">
    <router-view/>
  </div>
</template>

<style scoped>


</style>