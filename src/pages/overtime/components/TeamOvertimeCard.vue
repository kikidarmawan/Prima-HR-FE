<script setup>
const props = defineProps({
  member: { type: Object, required: true },
});
</script>

<template>
  <div
    class="p-4 rounded-2xl shadow-md bg-white dark:bg-gray-800 flex justify-between items-center"
  >
    <!-- Left: Info (tanpa avatar) -->
    <div>
      <p class="font-semibold text-gray-800 dark:text-gray-200">
        {{ member.name }}
      </p>
      <p class="text-sm text-gray-500">{{ member.date }}</p>
    </div>

    <!-- Right: Action Buttons -->
    <div class="flex gap-2">
      <button
        class="px-3 py-1 text-white bg-red-600 rounded-full text-sm font-medium"
      >
        Reject
      </button>
      <button
        class="px-3 py-1 text-white bg-green-500 rounded-full text-sm font-medium"
      >
        Accept
      </button>
    </div>
  </div>
</template>
