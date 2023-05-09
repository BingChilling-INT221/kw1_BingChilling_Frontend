<script setup>

</script>

<template>
    <div class="inset-0 bg-white min-h-screen">
        <div class="bg-white  m-auto p-3 flex flex-col">
            <p class="text-black"> NOT FOUND!!!</p>
            <button class="text-green-500" @click="$router.push({name: 'userhomepage'})">Go to Homepage</button>
            <button class="text-red-500" @click="$router.push({name: 'adminhomepage'})">Go to Admin Homepage</button>
        </div>
    </div>
</template>

<style scoped>

</style>