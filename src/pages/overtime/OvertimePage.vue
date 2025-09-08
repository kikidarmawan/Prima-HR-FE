<template>
  <div
    class="bg-gray-100 dark:bg-black min-h-screen flex flex-col items-center transition-colors duration-300"
  >
    <!-- Navbar -->
    <Navbar />

    <!-- Header + Stats + Tabs -->
    <div
      class="bg-white dark:bg-gray-900 w-full space-y-6 py-6 px-6 rounded-b-4xl transition-colors duration-300"
    >
      <!-- Header -->
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-semibold text-gray-900 dark:text-white">
          Overtime
        </h1>
        <OvertimeFitur />
      </div>

      <!-- Stats -->
      <OvertimeStatsGrid :items="stats" />

      <!-- Tabs -->
      <OvertimeTabSelector v-model:activeTab="activeTab" class="mt-4" />
    </div>

    <!-- Tab Content (scroll area abu) -->
    <div
      class="w-full max-w-sm bg-gray-100 dark:bg-black overflow-scroll pb-24 max-h-[calc(100vh-260px)] transition-colors duration-300"
    >
      <!-- My Overtime -->
      <div v-if="activeTab !== 'team'" class="space-y-3 mt-4 px-2">
        <OvertimeCard
          v-for="item in filteredItems"
          :key="item.id"
          :item="item"
        />
      </div>

      <!-- Team Overtime -->
      <div v-else class="space-y-3 mt-4 px-2">
        <TeamOvertimeCard
          v-for="member in overtimeData.team"
          :key="member.id"
          :member="member"
        />
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

const activeTab = ref("pending");

// dummy stats
const stats = [
  { label: "Overtime Balance", value: 90, color: "blue" },
  { label: "Overtime Pending", value: 2, color: "green" },
  { label: "Overtime Approved", value: 2, color: "teal" },
  { label: "Overtime Rejected", value: 2, color: "red" },
];

// dummy data
const overtimeData = {
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
      description: "Server maintenance",
      status: "Approved",
      approvedBy: "Admin",
    },
    {
      id: 3,
      date: "Apr 15 2025",
      start: "19:00",
      end: "22:00",
      totalHours: "3h",
      description: "Testing",
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
