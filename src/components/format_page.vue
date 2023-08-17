<script setup>
import Navbar from "./Navbar.vue";
import Sidebar from "./Sidebar.vue";
import { inject } from "vue";
const role = inject("role");
const checkAdmin = () => {
  return role === "admin";
};
</script>

<template>
  <div>
    <div class="">
      <Sidebar v-show="checkAdmin()" />
      <div class="flex max-w-full basis-full">
        <Navbar class="fixed top-0 left-0 w-full max"></Navbar>
        <div class="pt-[3.75rem] w-full lg:ml-[320px] pl-6">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
