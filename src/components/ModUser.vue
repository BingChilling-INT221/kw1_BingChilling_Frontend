<script setup>
import { provide, ref, watch, computed, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  fetchUpdateUser,
  fetchCreateUser,
  fetchDeleteUser,
} from "../services/api.js";
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

// const validPwdMatch = () => {
//   pwdIsMatch.value = password.value === conpassword.value;
// };

const errm = ref();
const sendSubmit = async (event) => {
  event.preventDefault();

  const sendPackage = {
    username: username.value,
    name: name.value,
    email: email.value,
    role: role.value,
    password: password.value,
  };
  if (password.value !== conpassword.value) {
    alert("Passwords do not match. Please make sure your passwords match.");
  } else if(!updateCheck && password.value === "" && conpassword.value === "") {
    alert("Please enter a password");
  }else {
    if (updateCheck.value) {
      try {
        delete sendPackage["password"];
        console.log(JSON.stringify(sendPackage));
        const response = await fetchUpdateUser(sendPackage, route);
        if (response.status === 200) {
          alert("update user success");
          await router.push({ name: `adminuserpage` });
        } else {
          console.log(response);
          alert("update user fail");
          errm.value = await response.json();
          if (errm.value.detail && errm.value.detail.length > 0) {
            errm.value.detail.forEach((error) => {
              alert(error.errorMessage);
            });
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
          await router.push({ name: `adminuserpage` });
        } else {
          alert("Create user fail");
          errm.value = await response.json();
          if (errm.value.detail && errm.value.detail.length > 0) {
            errm.value.detail.forEach((error) => {
              if (error.errorMessage.includes("unique")) {
                alert(error.errorMessage);
              }
            });
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
  { deep: true }
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
    msg.value["password"] = "Password must be at least 8 character and must contain 1 special character, 1 digit and Uppercase,Lowercase Character";
    return true;
  }
};

const checkpwdMatch = () => {
  if (
    password.value === conpassword.value
  ) {
    msg.value["conpassword"] = "";
    return false;
  } else if (conpassword.value === "") {
    msg.value["conpassword"] = "";
    return false;
  } else {
    msg.value["conpassword"] = "Password not match!!";
    return true;
  }
}

const allFieldsEmpty = computed(() => {
  return (
    username.value === "" ||
    name.value === "" ||
    email.value === "" ||
    checkEmail(email.value) ||
    role.value === "" || (!checkAddOrEdit ? false : password.value === "" || checkPassword(password.value) || conpassword.value === "" || checkpwdMatch(conpassword.value) ) 
  );
});

watchEffect(() => {
  if (email.value !== "") {
    checkEmail(email.value);
  } else if (email.value === "") {
    msg.value["email"] = "";
  }
  if (password.value !== "") {
    checkPassword(password.value);
  } else if (password.value === "") {
    msg.value["password"] = "";
  }
  if (conpassword.value !== "") {
    checkpwdMatch(conpassword.value);
  } else if (conpassword.value === "") {
    msg.value["conpassword"] = "";
  }
});

const countusernameCharac = computed(() => {
  const maxLength = 45;
  if (username.value === null) return maxLength;
  return maxLength - (username.value.length || 0);
});

const countpasswordCharac = computed(() => {
  const maxLength = 14;
  if (username.value === null) return maxLength;
  return maxLength - (username.value.length || 0);
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


provide(/* key */ "role", /* value */ "admin");
</script>

<template>
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
              type="text"
              maxlength="45"
              required
            />
          </div>
          <div v-show="!checkAddOrEdit" class="text-lg flex flex-col space-y-2">
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
              type="password"
              maxlength="14"
            />
            <span v-if="msg.password" class="text-red-400">{{
              msg.password
            }}</span>
          </div>
          <div v-show="!checkAddOrEdit" class="text-lg flex flex-col space-y-2">
            <p>Confirm password</p>
            <input
              v-model="conpassword"
              class="rounded-md w-3/4 ann-title bg-whitesecondCustom dark:bg-darksecondCustom py-2 px-2 ann-confirm-password"
              type="password"
              maxlength="14"
            />
            <span v-if="msg.conpassword" class="text-red-400">{{
              msg.conpassword
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
              type="text"
              maxlength="100"
              required
            />
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
              type="text"
              maxlength="150"
              required
            />
            <span v-if="msg.email" class="text-red-400">{{ msg.email }}</span>
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
              class="px-4 py-2 rounded-md bg-gray-50 dark:bg-gray-700 submit ann-button"
              :class="
                change || (!updateCheck && !allFieldsEmpty)
                  ? 'dark:bg-gray-700'
                  : 'opacity-40 '
              "
              :disabled="
                !(change || (!updateCheck && !allFieldsEmpty))
              "
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
