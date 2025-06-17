<script setup>
import ForgotP from "../assets/img/ForgotP.png";
</script>

<template>
  <div class="min-h-screen bg-white flex flex-col p-6">
   <a href="" class="mb-6 text-2xl" ><i class="fa-solid fa-angle-left"></i></a>
    <h1 class="text-2xl font-bold text-gray-800 mb-1">Forgot password 🤔</h1>
    <p class="text-gray-500 mb-6">
      Select which contact details should we use to reset your password.
    </p>

    <div class="flex justify-center mb-2">
      <img
        :src="ForgotP"
        alt="Forgot Password Illustration"
        class="w-70 zh-auto"
      />
    </div>

    <div class="space-y-4">
      <!-- Email Option -->
      <div class="flex items-center p-4 border border-gray-200 shadow-sm rounded-xl hover:border-blue-500">
        <div class="bg-blue-500 p-2 rounded-full">
          <i class="fa-solid fa-envelope rounded-full text-white"></i>
        </div>
        <div class="ml-4 flex-1">
          <p class="font-semibold text-gray-800">Email</p>
          <p class="text-sm text-gray-500">michael.mitc@example.com</p>
        </div>
        <input
          type="radio"
          name="resetOption"
          class="form-radio h-5 w-5 text-blue-500"
          checked
        />
      </div>

      <!-- Phone Option -->
      <div class="flex items-center p-4 border  border-gray-200 shadow-sm rounded-xl hover:border-blue-500">
        <div class="bg-blue-500 p-2 rounded-full">
          <i class="fa-solid fa-phone text-white"></i>
        </div>
        <div class="ml-4 flex-1">
          <p class="font-semibold text-gray-800">Phone Number</p>
          <p class="text-sm text-gray-500">(217) 555-0113</p>
        </div>
        <input
          type="radio"
          name="resetOption"
          class="form-radio h-5 w-5 text-blue-500"
          checked
        />
      </div>
    </div>

    <!-- Continue Button -->
    <button class="mt-10 bg-blue-500 text-white text-center py-3 rounded-xl text-lg font-semibold hover:bg-blue-600 transition">Continue</button>
  </div>
</template>
