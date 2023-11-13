<script setup>
import { RouterView } from "vue-router";
import { useAnnouncerStore } from "@/stores/announcer.js";

const announcer = useAnnouncerStore();

// Set the dark mode class on the root element based on the user's preference
const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
const theme = localStorage.theme || (prefersDarkMode ? "dark" : "light");
document.documentElement.classList.add(theme);

// Listen for changes to the user's preference and update the class accordingly
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", event => {
  const newTheme = event.matches ? "dark" : "light";
  document.documentElement.classList.remove(theme);
  document.documentElement.classList.add(newTheme);
  localStorage.theme = newTheme;
  theme = newTheme;
});
</script>

<template>
  <div class="absolute top-0 min-w-full min-h-screen text-sm text-white bg-bg">
    <router-view />
  </div>
</template>

<style scoped>
* {
  margin: 0;
}
</style>
