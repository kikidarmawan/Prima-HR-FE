<template>
  <div class="min-h-screen flex justify-center bg-white px-4">
    <div class="w-full max-w-sm mt-10 m-2 relative">
      
      <!-- Back Button -->
      <div class="absolute top-0 left-0">
        <button @click="goBack">
          <svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" stroke-width="2"
               viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>

      <!-- Title -->
      <div class="text-center mt-6">
        <h1 class="text-2xl font-bold text-gray-800">Enter New Password</h1>
        <p class="text-sm text-gray-500 mt-1">Please enter your new password</p>
      </div>

      <!-- Illustration -->
      <div class="flex justify-center my-6">
        <img src="" alt="Password Illustration" class="w-64 max-w-full" />
      </div>

      <!-- Input Fields -->
      <div class="space-y-4">
        <!-- Password Field -->
        <div class="relative">
          <input
            :type="showPassword ? 'text' : 'password'"
            placeholder="Enter New Password"
            v-model="password"
            class="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            @click="togglePassword"
          >
            <span v-if="showPassword">🙈</span>
            <span v-else>👁️</span>
          </button>
        </div>

        <!-- Re-Enter Password -->
        <div class="relative">
          <input
            :type="showRePassword ? 'text' : 'password'"
            placeholder="Re-Enter Password"
            v-model="rePassword"
            class="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            @click="toggleRePassword"
          >
            <span v-if="showRePassword">🙈</span>
            <span v-else>👁️</span>
          </button>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="mt-6">
        <button
          @click="updatePassword"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white text-base font-medium py-3 rounded-xl"
        >
          Update Password
        </button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: '',
      rePassword: '',
      showPassword: false,
      showRePassword: false,
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    toggleRePassword() {
      this.showRePassword = !this.showRePassword;
    },
    goBack() {
      this.$router.back();
    },
    updatePassword() {
      if (this.password !== this.rePassword) {
        alert("Passwords do not match!");
        return;
      }
      alert("Password updated successfully!");
    },
  },
};
</script>

<style scoped>
/* Tambahan gaya opsional */
</style>
