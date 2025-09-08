<template>
  <div
    class="bg-gray-100 dark:bg-black min-h-screen flex flex-col items-center transition-colors duration-300"
  >
    <!-- Navbar -->
    <Navbar />
    <div
      class="bg-white dark:bg-gray-900 w-full flex-1 flex flex-col space-y-6 py-6 px-6 rounded-b-4xl transition-colors duration-300"
    >
      <!-- Header -->
      <div class="flex items-center py-5 justify-between">
        <h1 class="text-xl font-semibold text-gray-900 dark:text-white">
          Overtime
        </h1>
        <OvertimeFitur />
      </div>

      <!-- Stats -->
      <OvertimeStatsGrid :stats="overtimeData.stats" />

      <!-- Tabs -->
      <div class="flex justify-center">
        <OvertimeTabSelector v-model:activeTab="activeTab" />
      </div>

      <div class="flex-1 overflow-y-auto mt-2 space-y-3 pb-20">
        <!-- My Overtime -->
        <div v-if="activeTab !== 'team'" class="space-y-2 overflow-scroll">
          <OvertimeCard
            v-for="item in filteredItems"
            :key="item.id"
            :item="item"
          />
        </div>

        <!-- Team Overtime -->
        <div v-else class="space-y-2 overflow-scroll">
          <TeamOvertimeCard
            v-for="member in overtimeData.team"
            :key="member.id"
            :member="member"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import OvertimeStatsGrid from "@/pages/overtime/components/OvertimeStatsGrid.vue";
import OvertimeTabSelector from "@/pages/overtime/components/OvertimeTabSelector.vue";
import OvertimeCard from "@/pages/overtime/components/OvertimeCard.vue";
import TeamOvertimeCard from "@/pages/overtime/components/TeamOvertimeCard.vue";
import OvertimeFitur from "@/pages/overtime/components/OvertimeFitur.vue";
import Navbar from "@/components/Navbar.vue";

const activeTab = ref("approved");

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

const filteredItems = computed(() =>
  overtimeData.items.filter(
    (item) => item.status.toLowerCase() === activeTab.value
  )
);
</script>
