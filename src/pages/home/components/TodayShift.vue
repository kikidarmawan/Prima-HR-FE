<script setup>
import { computed, watch } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  selectedDate: { type: Object, default: null },
});

      const data = this.$store.getters["presensi/presensiByDate"](tanggalStr);
      return data;
    },
    loading() {
      return this.$store.getters["presensi/isLoadingTodayPresensi"];
    },
    isLoadingMonthPresensi() {
      return this.$store.state.presensi.loading.loadingMonthPresensi;
    },
  },
const store = useStore();

// presensi dari store
const presensi = computed(() => store.state.presensi.todayPresensi);

// ambil data presensi per tanggal
const presensiByDate = computed(() => {
  const rawTanggal = props.selectedDate?.raw;
  const tanggalStr =
    typeof rawTanggal === "object" ? rawTanggal.tanggal : rawTanggal;

  return store.getters["presensi/presensiByDate"](tanggalStr);
});

// loading state
const loading = computed(() => store.getters["presensi/isLoadingTodayPresensi"]);
const loadingMonth = computed(
  () => store.state.presensi.loading.loadingMonthPresensi
);

// format waktu
function formatTime(time) {
  return time ? time.slice(0, 5) : "-";
}

// fetch presensi sesuai tanggal
async function fetchPresensi() {
  const karyawan = store.state.auth.user?.karyawan_id;
  if (!karyawan || !props.selectedDate?.raw) return;

  const today = new Date().toISOString().split("T")[0];
  if (props.selectedDate.raw === today) {
    await store.dispatch("presensi/fetchTodayPresensi", karyawan);
  } else {
    await store.dispatch("presensi/fetchMonthPresensi", karyawan);
  }
}

// jalankan fetchPresensi tiap kali selectedDate berubah
watch(
  () => props.selectedDate,
  () => {
    fetchPresensi();
  },
  { immediate: true }
);
</script>


<template>
  <!-- Loading Shimmer -->
  <div v-if="loading || loadingMonth" class="p-5">
    <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
      Today Attendance
    </h3>

    <div class="grid grid-cols-2 gap-4">
      <!-- Shimmer Card -->
      <div
        v-for="i in 2"
        :key="i"
        class="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 flex flex-col border border-gray-200 dark:border-gray-700 animate-pulse"
      >
        <div class="flex items-center gap-2 mb-3">
          <div
            class="bg-gray-200 dark:bg-gray-700 p-2 rounded-lg w-8 h-8"
          ></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
        </div>
        <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-2"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
      </div>
    </div>
  </div>

  <div v-if="!loading && !loadingMonth" class="p-5">
    <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
      Today Attendance
    </h3>

    <div class="grid grid-cols-2 gap-4">
      <!-- Check In -->
      <div
        class="bg-white dark:bg-gray-900 rounded-2xl shadow py-4 px-2 md:p-4 flex flex-col border border-gray-200 dark:border-gray-700"
      >
        <div class="flex items-center gap-2 mb-3">
          <div
            class="bg-blue-100 dark:bg-blue-800/40 p-2 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg"
          >
            <i
              class="fa-solid fa-arrow-right text-blue-500 dark:text-white text-sm md:text-base"
            ></i>
          </div>
          <span class="text-gray-600 dark:text-gray-200 text-sm font-medium">
            Check In
          </span>
        </div>
        <p
          class="text-base md:text-xl font-bold text-gray-900 dark:text-gray-100"
        >
          {{ formatTime(presensiByDate?.jam_masuk) }}
        </p>
        <div
          class="text-sm text-gray-500 dark:text-gray-200"
          v-if="presensiByDate?.jam_masuk != null"
        >
          <span v-if="presensiByDate?.telat != null">
            Late by {{ presensiByDate?.telat }}
          </span>
          <span v-else> On Time </span>
        </div>
      </div>

      <!-- Check Out -->
      <div
        class="bg-white dark:bg-gray-900 rounded-2xl shadow py-4 px-2 md:p-4 flex flex-col border border-gray-200 dark:border-gray-700"
      >
        <div class="flex items-center gap-2 mb-3">
          <div
            class="bg-blue-100 dark:bg-blue-800/40 p-2 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg"
          >
            <i
              class="fa-solid fa-arrow-left text-blue-500 dark:text-white text-sm md:text-base"
            ></i>
          </div>
          <span class="text-gray-600 dark:text-gray-200 text-sm font-medium">
            Check Out
          </span>
        </div>
        <p
          class="text-base md:text-xl font-bold text-gray-900 dark:text-gray-100"
        >
          {{ formatTime(presensiByDate?.jam_keluar) }}
        </p>
        <div
          class="text-sm text-gray-500 dark:text-gray-200"
          v-if="presensiByDate?.jam_keluar != null"
        >
          <span v-if="presensiByDate?.pulang_cepat != null">
            Left early by {{ presensiByDate?.pulang_cepat }}
          </span>
          <span v-else> On Time </span>
        </div>
      </div>
    </div>
  </div>
</template>
