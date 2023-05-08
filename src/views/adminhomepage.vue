<script setup>
import Homepage from '../components/homepage.vue';
import {provide} from 'vue'

provide(/* key */ 'role', /* value */ 'admin')
</script>

<template>
    <div>
        <Homepage>
        </Homepage>
    </div>
</template>

<style scoped>

</style>