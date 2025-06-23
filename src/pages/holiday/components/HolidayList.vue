<template>
  <div class="flex items-center bg-white rounded-xl p-4 mb-3 relative">
    <!-- Strip warna di kiri -->
    <div
      class="absolute left-0 top-0 bottom-0 w-3 rounded-l-xl"
      :class="highlight ? 'bg-blue-500' : 'bg-gray-300'"
    ></div>

    <div class="pl-4 flex flex-col w-full">
      <div class="flex items-center justify-between text-sm text-gray-500">
        <span class="flex items-center">
          <i class="fas fa-calendar-alt mr-1"></i>
          {{ date }}
        </span>
        <span>{{ day }}</span>
      </div>
      <p class="font-semibold text-black text-lg">{{ name }}</p>
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
