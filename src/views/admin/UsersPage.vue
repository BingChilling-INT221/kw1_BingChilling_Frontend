<script setup>
import { onMounted, ref } from "vue";
import format_page from "@/components/format_page.vue";
import dateTimeBox from "../../components/announce/DateTimeBox.vue";
import timeZoneBox from "../../components/announce/TimeZoneBox.vue";
import userBox from "../../components/user/UserBox.vue";
import { fetchUser } from "@/services/userApi";

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
      <div class="flex flex-col min-w-full space-y-5">
        <div class="text-4xl text-center ann-title pt-3">
          <p>User Management</p>
        </div>
        <div>
          <div class="flex justify-between">
            <div class="flex">
              <dateTimeBox :time="datetime" class="text-sm"></dateTimeBox>
              <timeZoneBox :timezone="timezone" class="text-sm"></timeZoneBox>
            </div>
            <div class="flex pr-2">
              <div class="ann-button" @click="$router.push({ name: 'adduser' })">
                <button class="hidden px-2 py-2 rounded-md bg-bgNav md:inline-block">
                  Add users
                </button>
              </div>
            </div>
          </div>

          <div class="overflow-x-auto w-72 sm:w-[720px] xl:w-full">
            <table class="text-left mb-0 w-72 xl:w-full">
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
                <tr v-for="(user, index) in users" class="ann-item">
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
