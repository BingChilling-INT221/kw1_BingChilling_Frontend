<script setup>
import {provide} from 'vue'
import AnnHomePageView from "@/components/AnnHomePageView.vue";
// import { useRoleStore } from '@/stores/role'
// const role = useRoleStore()
// role.setRole('user')
provide(/* key */ 'role', /* value */ 'user')
</script>

<template>
    <div>
        <AnnHomePageView/>
    </div>
</template>

<style scoped>

</style>