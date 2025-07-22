<script setup>
import api from "../../services/api.js";
import { ref, onMounted } from "vue";
import HolidayList from "./components/HolidayList.vue";
import Navbar from "@/components/Navbar.vue";

// State buat simpan data dari API
const holidays = ref([]);
onMounted(() => {
  api
    .get("/api/holiday")
    .then((response) => {
      console.log("Data dari API:", response.data);

      const holidayArray = response.data.data || [];

      holidays.value = holidayArray.map((item) => ({
        ...item,
        highlight: true,
      }));
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
    });
});
</script>

<template>
  <div
    class="flex flex-col min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300"
  >
    <!-- Scrollable content -->
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

    <!-- Fixed Navbar -->
    <Navbar />
  </div>
</template>
