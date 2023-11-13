<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
const route = useRoute();
const unsubscribeList = ref([]);
const unsubscribeAll = ref(false);
</script>

<template>
  <div class="w-full h-screen pt-[5%]">
    <div class="w-2/3 m-auto">
      <h1 class="justify-center text-2xl text-center mb-[5%]">
        SIT Announcement System
      </h1>
    </div>
    <div class="block w-2/3 m-auto bg-bgNav h-[80%]">
      <div class="text-xl">Unsubscribe</div>
      <div class="text-xl">Your email address {{ route.query.email }}</div>
      <div class="text-xl">
        Your will not receive any more email from
        <a href="mailto:bingchillingsas@gmail.com">bingchillingsas@gmail.com</a>
      </div>
      <div>
        <p>You can:</p>
        {{ unsubscribeList }}
        {{ unsubscribeAll }}
        <div> 
          <input type="radio" id="unsubscribeAll"  v-model="unsubscribeAll" />
          <label for="unsubscribeAll">Unsubscribe from all mailing</label>
        </div>
        <div>
          <input type="radio" id="unsubscribeEach" v-model="unsubscribeAll" />
          <label for="unsubscribe">Unsubscribe from the current</label>
        </div>
        <div>
          <input type="checkbox" id="unsubscribe" />
          <label for="unsubscribe">A</label>
        </div>
      </div>
    </div>
    <!-- <div>{{ route.query.email }}</div>
    <div>{{ route.query.unsubscribe }}</div> -->
  </div>
</template>

<style scoped></style>
