<script setup>
import {onMounted, ref} from "vue";
import format_page from "@/components/format_page.vue";
import dateTimeBox from "../../components/announce/DateTimeBox.vue";
import timeZoneBox from "../../components/announce/TimeZoneBox.vue";
import userBox from "../../components/user/UserBox.vue";
import {fetchUser} from "@/services/userApi";

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

</script>

<template>
  <div class="w-full">
    <format_page>
      <div class="flex flex-col min-w-full space-y-5 ">
        <div class="text-4xl text-center ann-title">
          <p>User Management</p>
        </div>
        <div>
          <div class="flex flex-row w-full h-auto">
            <div class="flex flex-row w-full">
              <dateTimeBox :time="datetime" class="text-sm"></dateTimeBox>
              <timeZoneBox :timezone="timezone" class="text-sm"></timeZoneBox>
            </div>

            <div class="flex justify-end w-full pr-5 my-auto">
              <button
                  class="px-4 py-2 rounded-md bg-gray-50 dark:bg-gray-700 ann-button"
                  @click="$router.push({ name: 'adduser' })"
              >
                Add user
              </button>
            </div>
          </div>
          <div class="relative overflow-x-auto">
            <table class="min-w-full w-full text-left">
              <thead class="text-xs">
              <tr>
                <th class="px-6 py-3 text-lg" scope="col">No.</th>
                <th class="px-6 py-3 text-lg" scope="col">Username</th>
                <th class="px-6 py-3 text-lg" scope="col">Name</th>
                <th class="px-6 py-3 text-lg" scope="col">Email</th>
                <th class="px-6 py-3 text-lg" scope="col">Role</th>
                <th class="px-6 py-3 text-lg" scope="col">CreatedOn</th>
                <th class="px-6 py-3 text-lg" scope="col">UpdatedOn</th>
                <th class="px-6 py-3 text-lg text-center" scope="col">
                  Action
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="(user, index) in users"
                  class="w-full h-auto ann-item"
              >
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
