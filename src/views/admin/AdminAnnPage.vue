<script setup>
import {provide} from "vue";
import AnnHomePageView from "@/components/navbar/AnnHomePageView.vue";
import format_page from "@/components/format_page.vue";

provide(/* key */ "role", /* value */ "admin");
</script>

<template>
  <div>
    <format_page>
      <AnnHomePageView/>
    </format_page>
  </div>
</template>

<style scoped></style>
