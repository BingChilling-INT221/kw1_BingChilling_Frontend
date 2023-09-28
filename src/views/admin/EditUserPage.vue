<script setup>
import {computed, onMounted, provide, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import ModUsers from "../../components/ModUser.vue";
import {fetchUserEdit} from "@/services/api.js";
import format_page from "@/components/format_page.vue";

const router = useRouter();
const route = useRoute();
const user = ref({});


onMounted(async () => {
  try {
    const response = await fetchUserEdit(route.params.id);
    if (response.status === 200) {
      user.value = await response.json();

    } else if (response.status === 404) {
      const error = await response.json();
      alert(error.message);
      await router.push(`/admin/users/`);
    }
  } catch (err) {
    console.log(err);
  }
});


const updatePackage = computed(() => {
  return {
    username: user.value.username,
    name: user.value.name,
    email: user.value.email,
    role: user.value.role,
    createdOn: user.value.createdOn,
    updatedOn: user.value.updatedOn
  };
});


provide(/* key */ "role", /* value */ "admin");
</script>

<template>
  <format_page>
    <ModUsers :updatePackage="updatePackage"></ModUsers>
  </format_page>
</template>

<style scoped>

</style>