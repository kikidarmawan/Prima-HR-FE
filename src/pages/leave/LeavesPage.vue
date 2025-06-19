<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";

import StatsGrid from "@/pages/leave/components/StatsGrid.vue";
import TabSelector from "@/pages/leave/components/TabSelector.vue";
import TabContent from "@/pages/leave/components/TabContent.vue";
import Navbar from "@/components/Navbar.vue";
import LeaveFitur from "../../components/LeaveFitur.vue";

const showModal = ref(false)
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
  <div
    class="space-y-6 py-6 px-6 max-w-sm mx-auto bg-white rounded-xl shadow-md"
  >
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-semibold">All Leaves</h1>
      <div class="flex gap-2">
        <!-- Plus Button -->
        <button class="p-2.5 border rounded-lg shadow-sm">
          <Icon icon="mdi:plus" class="text-base" />
        </button>
        <!-- Filter Button -->
        <button class="p-2">
          <Icon icon="mdi:tune-variant" class="text-xl" />
        </button>
      </div>
    </div>
  <h1 class="text-xl font-semibold">All Leaves</h1>
  <div class="flex gap-2">
    <!-- Plus Button -->
  
    <a href="/apply" class="p-2.5 border rounded-lg shadow-sm">
      <Icon icon="mdi:plus" class="text-base  " />
    </a >
    <!-- Filter Button -->
    <button  @click="showModal = true" class="p-2">
      <Icon icon="mdi:tune-variant" class="text-xl" />
    </button>
     <LeaveFitur v-if="showModal" @close="showModal = false" />
  </div>
</div>

    <StatsGrid :items="stats" />
    <TabSelector :options="tabs" v-model:activeTab="activeTab" />
  </div>

  <!-- scrollable content area -->
  <div
    class="py-0.5 px-2 max-w-sm mx-auto bg-gray-50 overflow-y-auto"
    style="max-height: 400px"
  >
    <TabContent :activeTab="activeTab" :data="mockData[activeTab]" mobile />

    <!-- navbar -->
    <Navbar />
  </div>
     <!-- Bottom Navbar -->
    <div class="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
      <div
        class="relative bg-white shadow-xl h-15 rounded-t-3xl px-6 flex justify-between items-center w-full max-w-md mx-auto"
      >
        <!-- Curve Bulatan Tengah -->
        <div
          class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full z-10 flex items-center justify-center"
        >
          <div
            class="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-md">
            <i class="fa-solid fa-users text-xl"></i>
          </div>
        </div>

        <!-- Icons -->
        <div class="flex justify-between items-center w-full">
          <!-- Left 2 -->
            <div class="flex gap-10 items-center pl-2">
            <router-link to="/home">
              <i class="fa-solid fa-house text-gray-500 text-xl hover:text-blue-600 transition-colors cursor-pointer"></i>
            </router-link>
            <router-link to="/leaves">
              <i class="fa-regular fa-calendar text-xl text-gray-500 hover:text-blue-600 transition-colors cursor-pointer"></i>
            </router-link>
            </div>

            <!-- Spacer Tengah -->
            <div class="w-16"></div>

            <!-- Right 2 -->
            <div class="flex gap-10 items-center pr-2">
            <router-link to="/">
              <i class="fa-solid fa-umbrella-beach text-xl text-gray-500 hover:text-blue-600 transition-colors cursor-pointer"></i>
            </router-link>
            <router-link to="/">
              <i class="fa-regular fa-user text-xl text-gray-500 hover:text-blue-600 transition-colors cursor-pointer"></i>
            </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>





