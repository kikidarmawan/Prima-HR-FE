<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import Login from "../../assets/images/prime.jpeg";


const showPassword = ref(false)
const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div class="min-h-screen flex m-2 mt-10 justify-center bg-white px-4">
    <div class="w-full max-w-sm">
      <!-- logo prime -->
      <div class="flex justify-start mb-6">
        <img :src="Login" alt="Logo" class="w-20 h-20 rounded-full" />
      </div>

      <!-- header -->
      <h2 class="text-3xl text-start font-semibold">Welcome Back</h2>
      <p class="text-start text-2xl font-bold">
        To <span class="text-blue-600 font-bold">PRIMA HR</span>
      </p>
      <p class="text-start text-sm text-gray-400 mb-6">Hello There, Login To Continue</p>

      <!-- form -->
      <form>
        <!-- email -->
        <div class="mb-4 relative">
          <input
            type="email"
            placeholder=" "
            class="w-full border border-blue-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 peer"
          />
          <label
            class="absolute left-3 -top-2 bg-white px-1 text-xs text-blue-600 z-10 pointer-events-none transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600"
          >
            Email Address
          </label>
        </div>

      <!-- password -->
      <div class="mb-4 relative">
        <input
          :type="showPassword ? 'text' : 'password'"
          placeholder=" "
          class="w-full border border-blue-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400 peer"/>
        <label
          class="absolute left-3 -top-2 bg-white px-1 text-xs text-blue-600 z-10 pointer-events-none transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600">
          Password
        </label>
        <!-- eye icon -->
        <button type="button" @click="togglePassword" class="absolute right-3 top-2.5 text-gray-500">
          <Icon :icon="showPassword ? 'mdi:eye' : 'mdi:eye-off'" class="w-5 h-5" />
        </button>
      </div>

        <!-- forgot password -->
        <div class="text-right text-sm mb-6">
          <a href="/forgot-password" class="text-blue-500 hover:underline">Forgot Password?</a>
        </div>

        <!-- login -->
        <router-link to="/home">
          <button
          type="submit"
          class="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-medium">
          Login
        </button>
        </router-link>
      </form>
    </div>
  </div>
</template>

