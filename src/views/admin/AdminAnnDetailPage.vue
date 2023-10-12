<script setup>
import AnnDetail from "@/components/announce/AnnDetail.vue";
import format_page from "@/components/format_page.vue";
import {provide} from "vue";

provide(/* key */ "role", /* value */ "admin");
</script>

<template>
  <div>
    <format_page>
      <AnnDetail></AnnDetail>
    </format_page>
  </div>
</template>

<style scoped></style>
