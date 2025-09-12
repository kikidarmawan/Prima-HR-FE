<template>
  <div
    class="bg-white dark:bg-gray-800 py-3 px-5 rounded-2xl text-sm space-y-2 text-gray-800 dark:text-gray-100"
  >
    <!-- Atas: Date + Status -->
    <div class="flex items-start justify-between">
      <div>
        <p class="text-xs text-gray-500 dark:text-gray-400">Date</p>
        <p class="font-bold text-sm">{{ formattedDate }}</p>
      </div>
      <span
        class="text-xs px-2 py-0.5 rounded-full font-medium mt-1/2"
        :class="{
          'bg-green-100 dark:bg-green-700/20 text-green-600 dark:text-green-400': item.status === 'Approved',
          'bg-red-100 dark:bg-red-700/20 text-red-600 dark:text-red-400': item.status === 'Rejected',
          'bg-yellow-100 dark:bg-yellow-700/20 text-yellow-600 dark:text-yellow-400': item.status === 'Pending'
        }"
      >
        {{ item.status }}
      </span>
    </div>

    <!-- Garis pemisah -->
    <div class="border-t border-gray-200 dark:border-gray-600 my-4" />

    <div class="flex flex-row items-center justify-around">
      <div class="flex flex-col items-center justify-center">
        <span class="text-xs font-medium text-gray-500 dark:text-gray-400">{{ item.applyDays }}</span>
        <span class="font-bold">{{ item.day }}</span>
      </div>
      <div class="flex flex-col items-center justify-center">
        <span class="text-xs font-medium text-gray-500 dark:text-gray-400">Category</span>
        <span class="font-bold">{{ item.leaveBalanceValue }}</span>
      </div>
      <div class="flex flex-col items-center justify-center">
        <span class="text-xs font-medium text-gray-500 dark:text-gray-400">{{ item.approvedBy }}</span>
        <span class="font-bold">{{ item.approvedByValue }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  item: Object,
});

// Format tanggal ke d-m-y
const formattedDate = computed(() => {
  if (!props.item?.date) return "";
  const date = new Date(props.item.date);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
});
</script>
