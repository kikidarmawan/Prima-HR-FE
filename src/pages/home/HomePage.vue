<script setup>
import { ref, computed, onMounted } from "vue";
import Navbar from "@/components/Navbar.vue";
import HeaderSection from "./components/HeaderSection.vue";
import DateScroll from "./components/DateScroll.vue";
import TodayShift from "./components/TodayShift.vue";
import YourActivity from "./components/YourActivity.vue";
import { generateCalendar } from "@/store/modules/kalender.js";
import { useStore } from "vuex";

const store = useStore();

const selectedDate = ref(null);
const dates = ref([]);
const activities = computed(() => {
  if (!store.state.presensi.todayPresensi) return [];
  const p = store.state.presensi.todayPresensi;
  const arr = [];
  if (p.jam_masuk) arr.push({ type: "checkin", time: p.jam_masuk });
  if (p.jam_keluar) arr.push({ type: "checkout", time: p.jam_keluar });
  return arr;
});
onMounted(() => {
  dates.value = generateCalendar(); 

  if (dates.value.length > 0) {
    const today = new Date().getDate();
    const todayIndex = dates.value.findIndex(d => parseInt(d.day) === today);

    if (todayIndex !== -1) {
      selectedDate.value = todayIndex;
    } else {
      selectedDate.value = 0;
    }
  }
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-black dark:text-white overflow-y-auto pb-28 transition-colors duration-300">
    <HeaderSection />
    <DateScroll :dates="dates" v-model:selectedDate="selectedDate" />
    <TodayShift :selectedDate="dates[selectedDate]" />
    <YourActivity :activities="activities" />
    <Navbar />
  </div>
</template>
