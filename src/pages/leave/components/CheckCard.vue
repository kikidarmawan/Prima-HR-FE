<template>
  <div class="bg-white py-3 px-5 rounded-2xl text-sm space-y-2">
    <!-- Atas: Date + Status -->
    <div class="flex items-start justify-between">
      <div>
        <p class=" text-xs">Date</p>
        <p class="font-bold text-sm">{{ item.date }}</p>
      </div>
      <span
        class="text-xs px-2 py-0.5 rounded-full font-medium mt-1/2"
        :class="{
          'bg-green-50 text-blue-500': item.status === 'Approved',
          'bg-rose-50 text-rose-500': item.status === 'Rejected'
        }"
      >
        {{ item.status }}
      </span>
    </div>

    <!-- Garis pemisah -->
    <div class="border-t border-gray-200 my-4" />

    <!-- Label (row 1) -->
    <div class="flex justify-between text-xs font-medium">
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