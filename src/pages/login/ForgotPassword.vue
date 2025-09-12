<script setup>
import ForgotP from "../../assets/images/ForgotP.png";
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-[#0c0e19] flex flex-col p-6 text-gray-800 dark:text-white transition-colors duration-300">
    <router-link to="/login" class="mb-6 text-2xl text-gray-700 dark:text-gray-300">
      <i class="fa-solid fa-angle-left"></i>
    </router-link>

    <h1 class="text-3xl font-bold mb-1">Forgot password 🤔</h1>
    <p class="text-gray-500 dark:text-gray-400 mb-6">
      Select which contact details should we use to reset your password.
    </p>

    <div class="flex justify-center mb-2">
      <img :src="ForgotP" alt="Forgot Password Illustration" class="w-70 zh-auto" />
    </div>

    <div class="space-y-4">
      <!-- Email Option -->
      <div
        class="flex items-center p-4 border border-gray-200 dark:border-gray-600 shadow-sm rounded-xl hover:border-blue-500 dark:hover:border-blue-400 transition"
      >
        <div class="bg-blue-500 p-2 rounded-full">
          <i class="fa-solid fa-envelope text-white"></i>
        </div>
        <div class="ml-4 flex-1">
          <p class="font-semibold">Email</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">michael.mitc@example.com</p>
        </div>
        <input
          type="radio"
          name="resetOption"
          class="cursor-pointer form-radio h-5 w-5 text-blue-500"
          checked
        />
      </div>

      <!-- Phone Option -->
      <div
        class="flex items-center p-4 border border-gray-200 dark:border-gray-600 shadow-sm rounded-xl hover:border-blue-500 dark:hover:border-blue-400 transition"
      >
        <div class="bg-blue-500 p-2 rounded-full">
          <i class="fa-solid fa-phone text-white"></i>
        </div>
        <div class="ml-4 flex-1">
          <p class="font-semibold">Phone Number</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">(217) 555-0113</p>
        </div>
        <input
          type="radio"
          name="resetOption"
          class="cursor-pointer form-radio h-5 w-5 text-blue-500"
          checked
        />
      </div>
    </div>

    <!-- Continue Button -->
    <router-link
      to="/otp"
      class="mt-10 bg-blue-500 text-white text-center py-3 rounded-xl text-lg font-semibold hover:bg-blue-600 transition"
    >
      Continue
    </router-link>
  </div>
</template>

