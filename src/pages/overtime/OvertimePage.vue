<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import Navbar from "@/components/Navbar.vue";
import OvertimeStatsGrid from "@/pages/overtime/components/OvertimeStatsGrid.vue";
import OvertimeTabSelector from "@/pages/overtime/components/OvertimeTabSelector.vue";
import OvertimeCard from "@/pages/overtime/components/OvertimeCard.vue";
import TeamOvertimeCard from "@/pages/overtime/components/TeamOvertimeCard.vue";
import OvertimeFitur from "@/pages/overtime/components/OvertimeFitur.vue";

const store = useStore();
const activeTab = ref("pending"); 


const tabs = computed(() => ["pending", "approved", "rejected", "team"]);


const tabKeyMap = {
  pending: "pending",
  approved: "disetujui",
  rejected: "ditolak",
  team: "team",
};

// mengambil semua data lembur sekaliagus saar mounted
onMounted(async () => {
  try {
    await store.dispatch("overtime_by_status/getAllOvertimeData");
    await store.dispatch("overtime_count/getTotalOvertimeHours");
  } catch (err) {
    console.error("Error fetching all overtime:", err);
  }
});


// Ambil state dari Vuex
const overtimeData = computed(
  () => store.getters["overtime_by_status/overtimeData"] || {}
);

// Filter data sesuai tab aktif
const filteredItems = computed(() => {
  const key = tabKeyMap[activeTab.value] || activeTab.value;
  const items = overtimeData.value[key] || [];

  // Mapping data untuk OvertimeCard 
return items.map((item) => ({
  ...item,
  date: item.tanggal,
  start: item.jam_masuk,
  end: item.jam_keluar,
  totalHours: item.durasi,
  description: item.keterangan || "-",
  approvedBy: item.verified_by || null,
  status:
    item.status.toLowerCase() === "disetujui"
      ? "Approved"
      : item.status.toLowerCase() === "ditolak"
      ? "Rejected"
      : "Pending",
}));
});

// Watch tab aktif untuk debug
watch(activeTab, (newTab) => {
});

// Stats langsung dari store
const stats = computed(() => {
  const count = store.getters["overtime_by_status/overtimeCount"] || {};
  return [
    { label: "Overtime Pending", value: count.pending || 0, color: "green" },
    { label: "Overtime Approved", value: count.disetujui || 0, color: "teal" },
    { label: "Overtime Rejected", value: count.ditolak || 0, color: "red" },
  ];
});


const teamOvertime = ref([]);
</script>

<template>
  <div class="bg-gray-100 dark:bg-black min-h-screen flex flex-col items-center transition-colors duration-300">
    <!-- Navbar -->
    <Navbar />

    <!-- Header + Stats + Tabs -->
    <div class="bg-white dark:bg-gray-900 w-full space-y-6 py-6 px-6 rounded-b-4xl transition-colors duration-300">
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-semibold text-gray-900 dark:text-white">Overtime</h1>
        <OvertimeFitur />
      </div>

      <!-- Stats -->
      <OvertimeStatsGrid :items="stats" />

      <!-- Tabs -->
      <OvertimeTabSelector v-model:activeTab="activeTab" class="mt-4" :tabs="tabs" />
    </div>

    <!-- Tab Content -->
    <div class="w-full max-w-sm bg-gray-100 dark:bg-black overflow-scroll pb-24 max-h-[calc(100vh-260px)] transition-colors duration-300">
      <!-- My Overtime -->
      <div v-if="activeTab !== 'team'" class="space-y-3 mt-4 px-2">
        <OvertimeCard v-for="item in filteredItems" :key="item.id" :item="item" />
        <p v-if="filteredItems.length === 0" class="text-center text-gray-500 dark:text-gray-400">
          No data available
        </p>
      </div>

      <!-- Team Overtime -->
      <div v-else class="space-y-3 mt-4 px-2">
        <TeamOvertimeCard v-for="member in teamOvertime" :key="member.id" :member="member" />
      </div>
    </div>
  </div>
</template>
