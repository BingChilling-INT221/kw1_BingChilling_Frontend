<script setup>
import {ref} from "vue";
import {fetchCreateToken} from "@/services/authorizationApi.js";
import {useRouter} from "vue-router";
import jwtDecode from "jwt-decode";

const username = ref("");
const password = ref("");

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
      console.log("token");
      console.log(token);
      const payload = jwtDecode(token.value);
      localStorage.setItem("role", payload.role);
      localStorage.setItem("username", payload.username);
      setTimeout(() => rou.push({name: "adminhomepage"}), 1200);
    } else if (response.status === 401) {
      status.value = 401;
      password.value = ""
    } else if (response.status === 404) {
      status.value = 404;
    }
  } catch (err) {
    console.log("hi4", err);
    // alert(err);
  }
};


</script>

<template>
  <div class="w-full h-screen cursor-default">
    <div class="my-12 pt-12">
      <div class="container  m-auto ">
        <div class="items-center justify-center flex mx-2">
          <div class="w-[400px]
       bg-bgNav rounded-md  p-6">
            <div class="mt-2 text-center">
              <h5 class="text-headerAdmin text-base">Welcome Back !</h5>
              <h1 class="text-sm text-header2">Sign in to continue to Admin.</h1>
            </div>
            <div class="mt-6 p-2 text-header2">
              <form class="w-full" @submit="sendSubmit">
                <div class="flex flex-col space-y-4 text-lg">
                  <div class="flex flex-row text-sm">
                    <p>Username</p>
                  </div>
                  <input
                      v-model="username"
                      autocomplete="username"
                      class="px-3 py-2 rounded-sm ann-title bg-inputAdmin ann-username border-[1px] border-borderInputAdmin leading-10 text-xs outline-none"
                      maxlength="45"
                      placeholder="Enter your username"
                      required
                      type="text"
                  />
                  <div class="flex flex-col space-y-2 text-lg">
                    <div class="flex flex-row text-sm justify-between ">
                      <p>Password</p>
                      <p>Forgot password?</p>
                    </div>
                    <input
                        v-model="password"
                        autocomplete="current-password"
                        class="px-3 py-2 rounded-sm ann-title bg-inputAdmin ann-password border-[1px] border-borderInputAdmin leading-10 text-xs outline-none"
                        maxlength="14"
                        placeholder="Enter your password"
                        required
                        type="password"
                    />
                  </div>
                </div>
                <div class="flex mt-4 justify-end">
                  <button
                      class="px-4 py-2 rounded-md ann-button leading-6 bg-headerAdmin text-white text-sm"
                  >
                    Log In
                  </button>

                </div>

                <div class="flex flex-col items-center space-y-5">
                  <div class="flex w-3/4 ann-message">
                    <div
                        v-if="status == 200"

                    >
                      <div class="alert alert-success fixed top-0 w-full left-0">
                        <div>
                          <svg class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"
                               xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"/>
                          </svg>
                          <span>Login Successful</span>
                        </div>
                      </div>
                      <!--                      <p class="text-2xl">Login Successful</p>-->
                    </div>
                    <div
                        v-if="status == 401"

                    >
                      <div class="alert alert-error fixed top-0 w-full left-0">
                        <div>
                          <svg class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"
                               xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"/>
                          </svg>
                          <span>Password Incorrect</span>
                        </div>
                      </div>
                      <!--                      <p class="text-2xl"></p>-->
                    </div>
                    <div
                        v-if="status == 404"

                    >
                      <div class="alert alert-error fixed top-0 w-full left-0">
                        <div>
                          <svg class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"
                               xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"/>
                          </svg>
                          <span>A user with the specified username DOES NOT exist</span>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                <div class="text-sm text-center mt-4">Don't have an account ? <span class="text-white cursor-pointer">Sign in Here!</span>
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
