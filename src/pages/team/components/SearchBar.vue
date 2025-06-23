<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl p-3 mb-2 flex items-center shadow-md transition-colors duration-300">
    <svg
      class="w-5 h-5 text-gray-400 dark:text-gray-300 mr-2"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 24 24"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Search"
      class="w-full outline-none bg-transparent text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
    />
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
});
defineEmits(["update:modelValue"]);
</script>
