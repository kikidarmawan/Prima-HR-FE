<script setup>
const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  activeTab: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="flex bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden p-1 transition-colors duration-300">
    <button
      v-for="opt in options"
      :key="opt"
      type="button"
      @click="$emit('update:activeTab', opt)"
      class="flex-1 py-2 text-center cursor-pointer text-sm font-medium rounded-lg transition-colors duration-200"
      :class="[
        activeTab === opt
          ? 'bg-blue-500 text-white'
          : 'bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
      ]"
    >
      {{ opt }}
    </button>
  </div>
</template>
