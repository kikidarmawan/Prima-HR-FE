<template>
  <div class="bg-white dark:bg-gray-800 py-3 px-5 rounded-2xl text-sm space-y-2 text-gray-800 dark:text-gray-100">
    <!-- Atas: Date + Status -->
    <div class="flex items-start justify-between">
      <div>
        <p class="text-xs text-gray-500 dark:text-gray-400">Date</p>
        <p class="font-bold text-sm">{{ item.date }}</p>
      </div>
      <span
        class="text-xs px-2 py-0.5 rounded-full font-medium mt-1/2"
        :class="{
          'bg-green-100 dark:bg-green-700/20 text-green-600 dark:text-green-400': item.status === 'Approved',
          'bg-red-100 dark:bg-red-700/20 text-red-600 dark:text-red-400': item.status === 'Rejected'
        }"
      >
        {{ item.status }}
      </span>
    </div>

    <!-- Garis pemisah -->
    <div class="border-t border-gray-200 dark:border-gray-600 my-4" />

    <!-- Label (row 1) -->
    <div class="flex justify-between text-xs font-medium text-gray-500 dark:text-gray-400">
      <span>{{ item.applyDays }}</span>
      <span>{{ item.leaveBalance }}</span>
      <span>{{ item.approvedBy }}</span>
    </div>

    <!-- Value (row 2) -->
    <div class="flex justify-between font-bold">
      <span>{{ item.day }}</span>
      <span>{{ item.leaveBalanceValue }}</span>
      <span>{{ item.approvedByValue }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: Object,
});
</script>
