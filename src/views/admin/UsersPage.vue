<script setup>
import { provide } from "vue";
import format_page from "@/components/format_page.vue";
import dateTimeBox from "../../components/DateTimeBox.vue";
import timeZoneBox from "../../components/TimeZoneBox.vue";
import userBox from "../../components/UserBox.vue";

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
      <div class="flex flex-col space-y-">
        <div class="flex flex-row w-full">
          <div class="flex flex-row w-4/5">
            <dateTimeBox :time="datetime" class="text-sm"></dateTimeBox>
            <timeZoneBox :timezone="timezone" class="text-sm"></timeZoneBox>
          </div>
          <div class="flex w-1/5 justify-end pr-4">
            <button
              class="px-4 py-2 rounded-md bg-gray-50 dark:bg-gray-700 ann-button"
              @click="$router.push({ name: 'adduser' })"
            >
              Add user
            </button>
          </div>
        </div>
        <userBox></userBox>
      </div>
    </format_page>
  </div>
</template>
<style scoped></style>
