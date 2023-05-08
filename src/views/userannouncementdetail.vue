<script setup>
import announcementdetail from '../components/announcementdetail.vue';
import {provide} from 'vue';

provide(/* key */ 'role', /* value */ 'user')

</script>

<template>
    <div>
        <announcementdetail></announcementdetail>
    </div>
</template>

<style scoped>

</style>