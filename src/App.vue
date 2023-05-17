<script setup>
import {RouterView} from "vue-router";
import {computed} from "vue";
import {useAnnouncerStore} from "@/stores/announcer.js";

const announcer = useAnnouncerStore();

const colorBg = computed(() => {
    return announcer.darkMode ? '#181818' : 'white'
})
const colorText = computed(() => {
    return announcer.darkMode ? 'white' : 'black'
})

</script>
<template>

    <div class="w-full min-h-screen ">
        <router-view/>
    </div>
</template>

<style scoped>

* {
    scroll-behavior: smooth;
    background: v-bind(colorBg);
    color: v-bind(colorText);
    font-weight: normal;
}
</style>