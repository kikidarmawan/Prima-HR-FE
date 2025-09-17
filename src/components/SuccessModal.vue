<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs"
  >
    <transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-show="visible"
        class="bg-white dark:bg-gray-900 rounded-2xl p-6 w-80 text-center shadow-xl transition-colors duration-300"
      >
        <svg
          class="mx-auto w-20 h-20 text-green-500 mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2"/>
          <path
            fill="currentColor"
            d="M10 14l-2-2-1.5 1.5L10 17l7-7-1.5-1.5z"
          />
        </svg>
        <!-- Title -->
        <h2 class="text-xl font-bold text-blue-400 mb-2 dark:text-blue-500">
          {{ title }}
        </h2>
        <!-- Subtitle -->
        <p class="text-sm text-gray-600 dark:text-gray-300 mb-6">
          {{ message }}
        </p>
        <!-- Button -->
        <button
          @click="$emit('close')"
          class="bg-blue-500  hover:bg-blue-600 text-white w-full py-2 rounded-lg text-sm font-semibold cursor-pointer"
          class="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white w-full py-2 rounded-lg text-sm font-semibold"
        >
          Done
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

defineProps({
  title: {
    type: String,
    default: "Profile Updated"
  },
  message: {
    type: String,
    default: "Your changes have been saved successfully."
  }
});

const visible = ref(false);
onMounted(() => {
  visible.value = true;
});
</script>