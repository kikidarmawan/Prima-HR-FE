<script setup>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import HolidayList from "./components/HolidayList.vue";
import Navbar from "@/components/Navbar.vue";

const store = useStore();

// Panggil action saat component mount
onMounted(() => {
  store.dispatch("holiday/fetchHolidays");
});

// Ambil data dari state
const holidays = computed(() => store.state.holiday.holidays);
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
    <div class="flex-1 overflow-y-auto p-5 pb-28">
      <h1 class="text-xl font-bold mb-5 text-gray-900 dark:text-white">
        Holiday List
      </h1>
      <HolidayList
        v-for="(holiday, index) in holidays"
        :key="index"
        :date="holiday.tanggal"
        :day="holiday.hari"
        :name="holiday.keterangan"
        :highlight="holiday.highlight"
      />
    </div>
    <Navbar />
  </div>
</template>
