<script setup></script>

<template>
  <div class="inset-0 min-h-screen  bg-whiteCustom dark:bg-blackCustom ">
    <div class="flex flex-col p-3 m-auto">
      <p class="text-black">NOT FOUND!!!</p>
      <button
        class="text-green-500"
        @click="$router.push({ name: 'userhomepage' })"
      >
        Go to Homepage
      </button>
      <button
        class="text-red-500"
        @click="$router.push({ name: 'adminhomepage' })"
      >
        Go to Admin Homepage
      </button>
    </div>
  </div>
</template>

<style scoped></style>
