<script setup>
import { provide, ref, watch,computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { fetchUpdateUser, fetchCreateUser, fetchDeleteUser } from "../services/api.js";
const route = useRoute();

const props = defineProps({
  updatePackage: {
    type: Object,
  },
});

const router = useRouter();

const updateCheck = ref(false);
watch(
  () => props.updatePackage,
  (newv) => {
    console.log(JSON.stringify(newv).length);
    if (JSON.stringify(newv).length > 0) {
      updateCheck.value = true;
      updateInit();
    } else {
      console.log("no update");
      updateCheck.value = false;
    }
  }
);

const role = ref("");
const username = ref("");
const name = ref("");
const email = ref("");

const updateInit = () => {
  username.value = props.updatePackage.username;
  name.value = props.updatePackage.name;
  email.value = props.updatePackage.email;
  role.value = props.updatePackage.role;
};

const errm = ref();
const sendSubmit = async (event) => {
  event.preventDefault();
  const sendPackage = {
    username: username.value,
    name: name.value,
    email:  email.value,
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
    email:  email.value,
    role: role.value,
  };
});


let change = ref(false);

watch(
  () => compObj,
  () => {
    if (!updateCheck.value) return;
    change.value = false;
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
            <p>Username</p>
            <input
              v-model="username"
              class="rounded-md w-3/4 ann-title bg-whitesecondCustom dark:bg-darksecondCustom py-2 px-2"
              type="text"
            />
          </div>
          <div class="text-lg flex flex-col space-y-2">
            <p>Name</p>
            <input
              v-model="name"
              class="rounded-md w-3/4 ann-title bg-whitesecondCustom dark:bg-darksecondCustom py-2 px-2"
              type="text"
            />
          </div>
          <div class="text-lg flex flex-col space-y-2">
            <p>Email</p>
            <input
              v-model="email"
              class="rounded-md w-3/4 ann-title bg-whitesecondCustom dark:bg-darksecondCustom py-2 px-2"
              type="text"
            />
          </div>
          <div class="text-lg flex flex-col space-y-2">
            <p>Role</p>
            <select
              v-model="role"
              class="w-1/4 bg-whitesecondCustom dark:bg-darksecondCustom rounded-md py-2 px-2"
            >
              <option>admin</option>
              <option>announcer</option>
            </select>
          </div>
          <div class="flex flex-row space-x-4">
            <button class="px-4 py-2 rounded-md bg-gray-50 dark:bg-gray-700 submit" :class="change || !updateCheck ? 'dark:bg-gray-700' : 'opacity-40 '" :disabled="!change && updateCheck">
              save
            </button>
            <button class="px-4 py-2 rounded-md bg-gray-50 dark:bg-gray-700" @click="$router.push({ name: 'adminuserpage' })">
              cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped></style>
