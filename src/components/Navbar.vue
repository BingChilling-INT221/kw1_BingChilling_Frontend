<script setup>
import DarkLightIcon from "./DarkLightIcon.vue";
import Menu from "./icons/Menu.vue";
import Search_light from "./icons/Search_light.vue";
</script>

<template>
  <div class="">
    <div
      class="h-[3.75rem] border-b-[1px] dark:border-whiteCustom border-blackCustom flex basis-full bg-whiteCustom dark:bg-blackCustom"
    >
      <div class="flex items-center basis-full px-[1.5rem] justify-between">
        <div class="flex">
          <button class="flex"><Menu class="px-3 lg:hidden" /></button>
          <div class="flex items-center cursor-pointer pl-[1rem] lg:hidden">
            <div
              class="rounded-full w-[0.63rem] h-[0.63rem] bg-green-500"
            ></div>
            <button
              class="pl-[0.31rem] text-lg cursor-pointer font-semibold md:hidden"
            >
              SAS
            </button>
            <button
              class="pl-[0.31rem] text-lg cursor-pointer font-semibold hidden md:block"
            >
              SIT Announcement
            </button>
          </div>
        </div>
        <div class="flex items-center">
          <DarkLightIcon class="md:pl-[1rem] pl-3 mt-2" />

          <div class="text-lg hidden pl-[1rem] md:block">Sign in</div>
          <div class="text-lg hidden pl-[1rem] md:block">Sign up</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
