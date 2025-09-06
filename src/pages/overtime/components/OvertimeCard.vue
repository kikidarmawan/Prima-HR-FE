<script setup>
const props = defineProps({
  item: { type: Object, required: true },
});
</script>

<template>
  <div class="p-4 rounded-2xl shadow-md bg-white dark:bg-gray-800 border space-y-2">
    <!-- Date & Time -->
    <div class="flex justify-between items-center">
      <span class="font-semibold text-gray-800 dark:text-gray-200">
        {{ item.date }}
      </span>
      <span
        class="text-xs px-3 py-1 rounded-full font-medium"
        :class="{
          'bg-yellow-100 text-yellow-700': item.status === 'Pending',
          'bg-green-100 text-green-700': item.status === 'Approved',
          'bg-red-100 text-red-700': item.status === 'Rejected',
        }"
      >
        {{ item.status }}
      </span>
    </div>

    <!-- Time & Total Hours -->
    <p class="text-sm text-gray-500">
      {{ item.start }} - {{ item.end }} • {{ item.totalHours }}
    </p>

    <!-- Description -->
    <p class="text-sm text-gray-700 dark:text-gray-300 border-t pt-2">
      {{ item.description }}
    </p>

    <!-- Footer -->
    <div class="flex justify-between items-center text-xs text-gray-500 pt-2">
      <span>Status: {{ item.status }}</span>
      <span v-if="item.approvedBy">
        {{ item.status === 'Rejected' ? 'Rejected by' : 'Approved by' }}
        <span class="font-medium text-gray-800 dark:text-gray-200">
          {{ item.approvedBy }}
        </span>
      </span>
    </div>
  </div>
</template>
