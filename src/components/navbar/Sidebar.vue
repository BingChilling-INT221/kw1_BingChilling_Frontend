<script setup>
import {useRoute} from "vue-router";
import Ann from "../icons/Ann.vue";
import Groups from "../icons/Groups.vue";
import {useUsersStore} from "@/stores/user";

const userStore = useUsersStore();
const route = useRoute();
const checkPath = (path) => {
  // console.log(route.path, path, route.path.endsWith(path));
  return route.path.endsWith(path);
};

const CheckRole = (reqrole) => {
  return userStore.role === reqrole;
};

const props = defineProps(["showSidebar"]);

</script>

<template>

  <div class="w-full bg-bgNav h-auto fixed">
    <div class="lg:absolute w-[320px] pt-[3.75rem] min-h-screen lg:block" :class="showSidebar ? `block` : `hidden`">
      <div class="w-10/12 mt-1 ml-4 space-y-2">
        <button
            :class="
            checkPath('/viewer')
              ? 'bg-darksecondCustom '
              : ''
          "
            class="flex items-center w-full px-4 py-2 optionSidebar rounded-xl"
            @click="$router.push({ name: 'viewer' })"
        >
          <Ann/>
          <span
              :class="checkPath('/viewer') ? `bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text tracking-tight text-transparent`: `text-header2`"
              class="ann-menu "> Announcement (viewer)</span>
        </button>
        <button
             v-if="CheckRole('announcer') || CheckRole('admin')"
            :class="
            checkPath('/admin/announcement')
              ? ' bg-darksecondCustom  '
              : ''
          "
            class="flex items-center w-full px-4 py-2 optionSidebar rounded-xl"
            @click="$router.push({ name: 'adminhomepage' })"
        >
          <Ann/>
          <span
              :class="checkPath('/admin/announcement') ? `bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text tracking-tight text-transparent`: `text-header2`"
              class="ann-menu">Announcement</span>
        </button>
        <button
            v-if="CheckRole('admin')"
            :class="
            checkPath('/user')
              ? ' bg-darksecondCustom  '
              : ''
          "
            class="flex items-center w-full px-4 py-2 optionSidebar rounded-xl"
            @click="$router.push({ name: 'adminuserpage' })"
        >
          <Groups/>
          <span
              :class="checkPath('/user') ? `bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text tracking-tight text-transparent`: `text-header2`"
              class="ann-menu">User</span>
        </button>
        <button
            v-if="CheckRole('admin')"
            :class="
            checkPath('/match')
              ? ' bg-darksecondCustom  '
              : ''
          "
            class="flex items-center w-full px-4 py-2 optionSidebar rounded-xl"
            @click="$router.push({ name: 'matchpassword' })"
        >
          <Groups/>
          <span
              :class="checkPath('/match') ? `bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text tracking-tight text-transparent`: `text-header2`"
              class="ann-menu">Match Password</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
