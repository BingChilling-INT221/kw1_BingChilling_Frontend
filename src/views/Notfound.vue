<script setup>

</script>

<template>
    <div class="inset-0 bg-white min-h-screen">
    <div class="bg-white  m-auto p-3 flex flex-col">
        <p class="text-black"> NOT FOUND!!!</p>
        <button @click="$router.push({name: 'userhomepage'})" class="text-green-500">Go to Homepage</button>
        <button @click="$router.push({name: 'adminhomepage'})" class="text-red-500">Go to Admin Homepage</button>
    </div>
    </div>
</template>

<style scoped>

</style>