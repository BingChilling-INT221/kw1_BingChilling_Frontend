<script setup>
import Navbar from "./navbar/Navbar.vue";
import Sidebar from "./navbar/Sidebar.vue";
import {useRoute} from "vue-router";
import {provide, ref} from "vue";

const route = useRoute();
const checkAdmin = () => {
  return route.path.includes("/admin");
};
const loading = ref(false);
provide("loading", loading);
</script>

<template>
  <div>
    <div class="">
      <Sidebar v-show="checkAdmin()"/>
      <div class="flex max-w-full basis-full">
        <div v-if="loading" class="loadDiv "><span class="loading loading-spinner w-1/6 text-blue "></span></div>
        <Navbar class="fixed top-0 left-0 w-full max "></Navbar>
        <div
            :class="checkAdmin() ? 'lg:ml-[320px] pl-6' : ''"
            class="pt-[3.75rem] w-full"
        >
          <slot/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>


.fixed {
  z-index: 20; /* Set a lower z-index for the fixed element */
}

.loadDiv {
  @apply absolute top-0 left-0 w-full h-screen bg-darksecondCustom opacity-80 flex justify-center items-center;
  /* Center the loading animation vertically */
  z-index: 30;
}


</style>
