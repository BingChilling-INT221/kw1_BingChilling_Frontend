<script setup>
import { useRouter } from "vue-router";



const router = useRouter();


</script>
 
<template>
<div>
 this is 403 page
 <button @click="$router.push({ name: 'adminhomepage' })">กดสิ</button>
</div>
</template>
 
<style scoped>

</style>