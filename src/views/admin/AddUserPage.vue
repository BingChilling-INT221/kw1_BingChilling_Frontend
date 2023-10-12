<script setup>
import {provide} from "vue";
import format_page from "@/components/format_page.vue";
import ModUser from "../../components/user/ModUser.vue";


provide(/* key */ "role", /* value */ "admin");
</script>

<template>
  <div>
    <format_page>
      <ModUser></ModUser>
    </format_page>
  </div>
</template>

<style scoped></style>
