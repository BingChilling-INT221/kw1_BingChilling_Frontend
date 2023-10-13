<script setup>
import AnnDetail from "@/components/announce/AnnDetail.vue";
import format_page from "@/components/format_page.vue";
import {useRoute} from "vue-router";

let route = useRoute();
console.log('AdminAnnDetailPage.vue');
console.log(route.path)
</script>

<template>
  <div>
    <format_page>
      <AnnDetail></AnnDetail>
    </format_page>
  </div>
</template>

<style scoped></style>
