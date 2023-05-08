<script setup>

</script>

<template>
    <teleport to="app">
    <div class="bg-white inset-0 bg-white m-auto p-3 flex flex-auto">
        <p class="text-black"> NOT FOUND!!!</p>
        <button @click="$router.push({name: 'userhomepage'})" class="bg-green-500">Go to Homepage</button>
        <button @click="$router.push({name: 'adminhomepage'})" class="bg-red-500">Go to Admin Homepage</button>
    </div>
    </teleport>
</template>

<style scoped>

</style>