<script setup>
import { provide, ref, watch, computed } from "vue";
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

const role = ref("");
const username = ref("");
const name = ref("");
const email = ref("");
const createdOn = ref("");
const updatedOn = ref("");
const msg = ref([]);

const updateInit = () => {
  username.value = props.updatePackage.username;
  name.value = props.updatePackage.name;
  email.value = props.updatePackage.email;
  role.value = props.updatePackage.role;
  createdOn.value = props.updatePackage.createdOn;
  updatedOn.value = props.updatePackage.updatedOn;
};

const errm = ref();
const sendSubmit = async (event) => {
  event.preventDefault();
  const sendPackage = {
    username: username.value,
    name: name.value,
    email: email.value,
    role: role.value,
  };
  if (updateCheck.value) {
    try {
      console.log(JSON.stringify(sendPackage));
      const response = await fetchUpdateUser(sendPackage, route);
      if (response.status === 200) {
        alert("update announcement success");
        await router.push({ name: `adminuserpage` });
      } else {
        console.log(response);
        alert("update announcement fail");
        errm.value = await response.json();
        alert(errm.value.message);
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
        alert("Create announcement success");
        await router.push({ name: `adminuserpage` });
      } else {
        alert("Create announcement fail");
        errm.value = await response.json();
        alert(errm.value.message);
      }
    } catch (err) {
      alert(err);
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
  if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) {
    msg.value["password"] = "";
  }
  else {
    msg.value["password"] =
      "Must be at least 8 characters! ";
  }
};


const allFieldsEmpty = computed(() => {
  return username.value === ""  ? true
    : checkEmail(email.value) || name.value === "" || email.value === ""
    || role.value === "";
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
            <p>Password</p>
            <input
              v-model="username"
              class="rounded-md w-3/4 ann-title bg-whitesecondCustom dark:bg-darksecondCustom py-2 px-2 ann-password"
              type="password"
              maxlength="14"
              required
            />
            <span v-if="msg.password" class="text-red-400">{{
              msg.password
            }}</span>
          </div>
          <div v-show="!checkAddOrEdit" class="text-lg flex flex-col space-y-2">
            <p>Confirm password</p>
            <input
              v-model="username"
              class="rounded-md w-3/4 ann-title bg-whitesecondCustom dark:bg-darksecondCustom py-2 px-2 ann-confirm-password"
              type="password"
              maxlength="14"
              required
            />
          </div>
          <div class="text-lg flex flex-col space-y-2">
            <div class="flex flex-row w-3/4">
              <p>Name</p>
              <div class="flex w-full justify-end">
                <p class="text-sm my-auto">
                  Remaining: {{ countnameCharac }}
                </p>
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
                <p class="text-sm my-auto">
                  Remaining: {{ countemailCharac }}
                </p>
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
              :disabled="(!change && updateCheck) || allFieldsEmpty"
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
