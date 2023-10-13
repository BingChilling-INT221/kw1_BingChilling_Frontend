<script setup>
import Search_light from "../icons/Search_light.vue";
</script>

<template>
  <div>
    <div>
      <div class="flex items-center">
        <div class="flex items-center  lg:h-9 ">
          <Search_light/>
          <input
              class="w-full h-9 px-4 text-sm bg-bgNav border-0 outline-0 focus:border-b-2"
              placeholder="Search"
              type="text"
          /></div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
