<script setup>

import {provide} from 'vue'
import AnnHomePageView from "@/components/AnnHomePageView.vue";

provide(/* key */ 'role', /* value */ 'admin')
</script>

<template>
  <div>
    <AnnHomePageView/>
  </div>
</template>

<style scoped>

</style>