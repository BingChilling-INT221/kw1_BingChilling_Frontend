<script setup>
import DarkLightIcon from "./DarkLightIcon.vue";
import Menu from "./icons/Menu.vue";
import Search_light from "./icons/Search_light.vue";
</script>

<template>
  <div>
    <div
      class="h-[3.75rem] border-b-[1px] dark:border-whiteCustom border-blackCustom flex basis-full"
    >
      <div class="flex items-center basis-full px-[1.5rem] justify-between">
        <div class="flex items-center cursor-pointer">
          <div class="rounded-full w-[0.63rem] h-[0.63rem] bg-green-500"></div>
          <button class="pl-[0.31rem] text-lg cursor-pointer">
            SIT Announcement
          </button>
        </div>
        <div class="flex items-center">
          <button><Search_light class="mx-2" /></button>

          <DarkLightIcon class="mx-2" />
          <button><Menu class="ml-2 md:hidden md:mx-2" /></button>
          <div class="hidden mx-2 md:block">Sign in</div>
          <div class="hidden ml-2 md:block">Sign up</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
