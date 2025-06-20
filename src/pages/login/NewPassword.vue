<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import SuccessModal from '@/components/SuccessModal.vue'
import Password from "@/assets/images/newpassword.png"
import Success from "@/assets/images/success.png"

const router = useRouter()

const password = ref('')
const rePassword = ref('')
const showPassword = ref(false)
const showRePassword = ref(false)
const showSuccessModal = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const toggleRePassword = () => {
  showRePassword.value = !showRePassword.value
}

const updatePassword = () => {
  if (password.value !== rePassword.value) {
    alert('Passwords do not match!')
    return
  }

  showSuccessModal.value = true
  password.value = ''
  rePassword.value = ''
}

const goToHome = () => {
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-white flex flex-col p-6">
    <router-link to="/forgot-password"  class="mb-6 text-2xl">
         <i class="fa-solid fa-angle-left"></i>
    </router-link>
    <h1 class="text-3xl font-bold text-gray-800 mb-1">Enter New Password</h1>
    <p class="text-gray-500 mb-6">Please enter your new password.</p>

    <div class="flex justify-center mb-2">
      <img :src="Password" alt="New Password" class="w-90 zh-auto" />
    </div>

    <div class="space-y-4 mt-6">
      <!-- form -->
      <div class="space-y-4">
        <!-- password -->
        <div class="relative">
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            placeholder=" "
            class="w-full border border-blue-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400 peer"
          />
          <label
            class="absolute left-4 -top-2 bg-white px-1 text-xs text-blue-600 z-10 pointer-events-none transition-all duration-200
              peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600"
          >
            Enter New Password
          </label>
          <button
            type="button"
            class="absolute right-3 top-1/2 cursor-pointer transform -translate-y-1/2 text-gray-500"
            @click="togglePassword"
          >
            <Icon :icon="showPassword ? 'mdi:eye-off' : 'mdi:eye'" class="w-5 h-5" />
          </button>
        </div>

        <!-- re-password -->
        <div class="relative">
          <input
            :type="showRePassword ? 'text' : 'password'"
            v-model="rePassword"
            placeholder=" "
            class="w-full border border-blue-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400 peer"
          />
          <label
            class="absolute left-4 -top-2 bg-white px-1 text-xs text-blue-600 z-10 pointer-events-none transition-all duration-200
              peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600"
          >
            Re-Enter Password
          </label>
          <button
            type="button"
            class="absolute right-3 top-1/2 cursor-pointer transform -translate-y-1/2 text-gray-500"
            @click="toggleRePassword"
          >
            <Icon :icon="showRePassword ? 'mdi:eye-off' : 'mdi:eye'" class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- submit -->
      <div class="mt-6">
        <button
          @click="updatePassword"
          class="w-full bg-blue-500  hover:bg-blue-600 text-white text-base font-medium py-3 cursor-pointer rounded-xl"
        >
          Update Password
        </button>
      </div>
    </div>

    <!-- Modal -->
    <SuccessModal v-if="showSuccessModal" :img="Success" @close="goToHome"/>

  </div>
</template>
