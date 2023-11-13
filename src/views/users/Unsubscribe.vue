<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";

const route = useRoute();
const unsubscribeList = ref([]);
const unsubscribeAll = ref(true);
const list = ["a", "b", "c"];
</script>

<template>
  <div class="flex flex-col h-screen">
    <div class="flex items-center justify-center bg-bgNav">
      <h1 class="text-2xl font-semibold text-white">SIT Announcement System</h1>
    </div>
    <div class="flex flex-col w-2/3 p-6 m-auto bg-white rounded-lg">
      <div class="mb-4 text-xl font-semibold">Unsubscribe</div>

      <div class="mb-4 text-xl text-gray-700">
        Your email address: {{ route.query.email }}
      </div>

      <div class="mb-4 text-xl text-gray-700">
        You will not receive any more email from
        <a
          href="mailto:bingchillingsas@gmail.com"
          class="text-blue-500 underline"
          >bingchillingsas@gmail.com</a
        >
      </div>

      <div class="mb-4">
        <p class="text-gray-700">You can:</p>

        <div class="flex items-center mb-2">
          <input
            type="radio"
            id="unsubscribeAll"
            :value="true"
            v-model="unsubscribeAll"
            class="mr-2"
          />
          <label class="text-gray-700" for="unsubscribeAll"
            >Unsubscribe from all mailing lists</label
          >
        </div>

        <div class="flex items-center mb-2">
          <input
            type="radio"
            id="unsubscribeEach"
            :value="false"
            v-model="unsubscribeAll"
            class="mr-2"
          />
          <label class="text-gray-700" for="unsubscribeEach"
            >Unsubscribe from the current mailing list</label
          >
        </div>

        <div v-if="!unsubscribeAll">
          <div class="mb-4">
            <span class="text-gray-700"
              >Select the mailing lists you want to unsubscribe from:</span
            >

            <div
              v-for="item in list"
              :key="item"
              class="flex items-center mb-2"
            >
              <input
                type="checkbox"
                :id="`unsubscribe-${item}`"
                :value="item"
                v-model="unsubscribeList"
                class="mr-2"
              />
              <label class="text-gray-700" :for="`unsubscribe-${item}`">{{
                item
              }}</label>
            </div>
          </div>
        </div>
      </div>

      <button class="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg">
        Unsubscribe
      </button>
    </div>
  </div>
</template>

<style scoped></style>
