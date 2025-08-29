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
        <img :src="img" alt="Success" class="mx-auto w-40 mb-4" />
        <h2 class="text-lg font-bold text-blue-500 mb-1 dark:text-blue-400">
          🎉 Congratulations
        </h2>
        <p class="text-sm text-gray-600 dark:text-gray-300 mb-6">
          Your account is ready to use
        </p>
        <button
          @click="$emit('close')"
          class="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded-lg text-sm font-semibold cursor-pointer"
        >
          Back to Login
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

defineProps({
  img: {
    type: String,
    required: true,
  },
});

const visible = ref(false);

onMounted(() => {
  visible.value = true;
});
</script>
