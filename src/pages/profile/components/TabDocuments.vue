<template>
  <div class="space-y-3">
    <div
      v-for="doc in documents"
      :key="doc"
      class="flex items-center justify-between p-4 bg-gray-100 rounded-xl"
    >
      <div class="flex items-center gap-3">
        <i class="fa-regular fa-file-lines text-lg text-gray-600"></i>
        <span class="text-sm font-medium">{{ doc }}</span>
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
