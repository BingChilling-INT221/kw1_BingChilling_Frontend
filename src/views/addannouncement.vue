<script setup>

import {provide} from 'vue';
import Modannouncedment from "@/components/Modannouncedment.vue";

provide(/* key */ 'role', /* value */ 'admin')
</script>

<template>
    <div>
        <Modannouncedment></Modannouncedment>
    </div>
</template>

<style scoped>

</style>