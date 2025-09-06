<script setup>
const props = defineProps({
  member: { type: Object, required: true },
});
</script>

<template>
  <div
    class="p-4 rounded-2xl shadow-md bg-white dark:bg-gray-800 border flex justify-between items-center"
  >
    <!-- Left: Avatar + Info -->
    <div class="flex items-center gap-3">
      <img
        :src="member.avatar || 'https://via.placeholder.com/40'"
        alt="avatar"
        class="w-10 h-10 rounded-full object-cover"
      />
      <div>
        <p class="font-semibold text-gray-800 dark:text-gray-200">
          {{ member.name }}
        </p>
        <p class="text-sm text-gray-500">{{ member.date }}</p>
      </div>
    </div>

    <!-- Right: Action Buttons -->
    <div class="flex gap-2">
      <button
        class="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium"
      >
        Reject
      </button>
      <button
        class="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium"
      >
        Accept
      </button>
    </div>
  </div>
</template>
