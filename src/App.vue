<script setup>
import { RouterView } from "vue-router";
import { useAnnouncerStore } from "@/stores/announcer.js";
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";

const announcer = useAnnouncerStore();

/// ref form https://tailwindcss.com/docs/dark-mode
// On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
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
  <div
    class="w-full min-h-screen top-0 absolute duration-[350ms] text-sm bg-whiteCustom dark:bg-blackCustom text-blackCustom dark:text-whiteCustom"
  >
    <!-- <div class="flex">
      <Sidebar />
      <div class="flex max-w-full basis-full">
        <Navbar class="fixed top-0 left-0 w-full max"></Navbar> -->
    <router-view class="" />
    <!-- </div>
    </div> -->
  </div>
</template>

<style scoped>
* {
  margin: 0;
}
</style>
