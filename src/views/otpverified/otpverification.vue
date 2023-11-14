<script setup>
import {inject, onMounted, ref} from "vue";
import { otpverification } from "@/services/verificationapi.js";
import { useRoute, useRouter } from "vue-router";
import Swal from 'sweetalert2';
import Format_page from "@/components/format_page.vue";
const otp = ref('')
const router = useRouter();
const loading = inject("loading");
const clearOtpInput = () => {
  otp.value = '';
};

const submitForm = async (event) => {
  event.preventDefault();
  loading.value = true;
  try {
    const response = await otpverification(otp.value, clearOtpInput);
    loading.value = false;
    if (response.status === 200) {

      Swal.fire({
        icon: 'success',
        title: 'OTP Verified Successfully',
        showConfirmButton: false,
        timer: 1500
      });
      router.back()
      localStorage.removeItem("tokenOtp")
    }
    else {
      const errorResponse = await response.json();
      console.log(errorResponse);
    }
  } catch (error) {
    console.error('Error during OTP verification:', error);
  }
}
</script>

<template>
<Format_page>
  <div class="min-w-full min-h-full bg-amber">
    <form @submit.prevent="submitForm">
      <div class="otp">
        <div class="flex items-center align-center justify-center min-h-full">
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
  </Format_page>
</template>

<style scoped>
.otp {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 30;
}
</style>