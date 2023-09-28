<script setup>
import moonlight from "../icons/Moon_light.vue";
import sunlight from "../icons/Sunlight_light.vue";

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
    <label class="swap swap-rotate">
      <!-- this hidden checkbox controls the state -->
      <input type="checkbox"/>

      <!-- sun icon -->
      <moonlight class="swap-on" @click="toggleDarkMode"/>
      <sunlight class="swap-off" @click="toggleDarkMode"/>
    </label>
  </button>
</template>

<style scoped></style>
