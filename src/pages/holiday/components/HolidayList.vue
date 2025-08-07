<template>
  <div class="flex items-center bg-white dark:bg-gray-900 rounded-xl p-4 mb-3 relative transition-colors duration-300">
    <!-- Strip warna di kiri -->
    <div
      class="absolute left-0 top-0 bottom-0 w-3 rounded-l-xl"
      :class="highlight ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-700'"
    ></div>

    <div class="pl-4 flex flex-col w-full">
      <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <span class="flex items-center">
          <i class="fas fa-calendar-alt mr-1"></i>
          {{ date }}
        </span>
        <span>{{ day }}</span>
      </div>
      <p class="font-semibold text-black dark:text-white text-lg">{{ name }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  date: String,
  day: String,
  name: String,
  highlight: Boolean,
});
</script>
