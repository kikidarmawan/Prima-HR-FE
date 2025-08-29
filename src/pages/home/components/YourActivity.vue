<script setup>
import { watch } from "vue";

const props = defineProps({
  shiftData: { type: Object, default: null },   
  activities: { type: Array, default: () => [] } 
});

function formatDate(dateStr) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(timeStr) {
  if (!timeStr) return null;
  return new Date(`1970-01-01T${timeStr}`).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Debug
watch(() => props.shiftData, (val) => {
  console.log("👀 shiftData di YourActivity:", val);
}, { immediate: true });

watch(() => props.activities, (val) => {
  console.log("📅 activities di YourActivity:", val);
}, { immediate: true, deep: true });
</script>

<template>
  <div class="p-5">
    <h1 class="font-semibold flex justify-between">
      Your Activity
      <span class="text-blue-500 cursor-pointer">View All</span>
    </h1>

    <!-- Jika ada activities -->
    <div v-if="activities.length" class="space-y-3 mt-3">
      <div v-for="(p, i) in activities" :key="i" class="space-y-3">
        <!-- Check In -->
        <div
          v-if="p.jam_masuk"
          class="bg-white dark:bg-gray-800 w-full p-4 rounded-2xl shadow-sm"
        >
          <div class="flex justify-between items-center">
            <div>
              <h2 class="text-sm font-medium text-gray-800 dark:text-white">
                Check In
              </h2>
              <p class="text-xs text-gray-400 dark:text-gray-300">
                {{ formatDate(p.tanggal) }}
              </p>
            </div>
            <div class="text-right">
              <h1 class="text-base font-bold text-gray-900 dark:text-white">
                {{ formatTime(p.jam_masuk) }}
              </h1>
            </div>
          </div>
        </div>

        <!-- Check Out -->
        <div
          v-if="p.jam_keluar"
          class="bg-white dark:bg-gray-800 w-full p-4 rounded-2xl shadow-sm"
        >
          <div class="flex justify-between items-center">
            <div>
              <h2 class="text-sm font-medium text-gray-800 dark:text-white">
                Check Out
              </h2>
              <p class="text-xs text-gray-400 dark:text-gray-300">
                {{ formatDate(p.tanggal) }}
              </p>
            </div>
            <div class="text-right">
              <h1 class="text-base font-bold text-gray-900 dark:text-white">
                {{ formatTime(p.jam_keluar) }}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Kalau tidak ada data sama sekali -->
    <div v-else class="mt-3 text-gray-400">Belum ada aktivitas</div>
  </div>
</template>

