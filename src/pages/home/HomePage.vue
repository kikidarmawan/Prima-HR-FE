<script setup>
import { ref, computed, onMounted, watch, watchEffect } from "vue";
import Navbar from "@/components/Navbar.vue";
import HeaderSection from "./components/HeaderSection.vue";
import DateScroll from "./components/DateScroll.vue";
import TodayShift from "./components/TodayShift.vue";
import YourActivity from "./components/YourActivity.vue";
import { generateCalendar } from "@/store/modules/kalender.js";
import { useStore } from "vuex";

const store = useStore();
const selectedDate = ref(0);
const dates = ref([]);
const shiftData = ref(null); 
const activities = ref([]); 

function normalizeDate(dateStr) {
  const d = new Date(dateStr);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`; 
}

// load kalender
onMounted(async () => {
  dates.value = generateCalendar();

  if (dates.value.length > 0) {
    const today = new Date().getDate();
    const todayIndex = dates.value.findIndex((d) => parseInt(d.day) === today);
    selectedDate.value = todayIndex !== -1 ? todayIndex : 0;
  }

  const karyawanId = localStorage.getItem("karyawanId"); 
  if (karyawanId) {
    await store.dispatch("presensi/fetchTodayPresensi", karyawanId);
    await store.dispatch("presensi/fetchMonthPresensi", karyawanId);
  }
});

// pantau perubahan tanggal
watch(
  selectedDate,
  async (newIndex) => {
    if (!dates.value[newIndex]) return;

    const picked = dates.value[newIndex];
    const today = new Date();
    const karyawan = JSON.parse(localStorage.getItem("karyawan"));
    const karyawanId = karyawan?.id || 34;

    if (parseInt(picked.day) === today.getDate()) {
      await store.dispatch("presensi/fetchTodayPresensi", karyawanId);
      const p = store.state.presensi.todayPresensi;
      shiftData.value = p;
      activities.value = [
        p?.jam_masuk ? { type: "checkin", time: p.jam_masuk } : null,
        p?.jam_keluar ? { type: "checkout", time: p.jam_keluar } : null,
      ].filter(Boolean);
    } else {
      await store.dispatch("presensi/fetchMonthPresensi", karyawanId);
      const monthData = store.state.presensi.monthPresensi || [];
      console.log("📆 Semua monthPresensi:", monthData);
      console.log("🔍 Cari tanggal (raw):", picked.raw);

      const tanggalStr =
        typeof picked.raw === "object" ? picked.raw.tanggal : picked.raw;
      const p = monthData.find((m) => m.tanggal === tanggalStr);

      console.log("➡️ Ketemu presensi:", p);

      shiftData.value = p || null;
      activities.value = [
        p?.jam_masuk ? { type: "checkin", time: p.jam_masuk } : null,
        p?.jam_keluar ? { type: "checkout", time: p.jam_keluar } : null,
      ].filter(Boolean);
    }
  },
  { immediate: true }
);

watchEffect(() => {
  console.log("Isi todayPresensi:", store.state.presensi.todayPresensi);
  console.log("Isi monthPresensi:", store.state.presensi.monthPresensi);
});

</script>

<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-black dark:text-white overflow-y-auto pb-28 transition-colors duration-300">
    <HeaderSection />
    <DateScroll :dates="dates" v-model:selectedDate="selectedDate" />
    <TodayShift :selectedDate="dates[selectedDate]" />
    <YourActivity :shiftData="shiftData" :activities="[shiftData].filter(Boolean)" />
    <Navbar />
  </div>
</template>