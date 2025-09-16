<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import SuccessModal from "@/components/SuccessModal.vue";
import api from "@/services/api";

const store = useStore();
const router = useRouter();

// form data
const oldPassword = ref("");
const password = ref("");
const confirmPassword = ref("");

// toggle visibility
const showOld = ref(false);
const showPassword = ref(false);
const showConfirm = ref(false);

// modal states
const showLoadingModal = ref(false);
const showSuccessModal = ref(false);
const showErrorModal = ref(false);
const errorMessage = ref("");

// toggle functions
const toggleOld = () => (showOld.value = !showOld.value);
const togglePassword = () => (showPassword.value = !showPassword.value);
const toggleConfirm = () => (showConfirm.value = !showConfirm.value);

// update password function
const updatePassword = async () => {
  if (!oldPassword.value || !password.value || !confirmPassword.value) {
    errorMessage.value = "Semua field harus diisi";
    showErrorModal.value = true;
    return;
  }
  
  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Password baru dan konfirmasi tidak cocok";
    showErrorModal.value = true;
    return;
  }

  showLoadingModal.value = true;
  
  try {
    await api.post("/api/change-password", {
      password: oldPassword.value,
      new_password: password.value,
    });
    
    showLoadingModal.value = false;
    showSuccessModal.value = true;
  } catch (error) {
    showLoadingModal.value = false;
    console.error(error.response?.data || error);
    errorMessage.value = 
      "Gagal mengubah password: " +
      (error.response?.data?.message || error.message);
    showErrorModal.value = true;
  }
};

const handleSuccessClose = () => {
  showSuccessModal.value = false;
  router.push("/profile");
};
</script>

<template>
  <div
    class="bg-white dark:bg-[#0c0e19] min-h-screen transition-colors duration-300"
  >
    <div class="max-w-sm mx-auto">
      <!-- Header -->
      <div class="flex items-center justify-between p-6">
        <router-link
          to="/profile"
          class="text-2xl text-gray-700 dark:text-white"
        >
          <i class="fa-solid fa-angle-left"></i>
        </router-link>
        <h1 class="text-xl font-semibold text-gray-800 dark:text-white">
          Change Password
        </h1>
        <div class="w-6"></div>
      </div>
      
      <!-- Form -->
      <div class="px-6 space-y-6">
        <!-- Old Password -->
        <div class="relative">
          <label class="block text-blue-500 mb-1 text-sm font-medium"
            >Old Password</label
          >
          <input
            :type="showOld ? 'text' : 'password'"
            v-model="oldPassword"
            class="w-full px-4 py-3 border border-blue-400 rounded-xl focus:outline-none focus:ring focus:ring-blue-300 text-gray-800 dark:text-white bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="Enter old password"
          />
          <button
            type="button"
            @click="toggleOld"
            class="absolute right-4 top-[42px] text-gray-500 dark:text-gray-400"
          >
            <i :class="showOld ? 'fa fa-eye' : 'fa fa-eye-slash'"></i>
          </button>
        </div>
        
        <!-- New Password -->
        <div class="relative">
          <label class="block text-blue-500 mb-1 text-sm font-medium"
            >New Password</label
          >
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            class="w-full px-4 py-3 border border-blue-400 rounded-xl focus:outline-none focus:ring focus:ring-blue-300 text-gray-800 dark:text-white bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="Enter new password"
          />
          <button
            type="button"
            @click="togglePassword"
            class="absolute right-4 top-[42px] text-gray-500 dark:text-gray-400"
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
            class="w-full px-4 py-3 border border-blue-400 rounded-xl focus:outline-none focus:ring focus:ring-blue-300 text-gray-800 dark:text-white bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="Re-enter new password"
          />
          <button
            type="button"
            @click="toggleConfirm"
            class="absolute right-4 top-[42px] text-gray-500 dark:text-gray-400"
          >
            <i :class="showConfirm ? 'fa fa-eye' : 'fa fa-eye-slash'"></i>
          </button>
        </div>
        
        <!-- Update Button -->
        <div
          @click="updatePassword"
          class="w-full bg-blue-500 mt-10 hover:bg-blue-600 text-white text-xl text-center py-3 cursor-pointer rounded-xl transition-colors duration-300"
        >
          Update
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Loading -->
  <transition
    enter-active-class="transition-opacity duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="showLoadingModal"
      class="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
    >
      <div
        class="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-sm w-full mx-4 flex flex-col items-center shadow-xl"
      >
        <svg
          class="animate-spin h-12 w-12 text-blue-500 mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 
            3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Loading...
        </h3>
        <p class="text-gray-600 dark:text-gray-300 text-center text-sm">
          Updating Password
        </p>
      </div>
    </div>
  </transition>

  <!-- Success Modal untuk Password -->
  <SuccessModal
    v-if="showSuccessModal"
    title="Password Updated"
    message="Your password has been changed successfully."
    @close="handleSuccessClose"
  />

  <!-- Error Modal -->
  <transition
    enter-active-class="transition-opacity duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="showErrorModal"
      class="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
    >
      <div
        class="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl text-center"
      >
        <h3 class="text-lg font-semibold text-red-500 mb-2">Error</h3>
        <p class="text-gray-700 dark:text-gray-300 text-sm mb-4">
          {{ errorMessage }}
        </p>
        <button
          @click="showErrorModal = false"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Tutup
        </button>
      </div>
    </div>
  </transition>
</template>