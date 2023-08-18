<script setup>
import { provide } from "vue";
import format_page from "@/components/format_page.vue";
import dateTimeBox from "../../components/DateTimeBox.vue";
import timeZoneBox from "../../components/TimeZoneBox.vue";

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
      <div class="flex flex-col space-y-2">
        <div class="flex flex-row w-full">
          <div class="flex flex-row w-4/5">
            <dateTimeBox :time="datetime" class="text-sm"></dateTimeBox>
            <timeZoneBox :timezone="timezone" class="text-sm"></timeZoneBox>
          </div>
          <div class="flex w-1/5 justify-end pr-4">
            <button
              class="px-4 py-2 rounded-md bg-gray-50 dark:bg-gray-700 ann-button"
            >
              Add user
            </button>
          </div>
        </div>
        <div class="flex flex-row justify-between pr-4 ann-item items-center">
          <div class="flex flex-col space-y-2">
            <p class="flex justify-center">No.</p>
            <div class="flex flex-col items-center text-xl space-y-8">
              <p>10000000</p>
              <p>20000000</p>
            </div>
          </div>
          <div class="flex flex-col space-y-2">
            <p class="flex justify-center">Username</p>
            <div class="flex flex-col items-center text-xl space-y-8">
              <p>Menoa</p>
              <p>Bell</p>
            </div>
          </div>
          <div class="flex flex-col space-y-2">
            <p class="flex justify-center">Name</p>
            <div class="flex flex-col items-center text-xl space-y-8">
              <p>Menoa Belluchi</p>
              <p>Bell Bebebop</p>
            </div>
          </div>
          <div class="flex flex-col space-y-2">
            <p class="flex justify-center">Email</p>
            <div class="flex flex-col items-center text-xl space-y-8">
              <p>Menoa@hotmail.com</p>
              <p>Bell@hotmail.com</p>
            </div>
          </div>
          <div class="flex flex-col space-y-2">
            <p class="flex justify-center">Role</p>
            <div class="flex flex-col items-center text-xl space-y-8">
              <p>Admin</p>
              <p>user</p>
            </div>
          </div>
          <div class="flex flex-col space-y-2">
            <p class="flex justify-center">Created On</p>
            <div class="flex flex-col items-center text-xl space-y-8">
              <p>15 Aug 2023 08:00</p>
              <p>15 Aug 2023 08:00</p>
            </div>
          </div>
          <div class="flex flex-col space-y-2">
            <p class="flex justify-center">Updated On</p>
            <div class="flex flex-col items-center text-xl space-y-8">
              <p>15 Aug 2023 08:00</p>
              <p>15 Aug 2023 08:00</p>
            </div>
          </div>
          <div class="flex flex-col space-y-2">
            <p class="flex justify-center">Action</p>
            <div class="flex flex-col items-center text-xl space-y-8">
              <div class="flex flex-row space-x-3">
                <button class="px-4 py-1 rounded-md bg-gray-50 dark:bg-gray-700">edit</button>
                <button class="px-4 py- rounded-md bg-gray-50 dark:bg-gray-700 ">delete</button>
              </div>
              <div class="flex flex-row space-x-3">
                <button class="px-4 py-1 rounded-md bg-gray-50 dark:bg-gray-700">edit</button>
                <button class="px-4 py- rounded-md bg-gray-50 dark:bg-gray-700 ">delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </format_page>
  </div>
</template>
<style scoped></style>
