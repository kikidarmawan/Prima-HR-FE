<script setup>
import { ref } from 'vue'

const isLoading = ref(false)

const handleDone = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    emit('close')
  }, 2000)
}

const emit = defineEmits(['close'])
</script>

<template>
  <div
    class="fixed inset-0 flex items-end justify-center bg-black/50 backdrop-blur-xs"
  >
    <!-- Success Modal -->
    <div
      class="bg-white dark:bg-black rounded-t-2xl p-6 w-105 max-w-md text-center shadow-xl transition-opacity duration-300"
      :class="{ 'pointer-events-none opacity-70': isLoading }"
    >
      <div class="flex items-center justify-center mb-4">
        <div class="bg-blue-100 dark:bg-blue-900 rounded-full p-4">
          <div class="bg-blue-500 rounded-full p-4">
            <svg
              class="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
      </div>

      <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
        Leave Applied Successfully
      </h2>
      <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
        Your leave has been applied successfully
      </p>

      <button
        @click="handleDone"
        :disabled="isLoading"
        class="mt-6 w-full bg-blue-500 text-white rounded-lg py-2 text-sm hover:bg-blue-600 transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
      >
        <span v-if="!isLoading">Done</span>
        <span v-else class="inline-flex items-center">
          <svg
            class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing...
        </span>
      </button>
    </div>

    <!-- Loading Overlay -->
    <transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isLoading"
        class="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      >
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-xs w-full shadow-xl">
          <div class="flex flex-col items-center">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Loading</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Processing your request...</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>