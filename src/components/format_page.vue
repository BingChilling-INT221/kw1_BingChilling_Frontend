<script setup>
import Navbar from "./navbar/Navbar.vue";
import Sidebar from "./navbar/Sidebar.vue";
import {useRoute} from "vue-router";

const route = useRoute();
const checkAdmin = () => {
  return route.path.includes("/admin");
};
</script>

<template>
  <div>
    <div class="">
      <Sidebar v-show="checkAdmin()"/>
      <div class="flex max-w-full basis-full">
        <Navbar class="fixed top-0 left-0 w-full max"></Navbar>
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

<style scoped></style>
