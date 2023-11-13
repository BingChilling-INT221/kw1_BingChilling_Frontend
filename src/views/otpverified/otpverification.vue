<script setup>
import { onMounted, ref } from "vue";
import { otpverification } from "@/services/verificationapi.js";
const otp = ref('')


const submitForm = async () => {
  try {
    const response = await otpverification(otp.value);
    if (response.status === 200) {
      console.log('OTP verification successful');
    } else {
      const errorResponse = await response.json();
      console.log(errorResponse);
    }
  } catch (error) {
    console.error('Error during OTP verification:', error);
  }
}
</script>
 
<template>
  <div>
    <form @submit.prevent="submitForm">
      <div class="min-h-screen bg-black">
        <div class="flex items-center justify-center min-h-screen">
          <div class="bg-white p-8 rounded-md shadow-md w-full sm:w-96 text-black">
            <div class="text-center text-lg">
              <p>จำเป็นต้องยืนยันตัวตน</p>
              <p>กรอกรหัสที่เราส่งให้คุณทาง email </p>
              <div class="mt-4">
                <label for="otp" class="block text-sm font-medium text-gray-700">รหัส OTP</label>
                <v-otp-input v-model="otp" length="6" variant="underlined"></v-otp-input>
                <v-btn :disabled="otp.length < 6" class="my-5" color="surface-variant" text="Submit"
                  variant="tonal" type="submit"></v-btn>
              </div>

            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
 
<style scoped></style>