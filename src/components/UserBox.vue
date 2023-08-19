<script setup>
import DetailSlot from "../views/slots/DetailSlot.vue";
import BoxofColSlot from "../views/slots/BoxofColSlot.vue";
</script>

<template>
  <div class="flex flex-row justify-between pr-4 ann-item items-center">
    <BoxofColSlot>
      <p class="flex justify-center">No.</p>
      <DetailSlot>
        <p>10000000</p>
      </DetailSlot>
    </BoxofColSlot>
    <BoxofColSlot>
      <p class="flex justify-center">Username</p>
      <DetailSlot>
        <p>Menoa</p>
      </DetailSlot>
    </BoxofColSlot>
    <BoxofColSlot>
      <p class="flex justify-center">Name</p>
      <DetailSlot>
        <p>Menoa Belluchi</p>
      </DetailSlot>
    </BoxofColSlot>
    <BoxofColSlot>
      <p class="flex justify-center">Email</p>
      <DetailSlot>
        <p>Menoa@hotmail.com</p>
      </DetailSlot>
    </BoxofColSlot>
    <BoxofColSlot>
      <p class="flex justify-center">Role</p>
      <DetailSlot>
        <p>Admin</p>
      </DetailSlot>
    </BoxofColSlot>
    <BoxofColSlot>
      <p class="flex justify-center">Created On</p>
      <DetailSlot>
        <p>15 Aug 2023 08:00</p>
      </DetailSlot>
    </BoxofColSlot>
    <BoxofColSlot>
      <p class="flex justify-center">Updated On</p>
      <DetailSlot>
        <p>15 Aug 2023 08:00</p>
      </DetailSlot>
    </BoxofColSlot>
    <BoxofColSlot>
      <p class="flex justify-center">Action</p>
      <div class="flex flex-col items-center text-xl">
        <div class="flex flex-row space-x-3">
          <button class="px-4 py-1 rounded-md bg-gray-50 dark:bg-gray-700">
            edit
          </button>
          <button class="px-4 py- rounded-md bg-gray-50 dark:bg-gray-700">
            delete
          </button>
        </div>
      </div>
    </BoxofColSlot>
  </div>
</template>

<style scoped></style>
