<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";

import StatsGrid from "@/pages/leave/components/StatsGrid.vue";
import TabSelector from "@/pages/leave/components/TabSelector.vue";
import TabContent from "@/pages/leave/components/TabContent.vue";
import Navbar from "@/components/Navbar.vue";
import LeaveFitur from "../../components/LeaveFitur.vue";

const showModal = ref(false);
const tabs = ["Upcoming", "Past", "Team Leave"];
const activeTab = ref("Upcoming");

// Dummy data
const stats = [
  { label: "Leave Balance", value: 20, color: "blue" },
  { label: "Leave Approved", value: 2, color: "green" },
  { label: "Leave Pending", value: 4, color: "teal" },
  { label: "Leave Cancelled", value: 10, color: "red" },
];

const mockData = {
  Upcoming: [
    {
      id: 1,
      type: "Date",
      date: "Apr 15, 2023 - Apr 18, 2023",
      applyDays: "Apply days",
      day: "3 days",
      leaveBalance: "Leave balance",
      leaveBalanceValue: 16,
      approvedBy: "Approved by",
      approvedByValue: "Martin Doe",
      status: "Approved",
    },
    {
      id: 2,
      type: "Date",
      date: "Mar 10, 2023 - Mar 12, 2023",
      applyDays: "Apply days",
      day: "2 days",
      leaveBalance: "Leave balance",
      leaveBalanceValue: 19,
      approvedBy: "Approved by",
      approvedByValue: "Martin Doe",
      status: "Approved",
    },
  ],
  Past: [
    {
      id: 1,
      type: "Date",
      date: "Apr 15, 2023 - Apr 18, 2023",
      applyDays: "Apply days",
      day: "3 days",
      leaveBalance: "Leave balance",
      leaveBalanceValue: 16,
      approvedBy: "Approved by",
      approvedByValue: "Martin Doe",
      status: "Rejected",
    },
    {
      id: 2,
      type: "Date",
      date: "Mar 10, 2023 - Mar 12, 2023",
      applyDays: "Apply days",
      day: "2 days",
      leaveBalance: "Leave balance",
      leaveBalanceValue: 19,
      approvedBy: "Approved by",
      approvedByValue: "Martin Doe",
      status: "Approved",
    },
    {
      id: 3,
      type: "Date",
      date: "Mar 10, 2023 - Mar 12, 2023",
      applyDays: "Apply days",
      day: "2 days",
      leaveBalance: "Leave balance",
      leaveBalanceValue: 19,
      approvedBy: "Approved by",
      approvedByValue: "Martin Doe",
      status: "Approved",
    },
  ],
  "Team Leave": [
    {
      id: 4,
      avatar:
        "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
      name: "Jane Cooper",
      date: "Apr 15, 2023 - Apr 18, 2023",
    },
    {
      id: 5,
      avatar:
        "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
      name: "John Doe",
      date: "Mar 10, 2023 - Mar 12, 2023",
    },
    {
      id: 6,
      avatar:
        "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
      name: "Martin Doe",
      date: "Mar 10, 2023 - Mar 12, 2023",
    },
  ],
};
</script>


<template>
  <div class="bg-gray-100 dark:bg-black min-h-screen flex flex-col items-center transition-colors duration-300">
    <!-- Navbar -->
    <Navbar />

    <!-- Header Section -->
    <div class="bg-white dark:bg-gray-900 w-full space-y-6 py-6 px-6 rounded-b-4xl transition-colors duration-300">
      <!-- Header -->
      <div class="flex items-center py-5 justify-between">
        <h1 class="text-xl font-semibold text-gray-900 dark:text-white">All Leaves</h1>
        <div class="flex gap-2">
          <!-- Plus -->
          <router-link
            to="/apply"
            class="p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm cursor-pointer
                   bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <Icon icon="mdi:plus" class="text-base" />
          </router-link>

          <!-- Filter -->
          <button
            @click="showModal = true"
            class="p-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm cursor-pointer
                   bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
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
    <div class="w-full max-w-sm bg-gray-100 dark:bg-black overflow-y-auto pb-24 max-h-[calc(100vh-260px)] transition-colors duration-300">
      <TabContent :activeTab="activeTab" :data="mockData[activeTab]" mobile />
    </div>
  </div>
</template>








