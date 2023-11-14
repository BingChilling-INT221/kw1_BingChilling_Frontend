<script setup>
import {computed, ref, watch, watchEffect} from "vue";
import {useRoute, useRouter} from "vue-router";
import {fetchCreateUserAnnouncer, fetchUpdateUser,} from "@/services/userApi";

const route = useRoute();


const checkAddOrEdit = ref(false);

const router = useRouter();

const updateCheck = ref(false);

const role = ref("announcer");
const username = ref("");
const password = ref("");
const conpassword = ref("");
const name = ref("");
const email = ref("");
const createdOn = ref("");
const updatedOn = ref("");
const msg = ref([]);
const errorMessages = ref([]);
const status = ref("");


const usernameCheck = ref(false)

watch(() => username.value, (newUsername, oldUsername) => {
  if (newUsername !== oldUsername) {
    usernameCheck.value = true;
  }
})

const errm = ref();
const sendSubmit = async (event) => {
  event.preventDefault();
  trim();
  const sendPackage = {
    username: username.value,
    name: name.value,
    email: email.value,
    password: password.value,
  };
  if (password.value !== conpassword.value) {
    // alert("Passwords do not match. Please make sure your passwords match.");
    errorConfirm.value = "The password DOES NOT match";
    conpassword.value = ""
  } else if (
      !updateCheck &&
      password.value === "" &&
      conpassword.value === ""
  ) {
    alert("Please enter a password");
  } else if ((password.value.length < 8 || password.value.length > 14) &&
      !updateCheck.value) {
    errorPassword.value = "Password size must be between 8 and 14"
    password.value = ""
    conpassword.value = ""
  } else {
    if (updateCheck.value) {
      try {
        delete sendPackage["password"];
        // console.log(JSON.stringify(sendPackage));
        const response = await fetchUpdateUser(sendPackage, route);
        if (response.status === 200) {
          alert("update user success");
          await router.push({name: `adminuserpage`});
        } else if (response.status === 200 && usernameCheck.value) {
          await router.push({name: "login"});
        } else {
          // console.log(response);
          alert("update user fail");
          if (response.status === 400) {
            status.value = 400;
          }
          errm.value = await response.json();
          if (errm.value.detail && errm.value.detail.length > 0) {
            const extractedErrors = [];
            for (const error of errm.value.detail) {
              extractedErrors.push(error);
            }
            errorMessages.value = extractedErrors;
          }
          // console.log(errm.value.message)
        }
      } catch (err) {
        alert(err);
      }
    } else {
      try {
        // console.log(JSON.stringify(sendPackage));
        const response = await fetchCreateUserAnnouncer(sendPackage);
        if (response.status === 200) {
          alert("Create user success");
          await router.push({name: `adminuserpage`});
        } else {
          alert("Create user fail");
          if (response.status === 400) {
            status.value = 400;
          }
          errm.value = await response.json();
          if (errm.value.detail && errm.value.detail.length > 0) {
            const extractedErrors = [];
            for (const error of errm.value.detail) {
              extractedErrors.push(error);
            }
            errorMessages.value = extractedErrors;
          }
          // console.log(errm.value.detail[0].errorMessage);
        }
      } catch (err) {
        alert(err);
      }
    }
  }
};

const compObj = computed(() => {
  return {
    username: username.value,
    name: name.value,
    email: email.value,
    role: role.value,
  };
});

let change = ref(false);

watch(
    () => compObj,
    () => {
      if (!updateCheck.value) return;
      change.value = false;
      msg.value["email"] = "";
      for (const property in compObj.value) {
        if (compObj.value[property] === undefined) continue;
        if (compObj.value[property] !== props.updatePackage[property]) {
          change.value = true;
          break;
        }
      }
    },
    {deep: true}
);

const changeTime = (time) => {
  if (time === null) {
    return "-";
  }
  const newDate = new Date(time);
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return `${
      newDate.toLocaleDateString("en-GB", options).replace(/,/gi, "") +
      ", " +
      newDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
  }`;
};


const countusernameCharac = computed(() => {
  const maxLength = 45;
  if (username.value === null) return maxLength;
  return maxLength - (username.value.length || 0);
});

const countpasswordCharac = computed(() => {
  const maxLength = 14;
  if (username.value === null) return maxLength;
  return maxLength - (password.value.length || 0);
});

const countnameCharac = computed(() => {
  const maxLength = 100;
  if (name.value === null) return maxLength;
  return maxLength - (name.value.length || 0);
});

const countemailCharac = computed(() => {
  const maxLength = 150;
  if (email.value === null) return maxLength;
  return maxLength - (email.value.length || 0);
});

const trim = () => {
  if (username.value !== username.value.trim()) {
    username.value = username.value.trim();
  }
  if (name.value !== name.value.trim()) {
    name.value = name.value.trim();
  }
  if (email.value !== email.value.trim()) {
    email.value = email.value.trim();
  }
};
let errorUsername = ref("");
let errorPassword = ref("");
let errorEmail = ref("");
let errorName = ref("");
let errorConfirm = ref("");
watchEffect(() => {
  // arrayError.value = ref([username, email, name])
  for (const error of errorMessages.value) {
    console.log(error);
    if (error.field === "username") {
      errorUsername.value = error.errorMessage;
    } else if (error.field === "email") {
      errorEmail.value = error.errorMessage;
    } else if (error.field === "name") {
      errorName.value = error.errorMessage;
    } else if (error.field === "password") {
      password.value = "";
      conpassword.value = "";
      errorPassword.value = error.errorMessage;
    }
  }
});
</script>

<template>
  <div class="w-full h-screen overflow-hidden cursor-default">
    <div class="flex pt-12 my-12">
      <div class="container m-auto ">
        <div class="flex items-center justify-center mx-2">
          <div class="w-[400px]
       bg-bgNav rounded-md  p-6">
            <div class="mt-2 text-center">
              <h5 class="text-base text-headerAdmin">Welcome Back !</h5>
              <h1 class="text-sm text-header2">Sign in to continue to Admin.</h1>
            </div>
            <div class="p-2 mt-6 text-header2">
              <form class="w-full" @submit="sendSubmit">
                <div class="flex flex-col space-y-4 text-lg ">
                  <div class="flex flex-row justify-between text-sm">
                    <p>Username</p>
                    <p> Remaining: {{ countusernameCharac }}</p>
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

                  <div
                      v-if="status == 400 && errorUsername"
                      class="pr-5 my-auto text-red-500"
                  >
                    <p class="text-base ann-error-username">{{ errorUsername }}</p>
                  </div>
                  <div class="flex flex-col space-y-2 text-lg">
                    <div class="flex flex-row justify-between text-sm ">
                      <p>Password</p>
                      <p>Remaining: {{ countpasswordCharac }}</p>
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

                    <div
                        v-if="errorPassword"
                        class="pr-5 my-auto text-red-500"
                    >
                      <p class="text-base ann-error-password">{{ errorPassword }}</p>
                    </div>
                    <span v-if="msg.password" class="text-red-400 ">{{
                        msg.password
                      }}</span>
                  </div>
                  <div class="flex flex-col space-y-2 text-lg">
                    <div class="flex flex-row justify-between text-sm ">
                      <p>Confirm password</p>
                    </div>
                    <input
                        v-model="conpassword"
                        autocomplete="current-password"
                        class="px-3 py-2 rounded-sm ann-title bg-inputAdmin ann-confirm-password border-[1px] border-borderInputAdmin leading-10 text-xs outline-none"
                        maxlength="14"
                        placeholder="Enter your password"
                        required
                        type="password"
                    />
                    <span v-if="errorConfirm" class="text-red-400 ann-error-password">{{
                        errorConfirm
                      }}</span>
                  </div>
                  <div class="flex flex-col space-y-2 text-lg">
                    <div class="flex flex-row justify-between text-sm ">
                      <p>Name</p>
                      <p> Remaining: {{ countnameCharac }}</p>
                    </div>
                    <input
                        v-model="name"
                        autocomplete="current-password"
                        class="px-3 py-2 rounded-sm ann-title bg-inputAdmin ann-name border-[1px] border-borderInputAdmin leading-10 text-xs outline-none"
                        maxlength="100"
                        placeholder="Enter your password"
                        required
                        type="text"
                    />
                    <div
                        v-if="status == 400 && errorName"
                        class="pr-5 my-auto text-red-500"
                    >
                      <p class="text-base ann-error-name">{{ errorName }}</p>
                    </div>
                  </div>
                  <div class="flex flex-col space-y-2 text-lg">
                    <div class="flex flex-row justify-between text-sm ">
                      <p>Email</p>
                      <p>Remaining: {{ countemailCharac }}</p>
                    </div>
                    <input
                        v-model="email"
                        autocomplete="current-password"
                        class="px-3 py-2 rounded-sm ann-title bg-inputAdmin ann-email border-[1px] border-borderInputAdmin leading-10 text-xs outline-none"
                        maxlength="150"
                        placeholder="Enter your password"
                        required
                        type="email"
                    />
                    <div
                        v-if="status == 400 && errorEmail"
                        class="pr-5 my-auto text-red-500"
                    >
                      <p class="text-base ann-error-email">{{ errorEmail }}</p>
                    </div>
                  </div>
                </div>
                <div class="flex justify-end mt-4">
                  <button
                      class="px-4 py-2 text-sm leading-6 text-white rounded-md ann-button bg-headerAdmin"
                  >
                    Register
                  </button>

                </div>

                <div class="flex flex-col items-center space-y-5">
                  <div class="flex w-3/4 ann-message">
                    <div
                        v-if="status == 200"

                    >
                      <div class="fixed top-0 left-0 w-full alert alert-success">
                        <div>
                          <svg class="w-6 h-6 stroke-current shrink-0" fill="none" viewBox="0 0 24 24"
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
                      <div class="fixed top-0 left-0 w-full alert alert-error">
                        <div>
                          <svg class="w-6 h-6 stroke-current shrink-0" fill="none" viewBox="0 0 24 24"
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
                      <div class="fixed top-0 left-0 w-full alert alert-error">
                        <div>
                          <svg class="w-6 h-6 stroke-current shrink-0" fill="none" viewBox="0 0 24 24"
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

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped></style>
