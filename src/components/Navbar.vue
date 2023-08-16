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
          <div
            class="hidden ml-[1rem] text-lg items-center md:flex border-l-2 border-blackCustom dark:border-whiteCustom pl-[1rem]"
          >
            Announce
          </div>
          <div
            class="hidden ml-[1rem] text-lg items-center md:flex border-l-2 border-blackCustom dark:border-whiteCustom pl-[1rem]"
          >
            Users
          </div>
        </div>
        <div class="flex items-center">
          <button><Search_light class="" /></button>

          <DarkLightIcon class="md:pl-[1rem] pl-3 mt-2" />
          <button><Menu class="w-5 md:hidden md:pl-[1rem] pl-3" /></button>
          <div class="text-lg hidden pl-[1rem] md:block">Sign in</div>
          <div class="text-lg hidden pl-[1rem] md:block">Sign up</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
