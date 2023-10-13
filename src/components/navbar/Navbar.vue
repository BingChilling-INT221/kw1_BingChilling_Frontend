<script setup>
import {computed, ref} from "vue";
import Menu from "../icons/Menu.vue";
import SearchBox from "./SearchBox.vue";
import {useRoute} from "vue-router";
import router from "@/router";

const route = useRoute();
const users = ref([]);
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
    <div
        class="lg:h-[3.75rem] h-14 flex basis-full  bg-bgNav text-header2 px-6 py-3"
    >
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
          <SearchBox class="hidden  lg:block"/>
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
  </div>
</template>

<style scoped></style>
