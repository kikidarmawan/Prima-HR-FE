<template>
  <div>
    <p class="text-xs text-gray-400 mb-1">{{ label }}</p>
    <p class="text-sm font-medium text-gray-800">{{ value }}</p>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  value: String,
});
</script>
