<script setup>
import moonlight from "./icons/Moon_light.vue";
import sunlight from "./icons/Sunlight_light.vue";

const toggleDarkMode = () => {
  if (localStorage.theme === "dark") {
    localStorage.theme = "light";
    document.documentElement.classList.remove("dark");
  } else {
    localStorage.theme = "dark";
    document.documentElement.classList.add("dark");
  }
};
</script>

<template>
  <button>
    <moonlight class="dark:hidden" @click="toggleDarkMode" />
    <sunlight class="hidden dark:block" @click="toggleDarkMode" />
  </button>
</template>

<style scoped></style>
