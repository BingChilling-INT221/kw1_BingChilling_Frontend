<script setup>
import {computed, ref} from "vue";
import Menu from "../icons/Menu.vue";
import SearchBox from "./SearchBox.vue";
import {useRoute} from "vue-router";
import router from "@/router";
import Search_light from "../icons/Search_light.vue";

const route = useRoute();
const users = ref([]);
const isSearch = ref(false);
const token = ref(localStorage.getItem("token") || "");
const username = localStorage.getItem("username");
const checkAdmin = () => {
  return route.path.includes("/admin");
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("username");
  localStorage.removeItem("role");
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
    <div
        class="lg:h-[3.75rem] h-14 flex basis-full bg-bgNav text-header2 px-6 py-3"
    >
      <div class="flex items-center justify-between basis-full">
        <div
            class="flex items-center space-x-2 cursor-pointer"
            @click="$router.push({ name: 'mainpage' })"
        >
          <div class="flex items-center text-white cursor-pointer">
            <!--            <div class="rounded-full w-[16px] h-[16px] bg-green-500"></div>-->
            <!--            <button-->
            <!--                class="text-2xl font-semibold cursor-pointer lg:hidden ann-app-title"-->
            <!--            >-->
            <!--              SAS-->
            <!--            </button>-->
            <button
                class="text-xl font-bold cursor-pointer lg:text-3xl ann-app-title"
            >
              SIT
              <span
                  class="tracking-tight text-transparent bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text"
              >Announcement System</span
              >
            </button>
          </div>
        </div>
        <div class="flex justify-center align-middle">
          <SearchBox class="hidden lg:block" @click="isSearch = true"/>
          <div
              v-if="checkAdmin()"
              class="flex items-center justify-end space-x-4 grow"
          >
            <div class="hidden md:block">{{ username }}</div>
            <div class="hidden md:block">
              <button v-if="!isLogin" @click="login">Log in</button>
              <button v-if="isLogin" @click="logout">Log out</button>
            </div>
          </div>
          <div v-else class="flex">
            <div
                class="hidden m-auto cursor-pointer lg:inline-block"
                @click="login"
            >
              admin page
            </div>
            <div class="cursor-pointer">
              <Menu class="lg:hidden"/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
        :class="{ hidden: !isSearch }"
        class="fixed top-0 w-full h-full m-auto bg-slate-800 search-page"
    >
      <div class="relative h-full p-4 lg:p-10 max-w-[1000px] m-auto">
        <div class="flex justify-end">
          <button
              class="text-white rounded-lg text-sm px-5 py-2.5 text-center mb-2 bg-red-500"
              @click="isSearch = false"
          >
            Close
          </button>
        </div>
        <div>
          <div class="relative">
            <div class="absolute flex items-center m-auto">
              <Search_light/>
            </div>
            <input
                class="block w-full p-4 pl-10 text-sm text-gray-900 bg-gray-700 border border-gray-500 rounded-lg"
                placeholder="Search For Announcements"
                type="search"
            />
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
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
