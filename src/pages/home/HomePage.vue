<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

import Navbar from "@/components/Navbar.vue";
import HeaderSection from "./components/HeaderSection.vue";
import DateScroll from "./components/DateScroll.vue";
import TodayShift from "./components/TodayShift.vue";
import YourActivity from "./components/YourActivity.vue";

const store = useStore();
const selectedDate = ref(null);
// ambil data kalender dari store
const dates = computed(() => store.getters["kalender/getKalender"]);

onMounted(() => {
  store.dispatch("kalender/fetchKalender").then(() => {
    if (dates.value.length > 0) {
      const today = new Date().getDate();
      const todayIndex = dates.value.findIndex(d => parseInt(d.day) === today);

      // kalau ketemu, pilih tanggal hari ini
      if (todayIndex !== -1) {
        selectedDate.value = todayIndex;
      } else {
        // fallback kalau tanggal hari ini gak ada di API
        selectedDate.value = 0;
      }
    }
  });
});

</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-black dark:text-white overflow-y-auto pb-28 transition-colors duration-300">
    <HeaderSection />
    <DateScroll :dates="dates" v-model:selectedDate="selectedDate" />
    <TodayShift :selectedDate="dates[selectedDate]" />
    <YourActivity />
    <Navbar />
  </div>
</template>
