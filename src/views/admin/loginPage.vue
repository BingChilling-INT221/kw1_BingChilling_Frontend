<script setup>
import { provide, ref } from "vue";
import { fetchCreateToken } from "../../services/api.js";
import { useRouter } from "vue-router";

const username = ref("sanit");
const password = ref("Sasadmin22*");

const status = ref("");
const rou = useRouter();
const token = ref("");
const refreshToken = ref("");
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
      const result = await response.json();
      token.value = result.token;
      refreshToken.value = result.refreshToken;
      console.log("hi", token.value, "\n", refreshToken.value);
      localStorage.setItem("token", `Bearer ${token.value}`);
      localStorage.setItem("refreshToken", `Bearer ${refreshToken.value}`);
      rou.push({name: "adminhomepage"});
    } else if (response.status === 401) {
      status.value = 401;
      console.log("hi2", response);
    } else if (response.status === 404) {
      status.value = 404;
      console.log("hi3", response);
    } else {
      console.log("hihi", response);
    }
  } catch (err) {
    console.log("hi4", response);
    alert(err);
  }
};



provide(/* key */ "role", /* value */ "admin");
</script>

<template>
  <div class="w-full">
    <!-- <format_page> -->

    <form class="w-full" @submit="sendSubmit">
      <div class="flex flex-col items-center pt-20 space-y-5">
        <div class="flex w-3/4 ann-message">
          <div
            v-if="status == 200"
            class="p-6 text-green-500 bg-green-200 border-green-500 rounded-xl"
          >
            <p class="text-2xl">Password Matched</p>
          </div>
          <div
            v-if="status == 401"
            class="p-6 text-red-500 bg-red-200 border-red-500 rounded-xl"
          >
            <p class="text-2xl">Password NOT Matched</p>
          </div>
          <div
            v-if="status == 404"
            class="p-6 text-red-500 bg-red-200 border-red-500 rounded-xl"
          >
            <p class="text-2xl">The specified username DOES NOT exist</p>
          </div>
        </div>

        <div class="flex flex-row w-3/4 rounded-lg">
          <div class="flex flex-col w-3/4 p-5 space-y-5 border-2 rounded-md">
            <div class="flex text-4xl">
              <p>Login</p>
            </div>
            <div class="flex flex-col space-y-2 text-lg">
              <div class="flex flex-row w-3/4">
                <p>Username</p>
              </div>
              <input
                v-model="username"
                class="w-3/4 px-2 py-2 rounded-md ann-title bg-whitesecondCustom dark:bg-darksecondCustom ann-username"
                type="text"
                maxlength="45"
                required
              />
            </div>
            <div class="flex flex-col space-y-2 text-lg">
              <div class="flex flex-row w-3/4">
                <p>Password</p>
              </div>
              <input
                v-model="password"
                class="w-3/4 px-2 py-2 rounded-md ann-title bg-whitesecondCustom dark:bg-darksecondCustom ann-password"
                type="password"
                maxlength="14"
                required
              />
            </div>
            <div class="flex">
              <button
                class="px-4 py-2 rounded-md ann-button bg-gray-50 dark:bg-gray-700 submit"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
    <!-- </format_page> -->
  </div>
</template>

<style scoped></style>
