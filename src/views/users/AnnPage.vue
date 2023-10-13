<script setup>
import AnnHomePageView from "@/components/announce/AnnHomePageView.vue";
import format_page from "@/components/format_page.vue";
// import { useRoleStore } from '@/stores/role'
// const role = useRoleStore()
// role.setRole('user')

</script>

<template>
  <div>
    <format_page>
      <AnnHomePageView/>
    </format_page>
  </div>
</template>

<style scoped></style>
