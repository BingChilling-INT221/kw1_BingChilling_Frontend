<script setup>
import {useRoute} from "vue-router";
import {computed, onMounted, ref} from "vue";
import {getSubscribes, unsubscribes} from "@/services/verificationapi";
import jwtDecode from "jwt-decode";

const route = useRoute();
const unsubscribeList = ref([]);
const unsubscribeAll = ref(true);
const list = ref([]);
const error = ref(null);
onMounted(async () => {
  const response = await getSubscribes(email.value);
  response.forEach((item) => {
    list.value.push(item.category);
  });
})
const unsubscribe = async (event) => {
  event.preventDefault();
  console.log(unsubscribeList.value);
  console.log(unsubscribeAll.value);
  let response;
  if (unsubscribeAll.value) {
    response = await unsubscribes(email.value);
  } else {
    if (unsubscribeList.value.length === 0) {
      error.value = "Please select at least one mailing list";
      return;
    }
    response = await unsubscribes(email.value, unsubscribeList.value);
  }
  console.log(response);
  error.value = response;
}
const email = computed(()=>{
  if (!route.query.email) return;
  const decode =jwtDecode(route.query.email);
  return decode.email;
})
</script>

<template>
  <div class="flex flex-col h-screen">
    <div class="flex items-center justify-center bg-bgNav">
      <h1 class="text-2xl font-semibold text-white">SIT Announcement System</h1>
    </div>
    <div class="flex flex-col w-2/3 p-6 m-auto bg-white rounded-lg">
      <div class="mb-4 text-xl font-semibold">Unsubscribe</div>

      <div class="mb-4 text-xl text-gray-700">
        Your email address: {{ email }}
      </div>

      <div class="mb-4 text-xl text-gray-700">
        You will not receive any more email from
        <a
            class="text-blue-500 underline"
            href="mailto:bingchillingsas@gmail.com"
        >bingchillingsas@gmail.com</a
        >
      </div>

      <div class="mb-4">
        <p class="text-gray-700">You can:</p>

        <div class="flex items-center mb-2">
          <input
              id="unsubscribeAll"
              v-model="unsubscribeAll"
              :value="true"
              class="mr-2"
              type="radio"
          />
          <label class="text-gray-700" for="unsubscribeAll"
          >Unsubscribe from all mailing lists</label
          >
        </div>

        <div class="flex items-center mb-2">
          <input
              id="unsubscribeEach"
              v-model="unsubscribeAll"
              :value="false"
              class="mr-2"
              type="radio"
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
                :key="item.categoryId"
                class="flex items-center mb-2"
            >
              <input
                  :id="`unsubscribe-${item.categoryId}`"
                  v-model="unsubscribeList"
                  :value="item.categoryId"
                  class="mr-2"
                  type="checkbox"
              />
              <label :for="`unsubscribe-${item.categoryId}`" class="text-gray-700">{{
                  item.categoryName
                }}</label>
            </div>
          </div>
        </div>
      </div>
      {{ error }}
      <button class="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg" @click="unsubscribe">
        Unsubscribe
      </button>
    </div>
  </div>
</template>

<style scoped></style>
