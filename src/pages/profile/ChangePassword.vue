<script setup>
import { ref } from "vue";

const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const showConfirm = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirm = () => {
  showConfirm.value = !showConfirm.value;
};
</script>
<template>
  <div class="bg-white min-h-screen">
    <div class="max-w-sm mx-auto">
      <!-- Header -->
      <div class="flex items-center justify-between p-6">
        <router-link to="/profile" class="text-2xl text-gray-700">
          <i class="fa-solid fa-angle-left"></i>
        </router-link>
        <h1 class="text-xl font-semibold text-gray-800">Change Password</h1>
        <div class="w-6"></div>
      </div>

      <!-- Form -->
      <div class="px-6 space-y-6">
        <!-- Password -->
        <div class="relative">
          <label class="block text-blue-500 mb-1 text-sm font-medium"
            >Password</label
          >
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            class="w-full px-4 py-3 border border-blue-400 rounded-xl focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter new password"
          />
          <button
            type="button"
            @click="togglePassword"
            class="absolute right-4 top-[42px] text-gray-500"
          >
            <i :class="showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'"></i>
          </button>
        </div>

        <!-- Confirm Password -->
        <div class="relative">
          <label class="block text-blue-500 mb-1 text-sm font-medium"
            >Confirm Password</label
          >
          <input
            :type="showConfirm ? 'text' : 'password'"
            v-model="confirmPassword"
            class="w-full px-4 py-3 border border-blue-400 rounded-xl focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Confirm password"
          />
          <button
            type="button"
            @click="toggleConfirm"
            class="absolute right-4 top-[42px] text-gray-500"
          >
            <i :class="showConfirm ? 'fa fa-eye' : 'fa fa-eye-slash'"></i>
          </button>
        </div>
      </div>

      <!-- Update Button -->
      <div
        class="w-full bg-blue-500 mt-40 hover:bg-blue-600 text-white text-xl text-center py-3 cursor-pointer rounded-xl"
      >
        Update
      </div>
    </div>
  </div>
</template>
