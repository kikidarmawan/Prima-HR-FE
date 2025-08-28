<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const karyawan = JSON.parse(localStorage.getItem("karyawan"));
const karyawanId = karyawan?.id || 34;
const presensi = computed(() => store.getters["presensi/todayPresensi"]);
const loading = computed(() => store.getters["presensi/isLoading"]);
const error = computed(() => store.getters["presensi/errorMessage"]);

onMounted(() => {
  store.dispatch("presensi/fetchTodayPresensi", karyawanId);
});

function formatDate(dateStr) {
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
</script>

<template>
  <div class="p-5">
    <h1 class="font-semibold flex justify-between">
      Your Activity
      <span class="text-blue-500 cursor-pointer">View All</span>
    </h1>

    <!-- loading & error -->
    <div v-if="loading" class="mt-3 text-gray-500"> Loading...</div>
    <div v-else-if="error" class="mt-3 text-red-500">⚠️ {{ error }}</div>

    <!-- kalau ada presensi -->
    <div v-else-if="presensi" class="space-y-3 mt-3">
      <!-- Check In -->
      <div
        v-if="presensi.jam_masuk"
        class="bg-white dark:bg-gray-800 w-full p-4 rounded-2xl shadow-sm flex justify-between items-center"
      >
        <div class="flex items-center gap-3">
          <div
            class="bg-blue-100 dark:bg-blue-900 w-8 h-8 flex items-center justify-center rounded-md"
          >
            <i class="fa-solid text-sm fa-arrow-right text-[#4893fc]"></i>
          </div>
          <div>
            <h2 class="text-sm font-medium text-gray-800 dark:text-white">
              Check In
            </h2>
            <p class="text-xs text-gray-400 dark:text-gray-300">
              {{ formatDate(presensi.tanggal) }}
            </p>
          </div>
        </div>
        <div class="text-right">
          <h1 class="text-base font-bold text-gray-900 dark:text-white">
            {{ formatTime(presensi.jam_masuk) }}
          </h1>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ presensi.keterangan_masuk ? "Info" : "On Time" }}
          </p>
        </div>
      </div>

      <!-- Check Out -->
      <div
        v-if="presensi.jam_keluar"
        class="bg-white dark:bg-gray-800 w-full p-4 rounded-2xl shadow-sm flex justify-between items-center"
      >
        <div class="flex items-center gap-3">
          <div
            class="bg-blue-100 dark:bg-blue-900 w-8 h-8 flex items-center justify-center rounded-md"
          >
            <i class="fa-solid text-sm fa-arrow-left text-[#4893fc]"></i>
          </div>
          <div>
            <h2 class="text-sm font-medium text-gray-800 dark:text-white">
              Check Out
            </h2>
            <p class="text-xs text-gray-400 dark:text-gray-300">
              {{ formatDate(presensi.tanggal) }}
            </p>
          </div>
        </div>
        <div class="text-right">
          <h1 class="text-base font-bold text-gray-900 dark:text-white">
            {{ formatTime(presensi.jam_keluar) }}
          </h1>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ presensi.keterangan_keluar ? "Info" : "On Time" }}
          </p>
        </div>
      </div>
    </div>

    <!-- kalau kosong -->
    <div v-else class="mt-3 text-gray-400">Belum ada aktivitas hari ini</div>
  </div>
</template>
