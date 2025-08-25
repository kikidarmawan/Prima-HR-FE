<template>
  <!-- Bottom Navbar -->
  <div class="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center">
    <div
      class="relative bg-white dark:bg-gray-900 shadow-xl h-16 rounded-t-3xl px-4 flex items-center justify-between w-106 mx-auto transition-colors duration-300"
    >
      <!-- Curve Bulatan Tengah -->
      <div
        class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white dark:bg-gray-900 rounded-full z-10 flex items-center justify-center"
      >
        <button
          class="cursor-pointer w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-md"
          @click="openCamera"
        >
          <i class="fa-solid fa-camera text-xl"></i>
        </button>
      </div>

      <!-- Icons -->
      <div class="flex justify-between items-center w-full">
        <!-- Left 2 -->
        <div class="flex gap-15 items-center pl-2">
          <router-link to="/home">
            <i
              class="fa-solid fa-house text-xl text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            ></i>
          </router-link>
          <router-link to="/leaves">
            <i
              class="fa-regular fa-calendar text-xl text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            ></i>
          </router-link>
        </div>

        <!-- Right 2 -->
        <div class="flex gap-15 items-center pr-2">
          <router-link to="/holiday">
            <i
              class="fa-solid fa-umbrella-beach text-xl text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            ></i>
          </router-link>
          <router-link to="/profile">
            <i
              class="fa-regular fa-user text-xl text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            ></i>
          </router-link>
        </div>
      </div>
    </div>
  </div>

  <!-- Camera Modal -->
  <CameraModal v-if="isCameraOpen" @close="closeCamera" />
</template>

<script setup>
import { ref } from 'vue'
import CameraModal from './CameraModal.vue'

const isCameraOpen = ref(false)

const openCamera = () => {
  isCameraOpen.value = true
}

const closeCamera = () => {
  isCameraOpen.value = false
}
</script>
