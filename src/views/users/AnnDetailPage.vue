<script setup>
import announcementdetail from "@/components/AnnDetail.vue";
import format_page from "@/components/format_page.vue";
import {provide} from "vue";

provide(/* key */ "role", /* value */ "user");
</script>

<template>
  <div>
    <format_page>
      <announcementdetail></announcementdetail>
    </format_page>
  </div>
</template>

<style scoped></style>
