<script setup>
import Homepage from '../components/homepage.vue';
import {provide} from 'vue'
// import { useRoleStore } from '@/stores/role'
// const role = useRoleStore()
// role.setRole('user')
provide(/* key */ 'role', /* value */ 'user')
</script>

<template>
    <div>
        <!-- <div class="text-white">{{  role.currentRole }}</div> -->
        <Homepage></Homepage>
    </div>
</template>

<style scoped>

</style>