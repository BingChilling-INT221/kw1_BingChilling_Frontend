<script setup>
import {ref} from "vue";
import format_page from "@/components/format_page.vue";
import {fetchMatch} from "@/services/authorizationApi";

const username = ref("");
const password = ref("");
const status = ref("");

const sendSubmit = async (event) => {
  event.preventDefault();
  const sendData = {
    username: username.value,
    password: password.value,
  };
  try {
    const response = await fetchMatch(sendData);
    if (response.status === 200) {
      status.value = 200
    } else if (response.status === 401) {
      status.value = 401
    } else if (response.status === 404) {
      status.value = 404
    }
  } catch (err) {
    alert(err);
  }
};

</script>

<template>
  <div class="w-full">
    <format_page>

      <form class="w-full" @submit="sendSubmit">
        <div class="flex flex-col space-y-5 items-center pt-20">
          <div class="flex w-3/4 ann-message">
            <div v-if="status == 200" class="p-6  text-green-500 bg-green-200 border-green-500 rounded-xl">
              <p class="text-2xl">Password Matched</p>
            </div>
            <div v-if="status == 401" class="p-6 text-red-500 bg-red-200 border-red-500 rounded-xl">
              <p class="text-2xl">Password NOT Matched</p>
            </div>
            <div v-if="status == 404" class="p-6  text-red-500 bg-red-200 border-red-500 rounded-xl">
              <p class="text-2xl">The specified username DOES NOT exist</p>
            </div>
          </div>

          <div class="flex flex-row rounded-lg w-3/4">
            <div class="flex flex-col space-y-5 w-3/4 p-5 border-2 rounded-md">
              <div class="flex text-4xl">
                <p>Match password</p>
              </div>
              <div class="text-lg flex flex-col space-y-2">
                <div class="flex flex-row w-3/4">
                  <p>Username</p>
                </div>
                <input
                    v-model="username"
                    class="rounded-md w-3/4 ann-title bg-bgNav py-2 px-2 ann-username"
                    maxlength="45"
                    required
                    type="text"
                />
              </div>
              <div class="text-lg flex flex-col space-y-2">
                <div class="flex flex-row w-3/4">
                  <p>Password</p>
                </div>
                <input
                    v-model="password"
                    class="rounded-md w-3/4 ann-title bg-bgNav py-2 px-2 ann-password"
                    maxlength="14"
                    required
                    type="password"
                />
              </div>
              <div class="flex">
                <button
                    class="ann-button px-4 py-2 rounded-md bg-gray-50 dark:bg-gray-700 submit"
                >
                  Match or not
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </format_page>
  </div>
</template>

<style scoped></style>
