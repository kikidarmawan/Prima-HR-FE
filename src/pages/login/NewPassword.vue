<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import SuccessModal from "@/components/SuccessModal.vue";
import Password from "@/assets/images/newpassword.png";
import Success from "@/assets/images/success.png";
import { useDarkMode } from "@/composables/useDarkMode";

const router = useRouter();

// Dark mode hook
useDarkMode()

const password = ref("");
const rePassword = ref("");
const showPassword = ref(false);
const showRePassword = ref(false);
const showSuccessModal = ref(false);

const togglePassword = () => (showPassword.value = !showPassword.value);
const toggleRePassword = () => (showRePassword.value = !showRePassword.value);
const updatePassword = () => {
  if (password.value !== rePassword.value) {
    alert("Passwords do not match!");
    return;
  }

  showSuccessModal.value = true;
  password.value = "";
  rePassword.value = "";
};

const goToHome = () => router.push("/login");
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-[#0c0e19] text-gray-800 dark:text-white p-6 transition-colors duration-300">
    <!-- Back Button -->
    <router-link to="/forgot-password" class="mb-6 text-2xl text-gray-800 dark:text-white inline-block">
      <i class="fa-solid fa-angle-left"></i>
    </router-link>

    <!-- Title -->
    <h1 class="text-3xl font-bold mb-1">Enter New Password</h1>
    <p class="text-gray-500 dark:text-gray-300 mb-6">Please enter your new password.</p>

    <!-- Image -->
    <div class="flex justify-center mb-6">
      <img :src="Password" alt="New Password" class="w-90" />
    </div>

    <!-- Form Fields -->
    <div class="space-y-5">
      <!-- Password -->
      <div class="relative">
        <input
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          placeholder=" "
          class="peer w-full px-4 py-2 pr-10 rounded-md border border-blue-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <label
          class="absolute left-4 -top-2 px-1 text-xs bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 z-10 transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-xs"
        >
          Enter New Password
        </label>
        <button
          type="button"
          @click="togglePassword"
          class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
        >
          <Icon :icon="showPassword ? 'mdi:eye' : 'mdi:eye-off'" class="w-5 h-5" />
        </button>
      </div>

      <!-- Re-Password -->
      <div class="relative">
        <input
          :type="showRePassword ? 'text' : 'password'"
          v-model="rePassword"
          placeholder=" "
          class="peer w-full px-4 py-2 pr-10 rounded-md border border-blue-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <label
          class="absolute left-4 -top-2 px-1 text-xs bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 z-10 transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-xs"
        >
          Re-Enter Password
        </label>
        <button
          type="button"
          @click="toggleRePassword"
          class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
        >
          <Icon :icon="showRePassword ? 'mdi:eye' : 'mdi:eye-off'" class="w-5 h-5" />
        </button>
      </div>

      <!-- Submit -->
      <button
        @click="updatePassword"
        class="cursor-pointer w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-xl"
      >
        Update Password
      </button>
    </div>

    <!-- Modal -->
    <SuccessModal v-if="showSuccessModal" :img="Success" @close="goToHome" />
  </div>
</template>
