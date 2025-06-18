<script setup>
const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  activeTab: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="flex bg-gray-100 rounded-xl overflow-hidden">
    <button
      v-for="opt in options"
      :key="opt"
      type="button"
      @click="$emit('update:activeTab', opt)"
      class="flex-1 py-2 text-center cursor-pointer transition-colors duration-200 mx-1 rounded-xl"
      :class="activeTab === opt
        ? 'bg-blue-500 text-white'
        : 'bg-transparent text-gray-600 hover:bg-gray-100'"
    >
      {{ opt }}
    </button>
  </div>
</template>
