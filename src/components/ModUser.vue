<script setup>
import { provide } from "vue";

provide(/* key */ "role", /* value */ "admin");
</script>

<template>
  <div class="w-full">
    <div class="flex flex-col space-y-10 p-5">
      <div class="text-4xl">
        <p>User Detail:</p>
      </div>
      <div class="flex flex-row border-2 rounded-lg w-full">
        <div class="flex flex-col space-y-5 w-full p-5">
            <div class="flex flex-row w-full justify-center space-x-2 text-xl">
                <p class="my-auto">Username :</p>
                <input
              class="rounded-md ann-title w-4/5 bg-whitesecondCustom dark:bg-darksecondCustom py-2"
              type="text"
            />
            </div>
          <div class="text-lg flex flex-col space-y-2">
            <p>Name</p>
            <input
              class="rounded-md w-3/4 ann-title bg-whitesecondCustom dark:bg-darksecondCustom py-2"
              type="text"
            />
          </div>
          <div class="text-lg flex flex-col space-y-2">
            <p>Email</p>
            <input
              class="rounded-md w-3/4 ann-title bg-whitesecondCustom dark:bg-darksecondCustom py-2"
              type="text"
            />
          </div>
          <div class="text-lg flex flex-col space-y-2">
            <p>Role</p>
            <select
              class="w-1/4 bg-whitesecondCustom dark:bg-darksecondCustom rounded-md py-2"
            >
              <option value=""><p>test</p></option>
            </select>
          </div>
          <div class="flex flex-row space-x-4">
            <button class="px-4 py-2 rounded-md bg-gray-50 dark:bg-gray-700">
              save
            </button>
            <button class="px-4 py-2 rounded-md bg-gray-50 dark:bg-gray-700">
              cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
