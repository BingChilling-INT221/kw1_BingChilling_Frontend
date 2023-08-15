<script setup>
import { useAnnouncerStore } from "@/stores/announcer";
</script>

<template>
  <div>
    <div
      class="h-[3.75rem] border-b-[1px] dark:border-whiteCustom border-blackCustom flex"
    >
      <div class="flex items-center basis-full pl-[1.5rem]">
        <div class="rounded-full w-[0.63rem] h-[0.63rem] bg-green-500"></div>
        <span class="pl-[0.31rem] text-lg">SIT Announcement</span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
