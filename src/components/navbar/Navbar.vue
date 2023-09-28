<script setup>
import {inject} from "vue";
import DarkLightIcon from "./DarkLightIcon.vue";
import Menu from "../icons/Menu.vue";
import SearchBox from "../SearchBox.vue";

const role = inject("role");
const checkAdmin = () => {
  return role === "admin";
};
</script>

<template>
  <div class="">
    <div
        class="h-[3.75rem] h-16 flex basis-full bg-whiteCustom dark:bg-blackCustom p-2"
    >
      <div class="flex items-center basis-full">
        <button class="flex" v-show="checkAdmin()">
          <Menu class="lg:hidden"/>
        </button>
        <div
            class="flex w-[200px] lg:w-[312px] space-x-2"
            @click="$router.push({ name: 'Notfound' })"
        >
          <div class="flex items-center cursor-pointer">
            <div class="rounded-full w-[16px] h-[16px] bg-green-500"></div>
            <button
                class="pl-[0.31rem] text-lg cursor-pointer font-semibold lg:hidden ann-app-title"
            >
              SAS
            </button>

            <button
                class="pl-[0.31rem] text-2xl cursor-pointer font-semibold hidden lg:block ann-app-title"
            >
              SAS
            </button>
          </div>
        </div>
        <SearchBox class="hidden mx-6 lg:block"/>
        <div class="flex items-center justify-end space-x-4 grow">
          <DarkLightIcon class="mt-1"/>
          <div class="hidden md:block">Sign in</div>
          <div class="hidden md:block">Sign up</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
