<script setup>
import {useRouter} from "vue-router";


const router = useRouter();


</script>

<template>
  <div>
    <div class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <h1 class="text-4xl font-bold mb-4">404 - Not found</h1>
        <p class="text-gray-400 mb-4">Sorry, the page you are looking for does not exist.</p>
        <button @click="$router.push({ name: 'adminhomepage' })" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ">
          Go to Home Page
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>