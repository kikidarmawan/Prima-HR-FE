<script setup>
import { ref, computed } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"
import { Icon } from "@iconify/vue"
import Login from "../../assets/images/prime.jpeg"

const router = useRouter()
const store = useStore()

const showPassword = ref(false)
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const username = ref("")
const password = ref("")

const errorMessage = computed(() => store.getters["auth/errorMessage"])

const handleLogin = async () => {
  const success = await store.dispatch("auth/login", {
    username: username.value,
    password: password.value
  })

  if (success) {
    router.push("/home")
  }
}
</script>

<template>
  <div
    class="min-h-screen flex justify-center bg-white dark:bg-black px-3 text-gray-900 dark:text-white transition-colors duration-300">
    <div class="w-full max-w-sm mt-15 m-6">
      <!-- logo prime -->
      <div class="flex justify-start mb-6">
        <img :src="Login" alt="Logo" class="w-20 h-20 rounded-full" />
      </div>

      <!-- header -->
      <h2 class="text-3xl text-start font-semibold">Welcome Back</h2>
      <p class="text-start text-2xl font-bold">
        To
        <span class="text-blue-600 dark:text-blue-400 font-bold">PRIMA HR</span>
      </p>
      <p class="text-start text-sm text-gray-400 dark:text-gray-300 mb-6">
        Hello There, Login To Continue
      </p>

      <!-- form -->
      <form @submit.prevent="handleLogin">
        <!-- username -->
        <div class="mb-4 relative">
          <input v-model="username" type="text" placeholder=" "
            class="w-full border border-blue-300 dark:border-blue-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 peer" />
          <label
            class="absolute left-3 -top-2 bg-white dark:bg-gray-800 px-1 text-xs text-blue-600 dark:text-blue-400 z-10 pointer-events-none transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600 dark:peer-focus:text-blue-400">
            Username
          </label>
        </div>

        <!-- password -->
        <div class="mb-4 relative">
          <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder=" "
            class="w-full border border-blue-300 dark:border-blue-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400 peer" />
          <label
            class="absolute left-3 -top-2 bg-white dark:bg-gray-800 px-1 text-xs text-blue-600 dark:text-blue-400 z-10 pointer-events-none transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600">
            Password
          </label>
          <button type="button" @click="togglePassword"
            class="absolute right-3 top-2.5 text-gray-500 dark:text-gray-300">
            <Icon :icon="showPassword ? 'mdi:eye' : 'mdi:eye-off'" class="cursor-pointer w-5 h-5" />
          </button>
        </div>

        <!-- error message -->
        <p v-if="errorMessage" class="text-red-500 text-sm mb-4">{{ errorMessage }}</p>

        <!-- forgot password -->
        <div class="text-right text-sm mb-6">
          <router-link to="/forgot-password" class="text-blue-500 hover:underline">
            Forgot Password?
          </router-link>
        </div>

        <!-- login -->
        <button type="submit"
          class="cursor-pointer w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-medium transition-colors">
          Login
        </button>
      </form>

    </div>
  </div>
</template>
