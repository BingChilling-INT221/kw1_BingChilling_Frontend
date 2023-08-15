<script setup>
import {useAnnouncerStore} from "@/stores/announcer";
import {ref} from "vue";
const store = useAnnouncerStore();

</script>
 
<template>
<div>

    <div class="h-[3.75rem] border-b-2" :class=" border-b-[baseColor]"></div>
</div>
</template>
 
<style scoped>

</style>