<script setup>
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  try {
    const result = await fetch(
        `${import.meta.env.VITE_BASE_URL}/${route.params.id}`
    );
    if (result.status === 200) {
      const response = await result.json();
      announce.value = response;
      console.log(announce.value);
    } else if (result.status === 404 || result.status === 400) {
      console.log("404")
      alert("The request page is not available")
      router.push(`/admin/announcement/`)
    } else {
      console.log("Something went wrong")
    }
  } catch (err) {
    alert("The request page is not available")
    router.push(`/admin/announcement/`)
  }
});
</script>
 
<template>
<div v-for="(data,index) in announce" :key="data.id">
{{ data.announcementTitle }}
</div>
</template>
 
<style scoped>

</style>