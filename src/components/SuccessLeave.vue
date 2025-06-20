<script setup></script>

<template>
  <div
    class="fixed inset-0 flex items-end justify-center bg-black/50 backdrop-blur-xs pb-"
  >
    <div
      class="bg-white rounded-t-2xl p-6 w-full max-w-md text-center shadow-xl"
    >
      <div class="flex items-center justify-center mb-4">
        <div class="bg-blue-100 rounded-full p-4">
          <div class="bg-blue-500 rounded-full p-4">
            <svg
              class="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
      </div>
      <h2 class="text-lg font-semibold text-gray-900">
        Leave Applied Successfully
      </h2>
      <p class="text-sm text-gray-600 mt-1">
        Your Leave has been applied successfully
      </p>

      <button
        @click="$emit('close')"
        class="mt-6 w-full bg-blue-500 cursor-pointer text-white rounded-lg py-2 text-sm hover:bg-blue-600 transition duration-200"
      >
        Done
      </button>
    </div>
  </div>
</template>
