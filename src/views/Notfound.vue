<template>
  <div class="inset-0 min-h-screen bg-whiteCustom dark:bg-blackCustom">
    <div
      class="flex flex-col items-center justify-center h-full p-3 m-auto bg-green-400"
    >
      <h1 class="mb-4 text-4xl font-bold">Page Not Found</h1>
      <p class="mb-6 text-lg">The page you are looking for does not exist.</p>
      <button
        class="px-2 py-4 m-4 text-white rounded-xl bg-greenCustom"
        @click="goTo('userhomepage')"
      >
        Go to Homepage
      </button>
      <button
        class="px-2 py-4 m-4 text-white rounded-xl bg-redCustom"
        @click="goTo('adminhomepage')"
      >
        Go to Admin Homepage
      </button>
      <button
        class="px-2 py-4 m-4 text-white rounded-xl bg-redCustom"
        @click="goTo('login')"
      >
        Go to login
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const { push } = useRouter();

function goTo(routeName) {
  try {
    push({ name: routeName });
  } catch (error) {
    console.error("Error navigating:", error);
  }
}
</script>

<style scoped>
/* .bg-whiteCustom {
  background-color: #ffffff;
}

.bg-blackCustom {
  background-color: #000000;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  margin: 0.5rem;
}

.btn-green {
  background-color: #43d482;
  color: #ffffff;
}

.btn-red {
  background-color: #ef4444;
  color: #ffffff;
} */
</style>
