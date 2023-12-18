<script setup>
import {useRouter} from "vue-router";


const router = useRouter();


</script>

<template>
  <div>
    <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-4">403 - Forbidden</h1>
      <p class="text-gray-400 mb-4">Sorry, you do not have permission to access this page.</p>
      <button @click="$router.push({ name: 'adminhomepage' })" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ">
        Go to Home Page
      </button>
    </div>
  </div>
  </div>
</template>

<style scoped>

</style>