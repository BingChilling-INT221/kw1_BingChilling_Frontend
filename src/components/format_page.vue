<script setup>
import Navbar from "./navbar/Navbar.vue";
import Sidebar from "./navbar/Sidebar.vue";
import {inject} from "vue";
import {useRoute} from "vue-router";
const route = useRoute();
const role = inject("role");
const checkAdmin = () => {
  return role === "admin";
};
const checkLogin = () => {
  console.log(route.path) ;
  return route.path != "/"
};
</script>

<template>
  <div>
    <div class="">
      <Sidebar v-show="checkLogin()"/>
      <div class="flex max-w-full basis-full">
        <Navbar class="fixed top-0 left-0 w-full max"></Navbar>
        <div
            class="pt-[3.75rem] w-full"
            :class="checkLogin() ? 'lg:ml-[320px] pl-6' : ''"
        >
          <slot/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
