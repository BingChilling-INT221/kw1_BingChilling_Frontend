<script setup>
import {computed, ref, watch, watchEffect} from "vue";
import {useRoute, useRouter} from "vue-router";
import {fetchCreateUser, fetchUpdateUser,} from "@/services/userApi";

const route = useRoute();

const props = defineProps({
  updatePackage: {
    type: Object,
  },
});

const checkAddOrEdit = ref(false);

const router = useRouter();

const updateCheck = ref(false);
watch(
    () => props.updatePackage,
    (newv) => {
      console.log(JSON.stringify(newv).length);
      if (JSON.stringify(newv).length > 0) {
        updateCheck.value = true;
        checkAddOrEdit.value = true;
        updateInit();
      } else {
        console.log("no update");
        updateCheck.value = false;
        checkAddOrEdit.value = false;
      }
    }
);


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

const pwdIsMatch = ref(true);

// const validPwd = () => {
//   pwdIsValid.value = conpassword.value.trim() !== "";
// }

const updateInit = () => {
  username.value = props.updatePackage.username;
  name.value = props.updatePackage.name;
  email.value = props.updatePackage.email;
  role.value = props.updatePackage.role;
  createdOn.value = props.updatePackage.createdOn;
  updatedOn.value = props.updatePackage.updatedOn;
};

const usernameCheck = ref(false)

watch(username.value, (newUsername, oldUsername) => {
  if (newUsername !== oldUsername) {
    usernameCheck.value = true;
  }
})
// const validPwdMatch = () => {
//   pwdIsMatch.value = password.value === conpassword.value;
// };

const errm = ref();
const sendSubmit = async (event) => {

  event.preventDefault();
  trim();
  const sendPackage = {
    username: username.value,
    name: name.value,
    email: email.value,
    role: role.value,
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
        console.log(JSON.stringify(sendPackage));
        const response = await fetchUpdateUser(sendPackage, route);
        if (response.status === 200) {
          alert("update user success");
          await router.push({name: `adminuserpage`});
        } else if (response.status === 200 && usernameCheck.value) {
          router.push({name: "login"});
        } else {
          console.log(response);
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
        console.log(JSON.stringify(sendPackage));
        const response = await fetchCreateUser(sendPackage);
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

const checkEmail = (value) => {
  if (/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(value)) {
    msg.value["email"] = "";
    return false;
  } else if (email.value === "") {
    msg.value["email"] = "";
    return false;
  } else {
    msg.value["email"] = "please type the email form in this box";
    return true;
  }
};

const checkPassword = (value) => {
  if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value
      )
  ) {
    msg.value["password"] = "";
    return false;
  } else if (password.value === "") {
    msg.value["password"] = "";
    return false;
  } else {
    msg.value["password"] =
        "Password must be at least 8 character and must contain 1 special character, 1 digit and Uppercase,Lowercase Character";
    return true;
  }
};

const checkpwdMatch = () => {
  if (password.value === conpassword.value) {
    msg.value["conpassword"] = "";
    return false;
  } else if (conpassword.value === "") {
    msg.value["conpassword"] = "";
    return false;
  } else {
    msg.value["conpassword"] = "Password not match!!";
    return true;
  }
};

// const allFieldsEmpty = computed(() => {
//   return (
//     // checkEmail(email.value) ||
//     (!checkAddOrEdit
//       ? false : 
//         checkpwdMatch(conpassword.value))
//       // : password.value === "" ||
//       //   checkPassword(password.value) ||
//       // conpassword.value === "" ||

//   );
// });

watchEffect(() => {
  // if (email.value !== "") {
  //   checkEmail(email.value);
  // } else if (email.value === "") {
  //   msg.value["email"] = "";
  // }
  // if (password.value !== "") {
  //   checkPassword(password.value);
  // } else if (password.value === "") {
  //   msg.value["password"] = "";
  // }
  // if (conpassword.value !== "") {
  //   checkpwdMatch(conpassword.value);
  // } else if (conpassword.value === "") {
  //   msg.value["conpassword"] = "";
  // }
});

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
  // if (password.value !== password.value.trim()) {
  //   password.value = password.value.trim();
  // }
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
  {{ errorMessages }}
  {{ status }}
  <form class="w-full" @submit="sendSubmit">
    <div class="flex flex-col space-y-5">
      <div class="text-4xl ml-4">
        <p>User Detail:</p>
      </div>
      <div class="flex flex-row rounded-lg w-3/4">
        <div class="flex flex-col space-y-5 w-full p-5">
          <div class="text-lg flex flex-col space-y-2">
            <div class="flex flex-row w-3/4">
              <p>Username</p>
              <div class="flex w-full justify-end">
                <p class="text-sm my-auto">
                  Remaining: {{ countusernameCharac }}
                </p>
              </div>
            </div>
            <input
                v-model="username"
                class="rounded-md w-3/4 ann-title bg-whitesecondCustom dark:bg-darksecondCustom py-2 px-2 ann-username"
                maxlength="45"
                required
                type="text"
            />
            <div
                v-if="status == 400 && errorUsername"
                class="text-red-500 my-auto pr-5"
            >
              <p class="text-base ann-error-username">{{ errorUsername }}</p>
            </div>
          </div>
          <div v-if="!checkAddOrEdit" class="text-lg flex flex-col space-y-2">
            <div class="flex flex-row w-3/4">
              <p>Password</p>
              <div class="flex w-full justify-end">
                <p class="text-sm my-auto">
                  Remaining: {{ countpasswordCharac }}
                </p>
              </div>
            </div>
            <input
                v-model="password"
                class="rounded-md w-3/4 ann-title bg-whitesecondCustom dark:bg-darksecondCustom py-2 px-2 ann-password"
                maxlength="14"
                required
                type="password"
            />
            <div
                v-if="errorPassword"
                class="text-red-500 my-auto pr-5"
            >
              <p class="text-base ann-error-password">{{ errorPassword }}</p>
            </div>
            <span v-if="msg.password" class="text-red-400 ">{{
                msg.password
              }}</span>
          </div>
          <div v-if="!checkAddOrEdit" class="text-lg flex flex-col space-y-2">
            <p>Confirm password</p>
            <input
                v-model="conpassword"
                class="rounded-md w-3/4 ann-title bg-whitesecondCustom dark:bg-darksecondCustom py-2 px-2 ann-confirm-password"
                maxlength="14"
                required
                type="password"
            />
            <span v-if="errorConfirm" class="text-red-400 ann-error-password">{{
                errorConfirm
              }}</span>
          </div>
          <div class="text-lg flex flex-col space-y-2">
            <div class="flex flex-row w-3/4">
              <p>Name</p>
              <div class="flex w-full justify-end">
                <p class="text-sm my-auto">Remaining: {{ countnameCharac }}</p>
              </div>
            </div>
            <input
                v-model="name"
                class="rounded-md w-3/4 ann-title bg-whitesecondCustom dark:bg-darksecondCustom py-2 px-2 ann-name"
                maxlength="100"
                required
                type="text"
            />
            <div
                v-if="status == 400 && errorName"
                class="text-red-500 my-auto pr-5"
            >
              <p class="text-base ann-error-name">{{ errorName }}</p>
            </div>
          </div>
          <div class="text-lg flex flex-col space-y-2">
            <div class="flex flex-row w-3/4">
              <p>Email</p>
              <div class="flex w-full justify-end">
                <p class="text-sm my-auto">Remaining: {{ countemailCharac }}</p>
              </div>
            </div>
            <input
                v-model="email"
                class="rounded-md w-3/4 ann-title bg-whitesecondCustom dark:bg-darksecondCustom py-2 px-2 ann-email"
                maxlength="150"
                required
                type="email"
            />
            <div
                v-if="status == 400 && errorEmail"
                class="text-red-500 my-auto pr-5"
            >
              <p class="text-base ann-error-email">{{ errorEmail }}</p>
            </div>
            <!-- <span v-if="msg.email" class="text-red-400">{{ msg.email }}</span> -->
          </div>
          <div class="text-lg flex flex-col space-y-2">
            <p>Role</p>
            <select
                v-model="role"
                class="w-1/4 bg-whitesecondCustom dark:bg-darksecondCustom rounded-md py-2 px-2 ann-role"
            >
              <option>admin</option>
              <option>announcer</option>
            </select>
          </div>
          <div v-show="checkAddOrEdit" class="flex flex-row space-x-2">
            <p class="font-bold">Created On</p>
            <p class="ann-created-on">{{ changeTime(createdOn) }}</p>
            <p class="font-bold">Updated On</p>
            <p class="ann-updated-on">{{ changeTime(updatedOn) }}</p>
          </div>

          <div class="flex flex-row space-x-4">
            <button
                :class="
                change || !updateCheck
                  ? 'dark:bg-gray-700'
                  : 'opacity-40 '
              "
                :disabled="!(change || !updateCheck)"
                class="px-4 py-2 rounded-md bg-gray-50 dark:bg-gray-700 submit ann-button"
            >
              save
            </button>
            <button
                class="px-4 py-2 rounded-md bg-gray-50 dark:bg-gray-700 ann-button"
                @click="$router.push({ name: 'adminuserpage' })"
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped></style>
