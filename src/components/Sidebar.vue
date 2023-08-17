<script setup>
import { useRoute } from "vue-router";
import Ann from "./icons/Ann.vue";
import Groups from "./icons/Groups.vue";
const route = useRoute();
const checkPath = (path) => {
  return route.path.includes(path);
};
</script>

<template>
  <div>
    <div class="absolute w-[320px] pt-[3.75rem] min-h-screen lg:block hidden">
      <div class="w-10/12 mt-1 ml-4 space-y-2">
        <button
          class="flex items-center w-full px-4 py-2 optionSidebar rounded-xl"
          :class="
            checkPath('/announcement')
              ? ' bg-whitesecondCustom dark:bg-darksecondCustom '
              : ''
          "
          @click="$router.push({ name: 'adminhomepage' })"
        >
          <Ann /><span>Announcer</span>
        </button>
        <button
          class="flex items-center w-full px-4 py-2 optionSidebar rounded-xl"
          :class="
            checkPath('/users')
              ? ' bg-whitesecondCustom dark:bg-darksecondCustom '
              : ''
          "
          @click="$router.push({ name: 'adminusers' })"
        >
          <Groups /><span>Users</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
