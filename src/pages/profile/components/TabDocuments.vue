<template>
  <div class="space-y-3">
    <div
      v-for="doc in documents"
      :key="doc"
      class="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 border border-gray-400 dark:border-gray-300 rounded-xl"
    >
      <div class="flex items-center gap-3">
        <i class="fa-regular fa-file-lines text-lg text-gray-600 dark:text-white"></i>
        <span class="text-sm font-medium text-black dark:text-white">{{ doc }}</span>
      </div>
      <i class="fa-regular fa-copy text-gray-400 cursor-pointer"></i>
    </div>
  </div>
</template>

<script setup>
const documents = [
  'Offer Letter',
  'Appointment Letter',
  'Bond Agreement',
  'Appraisal Letter',
  'Salary Slip'
]
</script>
