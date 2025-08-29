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

// ambil user & karyawan dari auth store
const user = computed(() => store.state.auth?.user || {});
const karyawan = computed(() => store.state.auth?.user?.karyawan || {});
const karyawanId = computed(() => karyawan.value.id);

// tab list
const tabs = computed(() => {
  const baseTabs = ["Pending", "Approved", "Rejected"];
  baseTabs.push("Team Leave");
  return baseTabs;
});
const activeTab = ref("Approved");

// kategori absensi
const kategoriAbsensi = computed(
  () => store.getters["kategori_absen/allKategoriAbsensi"] || []
);
const kategoriMap = computed(() => {
  const map = {};
  kategoriAbsensi.value.forEach((item) => {
    map[item.id] = item.nama;
  });
  return map;
});

// absensi dari store
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
const teamLeave = computed(() => store.state.team_leave.teamLeave);

// ganti stats computed
const stats = computed(() => [
  { label: "Leave Balance", value: 
      (tabData.value.Pending?.length || 0) +
      (tabData.value.Approved?.length || 0) +
      (tabData.value.Rejected?.length || 0),
    color: "blue" 
  },
  { label: "Leave Pending", value: tabData.value.Pending?.length || 0, color: "green" },
  { label: "Leave Approved", value: tabData.value.Approved?.length || 0, color: "teal" },
  { label: "Leave Cancelled", value: tabData.value.Rejected?.length || 0, color: "red" },
]);


const filters = ref({
  status: [],
  leaveType: [],
  teamMember: ""
});

// data tab + filter
const tabData = computed(() => {
  const filterData = (data) => {
    let result = data;
    // filter leave type
    if (filters.value.leaveType.length) {
      result = result.filter((item) =>
        filters.value.leaveType.includes(item.leaveBalanceValue)
      );
    }
    // filter status (opsional, kalau nanti kepake)
    if (filters.value.status.length) {
      result = result.filter((item) =>
        filters.value.status.includes(item.status)
      );
    }
    // filter team member
    if (filters.value.teamMember) {
      result = result.filter(
        (item) =>
          item.rawData?.karyawan?.nama_karyawan
            ?.toLowerCase()
            .includes(filters.value.teamMember.toLowerCase()) ||
          item.name?.toLowerCase().includes(filters.value.teamMember.toLowerCase())
      );
    }
    return result;
  };

  const data = {
    Pending: filterData(formatAbsensiData(absensiData.value.pending, "Pending")),
    Approved: filterData(formatAbsensiData(absensiData.value.disetujui, "Approved")),
    Rejected: filterData(formatAbsensiData(absensiData.value.ditolak, "Rejected")),
    "Team Leave":
      karyawanId.value === 34 ? filterData(formatTeamLeaveData(teamLeave.value)) : [],
  };
  return data;
});


function formatAbsensiData(data, status) {
  if (!data || !Array.isArray(data)) return [];
  return data.map((item) => {
    let approvedByLabel = "";
    let approvedByValue = "";
    if (status === "Pending") {
      approvedByLabel = "Waiting approval";
      approvedByValue = "Not yet approved";
    } else if (status === "Approved") {
      approvedByLabel = "Approved by";
      approvedByValue = item.verified_by || "Admin";
    } else if (status === "Rejected") {
      approvedByLabel = "Rejected by";
      approvedByValue = item.verified_by || "Admin";
    }
    return {
      id: item.id,
      type: "Date",
      date: formatDate(item.tanggal),
      applyDays: "Apply days",
      day:
        calculateDays(item.tanggal, item.tanggal_selesai) +
        ` ${calculateDays(item.tanggal, item.tanggal_selesai) > 1 ? "days" : "day"}`,
      leaveBalance: "Jenis Absen",
      leaveBalanceValue: kategoriMap.value[item.kategori_absensi_id] || "-",
      approvedBy: approvedByLabel,
      approvedByValue: approvedByValue,
      status: status,
      rawData: item,
    };
  });
}
function formatTeamLeaveData(data) {
  if (!data || !Array.isArray(data)) return [];
  return data.map((item) => ({
    id: item.id,
    karyawan_id: item.karyawan_id,
    avatar: item.karyawan?.foto || "https://via.placeholder.com/150",
    name: item.karyawan?.nama_karyawan || `Employee ${item.karyawan_id}`,
    date: formatDate(item.tanggal),
    status: item.status,
    rawData: item,
  }));
}
function formatDate(date) {
  if (!date) return null;
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
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

onMounted(async () => {
  try {
    await store.dispatch("kategori_absen/fetchKategoriAbsensi");
    await store.dispatch("absensi/getAllAbsensiData");
    if (karyawanId.value === 34) {
      await store.dispatch("team_leave/getTeamLeaveData");
    }
  } catch (error) {
    console.error("Failed to load data:", error);
  }
});


function applyFilters(newFilters) {
  filters.value = { ...newFilters };
  showModal.value = false;
}
</script>

<template>
  <div class="bg-gray-100 dark:bg-black min-h-screen flex flex-col items-center transition-colors duration-300">
    <!-- Navbar -->
    <Navbar />

    <!-- Header Section -->
    <div class="bg-white dark:bg-gray-900 w-full space-y-6 py-6 px-6 rounded-b-4xl transition-colors duration-300">
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

          <!-- Modal Filter -->
          <LeaveFitur
            v-if="showModal"
            :kategoriAbsensi="kategoriAbsensi"
            :selected="filters.leaveType"
            @apply="applyFilters"
            @close="showModal = false"
          />
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
