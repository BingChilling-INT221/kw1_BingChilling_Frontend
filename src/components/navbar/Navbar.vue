<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import { useUsersStore } from "@/stores/user";
import Menu from '../icons/Menu.vue'
import Account from '../icons/Account.vue'

const userStore = useUsersStore()
const route = useRoute();
const users = ref([]);
const isSearch = ref(false);
const checkAdmin = () => {
  return route.path.includes("/admin");
};
const checkRole = () => {
  const role = userStore.role
  console.log(role)
  return role == "admin" || role == "announcer"
}
const logout = async () => {
  userStore.logout()
  await router.push({ name: "mainpage" });
};
const login = () => {
  router.push({ name: "login" });
  showAcc.value = false
};
const isLogin = computed(() => {
  return userStore.token;
});
const emit = defineEmits();
const showSidebar = ref(false);
const showAcc = ref(false)

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
  emit('toggle-sidebar', showSidebar.value);
};

const toggleShowAcc = () => {
  showAcc.value = !showAcc.value
}

const checkPath = (path) => {
  // console.log(route.path, path, route.path.endsWith(path));
  return route.path.includes(path);
};
</script>

<template>
  <div class="">
    <div class="lg:h-[3.75rem] h-14 flex basis-full bg-bgNav text-header2 lg:px-6 lg:py-3 justify-between">
      <div class="flex items-center basis-full" :class="
            checkPath('/admin')
              ? 'justify-between'
              : 'justify-around lg:justify-between'
          ">
        <button class="lg:hidden pl-3" @click="toggleSidebar" :class="
            checkPath('/admin')
              ? 'block '
              : 'hidden'
          ">
          <Menu />
        </button>
        <div class="cursor-pointer" @click="$router.push({ name: 'mainpage' })">
          <div class="flex text-white cursor-pointer">
            <!--            <div class="rounded-full w-[16px] h-[16px] bg-green-500"></div>-->
            <!--            <button-->
            <!--                class="text-2xl font-semibold cursor-pointer lg:hidden ann-app-title"-->
            <!--            >-->
            <!--              SAS-->
            <!--            </button>-->
            <button class="text-base font-bold cursor-pointer lg:text-3xl ann-app-title">
              SIT
              <span
                class="tracking-tight text-transparent bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text">Announcement
                System</span>
            </button>
          </div>
        </div>
        <button class="lg:hidden" @click="toggleShowAcc">
          <Account />
        </button>
        <div class="align-middle lg:block hidden">
          <div class="flex items-center justify-end space-x-4 grow">
            <div v-if="checkRole()" class="flex items-center justify-end space-x-4 grow">
              <div class=" m-auto cursor-pointer lg:inline-block" @click="login">
                admin page
              </div>
            </div>
            <div>{{ userStore.username }}</div>
            <div>
              <button v-if="!isLogin" @click="login">Log in</button>
              <button v-if="isLogin" @click="logout">Log out</button>
            </div>
            <!--          <SearchBox class="hidden lg:block" @click="isSearch = true"/>-->
            <!--          <div-->
            <!--              v-if="checkAdmin()"-->
            <!--              class="flex items-center justify-end space-x-4 grow"-->
            <!--          >-->
            <!--            <div class="hidden md:block">{{ userStore.username }}</div>-->
            <!--            <div class="hidden md:block">-->
            <!--              <button v-if="!isLogin" @click="login">Log in</button>-->
            <!--              <button v-if="isLogin" @click="logout">Log out</button>-->
            <!--            </div>-->
            <!--          </div>-->
            <!--          <div v-else class="flex">-->
            <!--            <div-->
            <!--                class="hidden m-auto cursor-pointer lg:inline-block"-->
            <!--                @click="login"-->
            <!--            >-->
            <!--              admin page-->
            <!--            </div>-->
            <!--            <div class="cursor-pointer">-->
            <!--              <Menu class="lg:hidden"/>-->
            <!--            </div>-->
          </div>
        </div>


      </div>
    </div>

    <!-- <div-->
    <!--        :class="{ hidden: !isSearch }"-->
    <!--        class="fixed top-0 w-full h-full m-auto bg-slate-800 search-page"-->
    <!--    >-->
    <!--      <div class="relative h-full p-4 lg:p-10 max-w-[1000px] m-auto">-->
    <!--        <div class="flex justify-end">-->
    <!--          <button-->
    <!--              class="text-white rounded-lg text-sm px-5 py-2.5 text-center mb-2 bg-red-500"-->
    <!--              @click="isSearch = false"-->
    <!--          >-->
    <!--            Close-->
    <!--          </button>-->
    <!--        </div>-->
    <!--        <div>-->
    <!--          <div class="relative">-->
    <!--            <div class="absolute flex items-center m-auto">-->
    <!--              <Search_light/>-->
    <!--            </div>-->
    <!--            <input-->
    <!--                class="block w-full p-4 pl-10 text-sm text-gray-900 bg-gray-700 border border-gray-500 rounded-lg"-->
    <!--                placeholder="Search For Announcements"-->
    <!--                type="search"-->
    <!--            />-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div> -->

    <div :class="{ hidden: !showAcc }" class="fixed top-0 w-full h-full flex items-center justify-center bg-slate-800">
      <div class="relative p-4 lg:p-10 max-w-[1000px] m-auto">
        <div class="align-middle lg:hidden ">
          <div class="flex items-center grow flex-col space-y-4 text-2xl content">
            <div v-if="checkRole()" class="flex items-center">
              <div class=" m-auto cursor-pointer lg:inline-block" @click="login">
                admin page
              </div>
            </div>
            <div>{{ userStore.username }}</div>
            <div>
              <button v-if="!isLogin" @click="login">Log in</button>
              <button v-if="isLogin" @click="logout">Log out</button>
            </div>
            <button class="text-white rounded-lg px-5 py-2.5 text-center mb-2" @click="showAcc = false">Close</button>
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
