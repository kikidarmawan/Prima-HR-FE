<script setup>
import { ref } from "vue";
import verifikasi from "../../assets/images/verifikasi.png";

const otpInputs = ref([]); // untuk mengakses input DOM

const handleInput = (e, index) => {
  const value = e.target.value;

  // Pastikan hanya angka yang bisa masuk
  if (!/^\d$/.test(value)) {
    e.target.value = "";
    return;
  }

  // Otomatis pindah ke input selanjutnya
  if (value && index < otpInputs.value.length - 1) {
    otpInputs.value[index + 1]?.focus();
  }
};

const handleBackspace = (e, index) => {
  if (e.key === "Backspace" && !e.target.value && index > 0) {
    otpInputs.value[index - 1]?.focus();
  }
};
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-black text-gray-800 dark:text-white flex flex-col p-6 justify-between transition-colors duration-300">
    <!-- Back Button -->
    <router-link to="/forgot-password" class="mb-4 text-2xl text-gray-700 dark:text-gray-300">
      <i class="fa-solid fa-angle-left"></i>
    </router-link>

    <!-- Title & Subtitle -->
    <div>
      <h1 class="text-3xl font-bold mb-1">Enter verification Code</h1>
      <p class="text-gray-500 dark:text-gray-400 mb-4">
        We have sent the code verification to your mobile number
      </p>
    </div>

    <!-- Image -->
    <div class="flex justify-center mb-4">
      <img :src="verifikasi" alt="OTP Image" class="h-auto" />
    </div>

    <!-- OTP Inputs -->
    <div class="flex justify-center gap-3 mb-4">
      <input
        v-for="(i, index) in 4"
        :key="index"
        type="text"
        maxlength="1"
        class="w-16 h-16 text-center border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-2xl text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        ref="otpInputs"
        @input="(e) => handleInput(e, index)"
        @keydown="(e) => handleBackspace(e, index)"
      />
    </div>

    <!-- Countdown + Resend -->
    <div class="text-base text-gray-500 dark:text-gray-400 text-right mb-6">
      <span class="mr-2">00:30</span>
      <button class="text-blue-500 hover:underline">Resend it</button>
    </div>

    <!-- Verify Button -->
    <a
      href="new-password"
      class="bg-blue-500 hover:bg-blue-600 text-white text-center text-lg font-medium w-full py-3 rounded-lg shadow-md transition"
    >
      Verify
    </a>
  </div>
</template>
