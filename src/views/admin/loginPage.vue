<script setup>
import { ref } from "vue";
import {
  fetchCreateToken,
  sendTokenToSpringBoot,
} from "@/services/authorizationApi.js";
import { useRouter } from "vue-router";
import { useUsersStore } from "@/stores/user.js";
import Router from "@/router";

const username = ref("");
const password = ref("");

const status = ref("");
const rou = useRouter();
const usersStore = useUsersStore();
const sendSubmit = async (event) => {
  event.preventDefault();
  const sendData = {
    username: username.value,
    password: password.value,
  };
  try {
    const response = await fetchCreateToken(sendData);
    if (response.status === 200) {
      status.value = 200;
      console.log("hi1", response);
      setTimeout(() => rou.push({ name: "adminhomepage" }), 1200);
    } else if (response.status === 401) {
      status.value = 401;
      password.value = "";
    } else if (response.status === 404) {
      status.value = 404;
    }
  } catch (err) {
    console.log("hi4", err);
    // alert(err);
  }
};
import { PublicClientApplication } from "@azure/msal-browser";
import { onMounted } from "vue";

const msalConfig = {
  auth: {
    clientId:`${process.env.VUE_APP_CLIENT_ID}`,
    authority:
      `https://login.microsoftonline.com/${process.env.VUE_APP_TENANT_ID}}`,
    // redirectUri: "https://intproj22.sit.kmutt.ac.th/kw1", // Redirect URI ของแอปพลิเคชัน Vue 3
    redirectUri: "/",
  },
};

const msalInstance = new PublicClientApplication(msalConfig);
onMounted(async () => {
  await msalInstance.initialize();
});

// เมื่อผู้ใช้กด login
async function loginWithMicrosoft(event) {
  event.preventDefault();
  try {
    const loginRequest = {
      scopes: ["user.Read"], // scopes ที่ต้องการเข้าถึง,
      prompt: "select_account", // ให้เลือก account ทุกครั้งที่ login
    };
    const response = await msalInstance.loginPopup(loginRequest);
    const accessToken = response.accessToken; // Access token ที่ได้จากการ login

    // ส่ง accessToken ไปยัง Spring Boot backend
    console.log(accessToken);
    const responseFromSpringBoot = await sendTokenToSpringBoot(accessToken);
    console.log(responseFromSpringBoot);
    if (responseFromSpringBoot.status === 200) {
      status.value = 200;
      console.log("hi1", responseFromSpringBoot);
      if (usersStore.role === "admin" || usersStore.role === "announcer") {
        setTimeout(() => rou.push({ name: "adminhomepage" }), 1200);
      } else {
        setTimeout(() => rou.push({ name: "mainpage" }), 1200);
      }
    } else if (responseFromSpringBoot.status === 401) {
      status.value = 401;
      password.value = "";
    } else if (responseFromSpringBoot.status === 404) {
      status.value = 404;
    }
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <div class="w-full h-screen overflow-hidden cursor-default">
    <div class="pt-12 my-12">
      <div class="container m-auto">
        <div class="flex items-center justify-center mx-2">
          <div class="w-[400px] bg-bgNav rounded-md p-6">
            <div class="mt-2 text-center">
              <h5 class="text-base text-headerAdmin">Welcome Back !</h5>
              <h1 class="text-sm text-header2">
                Sign in to continue to Admin.
              </h1>
            </div>
            <div class="p-2 mt-6 text-header2">
              <form class="w-full" @submit="sendSubmit">
                <div class="flex flex-col space-y-4 text-lg">
                  <div class="flex flex-row text-sm">
                    <p>Username</p>
                  </div>
                  <input v-model="username" autocomplete="username"
                    class="px-3 py-2 rounded-sm ann-title bg-gray-700 ann-username border-[1px] border-borderInputAdmin leading-10 text-xs outline-none"
                    maxlength="45" placeholder="Enter your username" required type="text" />
                  <div class="flex flex-col space-y-2 text-lg">
                    <div class="flex flex-row justify-between text-sm">
                      <p>Password</p>
                      <p>Forgot password?</p>
                    </div>
                    <input v-model="password" autocomplete="current-password"
                      class="px-3 py-2 rounded-sm ann-title bg-gray-700 ann-password border-[1px] border-borderInputAdmin leading-10 text-xs outline-none"
                      maxlength="14" placeholder="Enter your password" required type="password" />
                  </div>
                </div>
                <div class="flex flex-col space-y-4">
                  <div class="flex justify-center mt-4">
                    <button
                      class="px-4 py-2 text-sm leading-6 text-white rounded-md ann-button bg-blue-500 hover:bg-blue-600 transition duration-300">
                      Log in
                    </button>
                  </div>
                  <div class="flex items-center justify-center">
                    <div class="w-full border-t-[1px] border-gray-400"></div>
                    <p class="px-3 z-10 text-header2">Or</p>
                    <div class="w-full border-t-[1px] border-gray-400"></div>
                  </div>

                  <div class="flex justify-center">
                    <button @click="loginWithMicrosoft"
                      class="px-4 py-2 bg-headerAdmin text-white rounded-md hover:bg-blue-700 transition duration-300 flex flex-row">
                      <img src="../../assets/images/teamsicon.png" alt="Microsoft Logo" class="w-6 h-6 mr-2" />
                      Login with Microsoft
                    </button>

                  </div>
                </div>


                <div class="flex flex-col items-center space-y-5">
                  <div class="flex w-3/4 ann-message">
                    <div v-if="status === 200">
                      <div class="fixed top-0 left-0 w-full alert alert-success">
                        <div class="flex flex-row">
                          <svg class="w-6 h-6 stroke-current shrink-0" fill="none" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round"
                              stroke-linejoin="round" stroke-width="2" />
                          </svg>
                          <span class="my-auto">Login Successful</span>
                        </div>
                      </div>
                      <!--                      <p class="text-2xl">Login Successful</p>-->
                    </div>
                    <div v-if="status === 401">
                      <div class="fixed top-0 left-0 w-full alert alert-error">
                        <div class="flex flex-row">
                          <svg class="w-6 h-6 stroke-current shrink-0" fill="none" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round"
                              stroke-linejoin="round" stroke-width="2" />
                          </svg>
                          <span class="my-auto">Password Incorrect</span>
                        </div>
                      </div>
                      <!--                      <p class="text-2xl"></p>-->
                    </div>
                    <div v-if="status === 404">
                      <div class="fixed top-0 left-0 w-full alert alert-error">
                        <div class="flex flex-row">
                          <svg class="w-6 h-6 stroke-current shrink-0" fill="none" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round"
                              stroke-linejoin="round" stroke-width="2" />
                          </svg>
                          <span class="my-auto">A user with the specified username DOES NOT
                            exist</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-4 text-sm text-center">
                  Don't have an account ?
                  <span class="text-white cursor-pointer" @click="Router.push({ name: 'register' })">Register here
                    !</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
