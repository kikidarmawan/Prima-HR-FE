<script setup>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

// ambil data pas komponen dipasang
onMounted(() => {
  store.dispatch("overtime_by_status/getAllOvertimeData");
  store.dispatch("overtime_count/getTotalOvertimeHours");  // total jam lembur
});

// data dari store
const stats = computed(() => ({
  total: store.getters["overtime_count/totalHours"], 
  pending: store.getters["overtime_by_status/pendingCount"],
  approved: store.getters["overtime_by_status/approvedCount"],
  rejected: store.getters["overtime_by_status/rejectedCount"],
}));

// util untuk class styling
const borderClass = (color) => {
  const map = {
    blue: "border-blue-500",
    green: "border-lime-400",
    teal: "border-teal-400",
    red: "border-red-400",
  };
  return map[color] || "border-gray-600";
};

const bgClass = (color) => {
  const map = {
    blue: "dark:bg-[#0A132F]",
    green: "dark:bg-[#0F1B0E]",
    teal: "dark:bg-[#072322]",
    red: "dark:bg-[#1F1417]",
  };
  return map[color] || "dark:bg-gray-800";
};

const textClass = (color) => {
  const map = {
    blue: "text-blue-400",
    green: "text-lime-400",
    teal: "text-teal-400",
    red: "text-red-400",
  };
  return map[color] || "text-gray-200";
};
</script>


<template>
  <div class="grid gap-3">
    <!-- total -->
    <div
      class="flex justify-between rounded-xl p-3 border font-semibold transition-colors duration-300 bg-white dark:bg-opacity-100"
      :class="[borderClass('blue'), bgClass('blue')]"
    >
      <span class="text-gray-600 dark:text-white">Total Overtime Hours</span>
      <span :class="['font-bold', textClass('blue')]">{{ stats.total }}</span>
    </div>

    <!-- pending -->
    <div
      class="flex justify-between rounded-xl p-3 border font-semibold transition-colors duration-300 bg-white dark:bg-opacity-100"
      :class="[borderClass('green'), bgClass('green')]"
    >
      <span class="text-gray-600 dark:text-white">Overtime Pending</span>
      <span :class="['font-bold', textClass('green')]">{{ stats.pending }}</span>
    </div>

    <!-- approved -->
    <div
      class="flex justify-between rounded-xl p-3 border font-semibold transition-colors duration-300 bg-white dark:bg-opacity-100"
      :class="[borderClass('teal'), bgClass('teal')]"
    >
      <span class="text-gray-600 dark:text-white">Overtime Approved</span>
      <span :class="['font-bold', textClass('teal')]">{{ stats.approved }}</span>
    </div>

    <!-- rejected -->
    <div
      class="flex justify-between rounded-xl p-3 border font-semibold transition-colors duration-300 bg-white dark:bg-opacity-100"
      :class="[borderClass('red'), bgClass('red')]"
    >
      <span class="text-gray-600 dark:text-white">Overtime Rejected</span>
      <span :class="['font-bold', textClass('red')]">{{ stats.rejected }}</span>
    </div>
  </div>
</template>
