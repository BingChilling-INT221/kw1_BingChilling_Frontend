<script setup>
import {useRoute} from "vue-router";
import {computed} from "vue";
const route = useRoute();
const checkAdmin = computed(() => {
    return route.path.includes('admin')
})

</script>

<template>
<div class="min-w-full min-h-screen ">
    {{ checkAdmin  }}
</div>
</template>

<style scoped>

</style>