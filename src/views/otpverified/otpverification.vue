<script setup>
import { onMounted, ref } from "vue";
const otp = ref('')
</script>
 
<template>
  <div>
    <div class="min-h-screen bg-black">
      <div class="flex items-center justify-center min-h-screen">
        <!-- Centered content -->
        <div class="bg-white p-8 rounded-md shadow-md w-full sm:w-96 text-black">
          <div class="text-center text-lg">
            <p>จำเป็นต้องยืนยันตัวตน</p>
            <p>กรอกรหัสที่เราส่งให้คุณทาง email </p>

            <div class="mt-4">
              <label for="otp" class="block text-sm font-medium text-gray-700">รหัส OTP</label>
              <v-otp-input v-model="otp" :loading="loading" length="6" variant="underlined"></v-otp-input>

              <v-btn :disabled="otp.length < 6 || loading" class="my-5" color="surface-variant" text="Submit"
                variant="tonal" @click=""></v-btn>


            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<style scoped></style>