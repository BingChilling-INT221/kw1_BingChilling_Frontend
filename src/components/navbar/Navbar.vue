<script setup>
import {computed, inject, ref} from "vue";
import Menu from "../icons/Menu.vue";
import SearchBox from "./SearchBox.vue";
import {useRoute} from "vue-router";
import router from "@/router";
import Search_light from "../icons/Search_light.vue";

const route = useRoute();
const users = ref([]);
const role = inject("role")
const isSearch = ref(false);
const token = ref(localStorage.getItem("token") || "");
const username = localStorage.getItem("username");
const checkAdmin = () => {
  return route.path.includes("/admin");
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("username")
  localStorage.removeItem("role")
  window.location.reload();
};
const login = () => {
  router.push({name: "login"});
};
const isLogin = computed(() => {
  if (!token.value) {
    return false;
  } else {
    return true;
  }
});
</script>

<template>
  <div class="">
    <div class="lg:h-[3.75rem] h-14 flex basis-full  bg-bgNav text-header2 px-6 py-3">
      <div class="flex items-center basis-full justify-between ">

        <div
            class="flex  space-x-2 items-center cursor-pointer "
            @click="$router.push({ name: 'mainpage' })"
        >
          <div class="flex items-center cursor-pointer text-white ">
            <!--            <div class="rounded-full w-[16px] h-[16px] bg-green-500"></div>-->
            <!--            <button-->
            <!--                class=" text-2xl cursor-pointer font-semibold lg:hidden ann-app-title"-->
            <!--            >-->
            <!--              SAS-->
            <!--            </button>-->
            <button
                class=" text-xl lg:text-3xl cursor-pointer font-bold  ann-app-title "
            >
              SIT <span
                class="bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text tracking-tight text-transparent ">Announcement System</span>
            </button>
          </div>
        </div>
        <div class="flex justify-center align-middle">
          <SearchBox class="hidden lg:block" @click="isSearch = true"/>
          <div v-if="checkAdmin()" class="flex items-center justify-end space-x-4 grow">
            <div class="hidden md:block">{{ username }}</div>
            <div class="hidden md:block">
              <button v-if="!isLogin" @click="login">Log in</button>
              <button v-if="isLogin" @click="logout">Log out</button>
            </div>
          </div>
          <div v-else class=" flex">
            <div class="cursor-pointer m-auto hidden lg:inline-block " @click="login">admin page</div>
            <div class="cursor-pointer">
              <Menu class="lg:hidden"/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-slate-800 fixed w-full h-full m-auto top-0 search-page" :class="{ 'hidden': !isSearch }">
      <div class="relative h-full p-4 lg:p-10 max-w-[1000px] m-auto">
        <div class="flex justify-end">
          <button class="text-white rounded-lg text-sm px-5 py-2.5 text-center mb-2 bg-red-500" @click="isSearch = false">Close</button>
        </div>
        <div>
          <div class="relative">
            <div class="absolute flex items-center m-auto">
              <Search_light/>
            </div>
            <input type="search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-500 rounded-lg bg-gray-700" placeholder="Search For Announcements">
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.search-page {
  animation: fade-in 0.5s ease-in-out;
}

@keyframes fade-in {
  0%    { opacity: 0; }
  100%  { opacity: 1; }
}



</style>
