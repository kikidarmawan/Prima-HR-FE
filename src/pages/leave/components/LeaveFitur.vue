<script setup>
import { ref } from "vue";

const status = ref(["Approved"]);
const leaveType = ref(["Sick Leave"]);
const teamMember = ref("Alexa Williams");

const emit = defineEmits(["close"]);

const resetFilter = () => {
  status.value = [];
  leaveType.value = [];
  teamMember.value = "";
};
</script>
<template>
  <div class="fixed inset-0 z-50 flex items-end justify-center bg-black/30 backdrop-blur-sm">
    <div class="bg-white dark:bg-gray-900 w-105 max-w-md rounded-t-3xl px-6 pt-4 pb-6 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <!-- Garis indikator -->
      <div class="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-4"></div>

      <!-- Header -->
      <div class="flex items-center justify-between mb-4">
        <h2 class="font-semibold text-lg">Filter</h2>
        <button
          @click="emit('close')"
          class="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          &times;
        </button>
      </div>

      <!-- Status Filter -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Status</label>
        <div class="space-y-2">
          <label class="flex items-center gap-2 text-sm">
            <input type="checkbox" value="Approved" v-model="status" class="accent-blue-500" />
            Approved
          </label>
          <label class="flex items-center gap-2 text-sm">
            <input type="checkbox" value="Unapproved" v-model="status" class="accent-blue-500" />
            Unapproved
          </label>
          <label class="flex items-center gap-2 text-sm">
            <input type="checkbox" value="Pending" v-model="status" class="accent-blue-500" />
            Pending
          </label>
        </div>
      </div>

      <!-- Leave Type Filter -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Leave Type</label>
        <div class="space-y-2">
          <label class="flex items-center gap-2 text-sm">
            <input type="checkbox" value="Sick Leave" v-model="leaveType" class="accent-blue-500" />
            Sick Leave
          </label>
          <label class="flex items-center gap-2 text-sm">
            <input type="checkbox" value="Planned Leave" v-model="leaveType" class="accent-blue-500" />
            Planned Leave
          </label>
          <label class="flex items-center gap-2 text-sm">
            <input type="checkbox" value="Holiday" v-model="leaveType" class="accent-blue-500" />
            Holiday
          </label>
        </div>
      </div>

      <!-- Team Member -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Team Member</label>
        <div class="relative">
          <span class="absolute left-3 top-2 text-xs text-blue-500 pointer-events-none">
            Select Team Member
          </span>
          <select
            v-model="teamMember"
            class="w-full border border-blue-400 text-sm pt-5 px-3 pb-2 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none mt-1"
          >
            <option disabled value="">Select Team Member</option>
            <option>Alexa Williams</option>
            <option>Martin Doe</option>
            <option>John Doe</option>
          </select>

          <!-- Icon panah -->
          <svg
            class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <!-- Tombol -->
      <div class="flex justify-between gap-4">
        <button
          @click="resetFilter"
          class="w-full py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg font-semibold text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition"
        >
          Reset
        </button>
        <button
          @click="emit('close')"
          class="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold text-sm transition"
        >
          Apply
        </button>
      </div>
    </div>
  </div>
</template>
