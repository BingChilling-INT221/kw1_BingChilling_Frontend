<script setup>

</script>

<template>
    <div class="inset-0 bg-white">
    <div class="bg-white  m-auto p-3 flex flex-auto">
        <p class="text-black"> NOT FOUND!!!</p>
        <button @click="$router.push({name: 'userhomepage'})" class="bg-green-500">Go to Homepage</button>
        <button @click="$router.push({name: 'adminhomepage'})" class="bg-red-500">Go to Admin Homepage</button>
    </div>
    </div>
</template>

<style scoped>

</style>