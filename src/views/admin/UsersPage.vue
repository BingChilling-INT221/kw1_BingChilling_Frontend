<script setup>
import { provide, ref, onMounted } from "vue";
import format_page from "@/components/format_page.vue";
import dateTimeBox from "../../components/DateTimeBox.vue";
import timeZoneBox from "../../components/TimeZoneBox.vue";
import userBox from "../../components/UserBox.vue";
import { fetchUser } from "../../services/api";

const users = ref([]);

onMounted(async () => {
  try {
    const response = await fetchUser();
    if (response.status === 200) {
      users.value = await response.json();
      console.log(response);
    }
  } catch (err) {
    console.log(err);
  }
});

const datetime = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
}).format();
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

provide(/* key */ "role", /* value */ "admin");
</script>

<template>
  <div class="w-full">
    <format_page>
      <div class="w-full flex flex-col space-y-5">
        <div class="text-4xl text-center ann-title">
          <p>User Management</p>
        </div>
        <div>
          <div class="flex flex-row w-full h-auto">
          <div class="flex flex-row w-full">
          <dateTimeBox :time="datetime" class="text-sm"></dateTimeBox>
          <timeZoneBox :timezone="timezone" class="text-sm"></timeZoneBox>
          </div>
          
          <div class="flex justify-end my-auto w-full pr-5">
            <button
              class="px-4 py-2 rounded-md bg-gray-50 dark:bg-gray-700 ann-button"
              @click="$router.push({ name: 'adduser' })"
            >
              Add user
            </button>
          </div>
        </div>
        <div class="overflow-x-auto relative">
          <table class="w-full text-left">
            <thead class="text-xs">
              <tr>
                <th scope="col" class="py-3 px-6 text-lg">No.</th>
                <th scope="col" class="py-3 px-6 text-lg">Username</th>
                <th scope="col" class="py-3 px-6 text-lg">Name</th>
                <th scope="col" class="py-3 px-6 text-lg">Email</th>
                <th scope="col" class="py-3 px-6 text-lg">Role</th>
                <th scope="col" class="py-3 px-6 text-lg">CreatedOn</th>
                <th scope="col" class="py-3 px-6 text-lg">UpdatedOn</th>
                <th scope="col" class="py-3 px-6 text-center text-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in users" class="w-full h-auto ann-item">
                <userBox :ann-item="user" :index="index"></userBox>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
        
      </div>
    </format_page>
  </div>
</template>
<style scoped></style>
