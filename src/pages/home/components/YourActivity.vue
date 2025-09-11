<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

// ambil state
const monthPresensi = computed(() => store.state.presensi.monthPresensi);
const loading = computed(() => store.state.presensi.loading.loadingMonthPresensi); // pastikan di module ada state `loading`

function formatDate(dateStr) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(timeStr) {
  if (!timeStr) return "-";
  return new Date(`1970-01-01T${timeStr}`).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
</script>

<template>
  <div class="p-5">
    <h1 class="font-semibold flex justify-between items-center">
      Your Activity
      <span class="text-blue-500 cursor-pointer hover:underline">View All</span>
    </h1>

    <!-- Shimmer loading -->
    <div v-if="loading" class="space-y-3 mt-3 animate-pulse">
      <div
        v-for="n in 3"
        :key="n"
        class="bg-white dark:bg-gray-800 w-full p-4 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <div class="flex justify-between items-center">
          <div>
            <div class="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
            <div class="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div class="text-right">
            <div class="h-5 w-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Jika ada aktivitas -->
    <div v-else-if="monthPresensi.length" class="space-y-3 mt-3">
      <div v-for="(p, i) in monthPresensi" :key="i" class="space-y-3">
        <template
          v-for="(time, label) in { 'Check In': p.jam_masuk, 'Check Out': p.jam_keluar }"
          :key="label"
        >
          <div
            v-if="time"
            class="bg-white dark:bg-gray-800 w-full p-4 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div class="flex justify-between items-center">
              <div>
                <h2 class="text-sm font-medium text-gray-800 dark:text-white">
                  {{ label }}
                </h2>
                <p class="text-xs text-gray-400 dark:text-gray-300 ">
                  {{ formatDate(p.tanggal) }}
                </p>
              </div>
              <div class="text-right w-[25%]">
                <h1 class="text-sm md:text-base font-bold text-gray-900 dark:text-white">
                  {{ formatTime(time) }}
                </h1>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- Jika tidak ada aktivitas -->
    <div v-else class="mt-3 text-gray-400 text-center">No activity yet</div>
  </div>
</template>
