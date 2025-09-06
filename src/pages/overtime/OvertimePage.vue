<template>
  <div
    class="bg-gray-100 dark:bg-black min-h-screen flex flex-col items-center transition-colors duration-300"
  >
    <!-- Navbar -->
    <Navbar />

    <!-- Header Section -->
    <div
      class="bg-white dark:bg-gray-900 w-full space-y-6 py-6 px-6 rounded-b-4xl transition-colors duration-300"
    >
      <!-- Header -->
      <div class="flex items-center py-5 justify-between">
        <h1 class="text-xl font-semibold text-gray-900 dark:text-white">
          Overtime
        </h1>
        <OvertimeFitur />
      </div>

      <!-- Stats + Tabs -->
      <OvertimeStatsGrid :stats="overtimeData.stats" />
    </div>

    <!-- Tab Content -->
    <div
      class="w-full max-w-sm bg-gray-100 mt-5 dark:bg-black overflow-scroll pb-24 max-h-[calc(100vh-260px)] transition-colors duration-300"
    >
      <OvertimeTabContent
        :items="overtimeData.items"
        :team="overtimeData.team"
        :activeTab="activeTab"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import OvertimeStatsGrid from "@/pages/overtime/components/OvertimeStatsGrid.vue";
import OvertimeTabSelector from "@/pages/overtime/components/OvertimeTabSelector.vue";
import OvertimeTabContent from "@/pages/overtime/components/OvertimeTabContent.vue";
import OvertimeFitur from "@/pages/overtime/components/OvertimeFitur.vue";
import Navbar from "@/components/Navbar.vue";

const activeTab = ref("Approved");

// dummy data
const overtimeData = {
  stats: {
    total: 90,
    pending: 2,
    approved: 2,
    rejected: 2,
  },
  items: [
    {
      id: 1,
      date: "Apr 15 2025",
      start: "19:00",
      end: "22:00",
      totalHours: "3h",
      description: "Selesaikan laporan bulanan",
      status: "Pending",
      approvedBy: null,
    },
    {
      id: 2,
      date: "Apr 15 2025",
      start: "19:00",
      end: "22:00",
      totalHours: "3h",
      description: "Selesaikan laporan bulanan",
      status: "Approved",
      approvedBy: "Admin",
    },
    {
      id: 3,
      date: "Apr 15 2025",
      start: "19:00",
      end: "22:00",
      totalHours: "3h",
      description: "Selesaikan laporan bulanan",
      status: "Rejected",
      approvedBy: "Admin",
    },
  ],
  team: [
    { id: 1, name: "Nama Karyawan", date: "Apr 15 2025" },
    { id: 2, name: "Nama Karyawan", date: "Apr 15 2025" },
    { id: 3, name: "Nama Karyawan", date: "Apr 15 2025" },
  ],
};
</script>
