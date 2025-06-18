<script setup>
import ppp from "../../assets/images/ppp.jpg";
</script>

<template>
  <div class="min-h-screen bg-white flex flex-col p-6 justify-between">
    <a href="/forgot-password" class="mb-4 text-2xl">
      <i class="fa-solid fa-angle-left"></i>
    </a>

    <div>
      <h1 class="text-3xl font-bold text-gray-800 mb-1">
        Enter verification Code
      </h1>
      <p class="text-gray-500 mb-4">
        We have sent the code verification to your mobile number
      </p>
    </div>

    <!-- Image -->
    <div class="flex justify-center mb-4">
      <img :src="ppp" alt="" class="h-auto" />
    </div>

    <!-- OTP Inputs -->
    <div class="flex justify-center gap-3 mb-4">
      <input v-for="i in 4" :key="i" maxlength="1" type="text"
        class="w-19 h-18 text-center border border-gray-300 rounded-lg text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Countdown + Resend -->
    <div class="text-base text-gray-500 text-right mb-6">
      <span class="mr-2">00:30</span>
      <button class="text-blue-500 hover:underline">Resend it</button>
    </div>

    <!-- Verify Button -->
     <a href="new-password" class="bg-blue-500 text-center text-white text-lg font-medium w-full py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200">Verify</a>
  </div>
</template>
