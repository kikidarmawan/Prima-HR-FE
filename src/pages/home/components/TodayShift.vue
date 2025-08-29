<script>
export default {
  name: "TodayShift",
  props: {
    selectedDate: { type: Object, default: null },
  },

computed: {
  presensiByDate() {
    const rawTanggal = this.selectedDate?.raw;
    const tanggalStr = typeof rawTanggal === "object" ? rawTanggal.tanggal : rawTanggal;

    const data = this.$store.getters["presensi/presensiByDate"](tanggalStr);
    console.log("📅 presensiByDate(", tanggalStr, "):", data);
    return data;
  },
    loading() {
      return this.$store.getters["presensi/isLoading"];
    },
  },
  methods: {
    formatTime(time) {
      return time ? time.slice(0, 5) : "-";
    },
    async fetchPresensi() {
      try {
        const karyawan = this.$store.state.auth.user?.karyawan_id;
        if (!karyawan || !this.selectedDate?.raw) return;

        const today = new Date().toISOString().split("T")[0];
        if (this.selectedDate.raw === today) {
          await this.$store.dispatch("presensi/fetchTodayPresensi", karyawan);
        } else {
          await this.$store.dispatch("presensi/fetchMonthPresensi", karyawan);
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
  watch: {
    selectedDate: {
      handler() {
        this.fetchPresensi();
      },
      immediate: true,
    },
  },
};
</script>

<template>
  <div v-if="!loading" class="p-5">
    <div v-if="presensiByDate">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Today Attendance
      </h3>
      <div class="grid grid-cols-2 gap-4">
        <!-- Check In -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 flex flex-col border border-gray-200 dark:border-gray-700">
          <div class="flex items-center gap-2 mb-3">
            <div class="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
              <i class="fa-solid fa-arrow-right text-[#4893fc]"></i>
            </div>
            <span class="text-gray-600 dark:text-gray-300 text-sm font-medium">Check In</span>
          </div>
          <p class="text-xl font-bold text-gray-900 dark:text-gray-100">
            {{ formatTime(presensiByDate?.jam_masuk) }}
          </p>
          <span class="text-sm text-gray-500 dark:text-gray-400">On Time</span>
        </div>

        <!-- Check Out -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 flex flex-col border border-gray-200 dark:border-gray-700">
          <div class="flex items-center gap-2 mb-3">
            <div class="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
              <i class="fa-solid fa-arrow-left text-[#4893fc]"></i>
            </div>
            <span class="text-gray-600 dark:text-gray-300 text-sm font-medium">Check Out</span>
          </div>
          <p class="text-xl font-bold text-gray-900 dark:text-gray-100">
            {{ formatTime(presensiByDate?.jam_keluar) }}
          </p>
          <span class="text-sm text-gray-500 dark:text-gray-400">Go Home</span>
        </div>
      </div>
    </div>

    <div v-else class="text-center text-gray-500 dark:text-gray-400 py-8">
      <p>Belum ada absensi untuk tanggal ini.</p>
    </div>
  </div>
</template>
