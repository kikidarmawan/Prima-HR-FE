<script setup>
import { ref, onMounted, computed } from "vue";
import { Icon } from "@iconify/vue";
import { useStore } from "vuex";

import StatsGrid from "@/pages/leave/components/StatsGrid.vue";
import TabSelector from "@/pages/leave/components/TabSelector.vue";
import TabContent from "@/pages/leave/components/TabContent.vue";
import Navbar from "@/components/Navbar.vue";
import LeaveFitur from "./components/LeaveFitur.vue";

const store = useStore();
const showModal = ref(false);
const tabs = ["Approved", "Rejected", "Team Leave"];
const activeTab = ref("Approved");

// Get data from Vuex store
const absensiData = computed(
  () =>
    store.getters["absensi/absensiData"] || {
      pending: [],
      disetujui: [],
      ditolak: [],
    }
);

const absensiCount = computed(
  () =>
    store.getters["absensi/absensiCount"] || {
      pending: 0,
      disetujui: 0,
      ditolak: 0,
    }
);

// Stats data
const stats = computed(() => [
  { label: "Leave Balance", value: 20, color: "blue" },
  {
    label: "Leave Approved",
    value: absensiCount.value.disetujui,
    color: "green",
  },
  { label: "Leave Pending", value: absensiCount.value.pending, color: "teal" },
  { label: "Leave Cancelled", value: absensiCount.value.ditolak, color: "red" },
]);


const tabData = computed(() => ({
  Approved: formatAbsensiData(absensiData.value.disetujui, "Approved"),
  Rejected: formatAbsensiData(absensiData.value.ditolak, "Rejected"),
  "Team Leave": formatTeamLeaveData(absensiData.value.disetujui),
}));


function formatAbsensiData(data, status) {
  if (!data || !Array.isArray(data)) return [];
  return data.map((item) => ({
    id: item.id,
    type: "Date",
    date: formatDate(item.tanggal),
    applyDays: "Apply days",
    day: calculateDays(item.tanggal, item.tanggal_selesai) + " day(s)",
    leaveBalance: "Leave balance",
    leaveBalanceValue: 0,
    approvedBy: "Approved by",
    approvedByValue: item.verified_by || "Admin",
    status: status,
    rawData: item,
  }));
}

function formatTeamLeaveData(data) {
  if (!data || !Array.isArray(data)) return [];
  return data.map((item) => ({
    id: item.id,
    avatar: getAvatarUrl(item.karyawan_id),
    name: `Employee ${item.karyawan_id}`,
    date: formatDate(item.tanggal),
    status: item.status,
    rawData: item,
  }));
}

function formatDate(dateString) {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Invalid date"
      : date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
  } catch {
    return "N/A";
  }
}

function calculateDays(startDate, endDate) {
  if (!startDate) return 1;
  if (!endDate || startDate === endDate) return 1;

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  } catch {
    return 1;
  }
}

function getAvatarUrl(employeeId) {
  return `https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg?employee=${employeeId}`;
}


onMounted(async () => {
  try {
    await store.dispatch("absensi/getAllAbsensiData");
  } catch (error) {
    console.error("Failed to load attendance data:", error);
  }
});
</script>

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
          All Leaves
        </h1>
        <div class="flex gap-2">
          <!-- Plus Button -->
          <router-link
            to="/apply"
            class="p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm cursor-pointer bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <Icon icon="mdi:plus" class="text-base" />
          </router-link>

          <!-- Filter Button -->
          <button
            @click="showModal = true"
            class="p-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm cursor-pointer bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <Icon icon="mdi:tune-variant" class="text-xl" />
          </button>

          <!-- Modal -->
          <LeaveFitur v-if="showModal" @close="showModal = false" />
        </div>
      </div>

      <!-- Stats + Tabs -->
      <StatsGrid :items="stats" />
      <div class="mt-6">
        <TabSelector :options="tabs" v-model:activeTab="activeTab" />
      </div>
    </div>

    <!-- Tab Content -->
    <div
      class="w-full max-w-sm bg-gray-100 dark:bg-black overflow-scroll pb-24 max-h-[calc(100vh-260px)] transition-colors duration-300"
    >
      <TabContent :activeTab="activeTab" :data="tabData[activeTab]" mobile />
    </div>
  </div>
</template>

<style scoped>

</style>
