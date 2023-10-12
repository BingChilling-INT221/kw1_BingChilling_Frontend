<script setup>
import {provide} from "vue";
import AnnHomePageView from "@/components/AnnHomePageView.vue";
import format_page from "@/components/format_page.vue";
import {useRouter} from "vue-router";

const {push} = useRouter();

function goTo(routeName) {
  try {
    push({name: routeName});
  } catch (error) {
    console.error("Error navigating:", error);
  }
}
provide(/* key */ "role", /* value */ "admin");
provide(/* key */ "viwe", /* value */ "viewer");
</script>

<template>
  <div class="bg-cover bg-no-repeat bg-center min-w-full min-h-screen" style="background-image: url(../../public/march.jpg);">
    <format_page >
      <!-- <img src="../../public/march.jpg" alt="march" class="w-full h-full object-cover  z-0" /> -->
      <button
          class="px-2 py-4 m-4 text-white rounded-xl bg-greenCustom FLEX"
          @click="goTo('userhomepage')"
      >
        Go to Homepage
      </button>
      <button
          class="px-2 py-4 m-4 text-white rounded-xl bg-redCustom FLEX"
          @click="goTo('adminhomepage')"
      >
        Go to Admin Homepage
      </button>
    </format_page>
  </div>
</template>

<style scoped></style>
