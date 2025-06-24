<script setup>
import { useDarkMode } from '@/composables/useDarkMode'
import { Icon } from '@iconify/vue'
const { isDark, toggleDark } = useDarkMode()
</script>

<template>
  <button @click="toggleDark" class="...">
    <Icon :icon="isDark ? 'mdi:weather-sunny' : 'mdi:weather-night'" />
    <span>{{ isDark ? 'Light' : 'Dark' }}</span>
  </button>
</template>
