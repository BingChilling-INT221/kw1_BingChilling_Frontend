<script setup>
import Announcementdetail from '@/components/announcementdetail.vue';
import {provide} from 'vue';

provide(/* key */ 'role', /* value */ 'admin')

</script>

<template>
  <div>
    <Announcementdetail></Announcementdetail>
  </div>
</template>

<style scoped></style>