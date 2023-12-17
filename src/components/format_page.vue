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
const showSidebar = ref(false);

const toggleSidebar = (value) => {
  showSidebar.value = value;
};

provide("loading", loading, "showSidebar", showSidebar);


</script>

<template>
  <div>
    <div class="">
      <Sidebar v-show="checkAdmin()" :showSidebar="showSidebar"/>
      <div class="flex max-w-full basis-full">

        <Navbar class="fixed top-0 left-0 w-full max " @toggle-sidebar="toggleSidebar"></Navbar>
        <div class="flex flex-grow">
          <div :class="checkAdmin() ? 'lg:ml-[320px] pl-6 flex-grow' : 'flex-grow-0'" class="pt-[3.75rem] w-full">
            <slot class="flex-grow"/>
          </div>
        </div>
        <div v-if="loading" class="loadDiv fixed inset-0 w-screen h-auto">
          <span class="loading loading-spinner w-1/6 text-blue "></span>
        </div>
      </div>
<!--      <div class="flex max-w-full basis-full">-->
<!--        <div v-if="loading" class="loadDiv min-h-screen min-w-screen inset-0 absolute "><span class="loading loading-spinner w-1/6 text-blue "></span></div>-->
<!--        <Navbar class="fixed top-0 left-0 w-full max " @toggle-sidebar="toggleSidebar"></Navbar>-->
<!--        <div-->
<!--            :class="checkAdmin() ? 'lg:ml-[320px] pl-6' : ''"-->
<!--            class="pt-[3.75rem] w-full"-->
<!--        >-->
<!--          <slot class="hidden"/>-->
<!--        </div>-->
<!--      </div>-->
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
