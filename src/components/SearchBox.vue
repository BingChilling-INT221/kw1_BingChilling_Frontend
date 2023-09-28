<script setup>
import Search_light from "./icons/Search_light.vue";
</script>

<template>
  <div>
    <div>
      <div class="flex items-center">
        <div class="flex items-center w-12 h-12">
          <Search_light/>
        </div>
        <input
            class="w-full h-12 px-4 text-sm text-blackCustom dark:text-whiteCustom bg-whiteCustom dark:bg-blackCustom"
            type="text"
            placeholder="Search"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
