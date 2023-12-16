<script setup>
import {RouterView} from "vue-router";
import {useAnnouncerStore} from "@/stores/announcer.js";

const announcer = useAnnouncerStore();
</script>
<template>
  <div
      class="min-w-full min-h-screen top-0 absolute text-white text-sm bg-bg "
  >
    <!-- <div class="flex">
      <Sidebar />
      <div class="flex max-w-full basis-full">
        <navbar class="fixed top-0 left-0 w-full max"></navbar> -->
    <router-view/>
    <!-- </div>
    </div> -->
  </div>
</template>

<style scoped>
* {
  margin: 0;
}
</style>
