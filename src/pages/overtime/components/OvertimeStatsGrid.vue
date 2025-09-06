<script setup>
const props = defineProps({
  stats: {
    type: Object,
    default: () => ({ total: 0, pending: 0, approved: 0, rejected: 0 }),
  },
});

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
    <div
      class="flex justify-between rounded-xl p-3 border font-semibold transition-colors duration-300 bg-white dark:bg-opacity-100"
      :class="[borderClass('blue'), bgClass('blue')]"
    >
      <span class="text-gray-600 dark:text-white">Total Overtime Hours</span>
      <span :class="['font-bold', textClass('blue')]">{{ stats.total }}</span>
    </div>

    <div
      class="flex justify-between rounded-xl p-3 border font-semibold transition-colors duration-300 bg-white dark:bg-opacity-100"
      :class="[borderClass('green'), bgClass('green')]"
    >
      <span class="text-gray-600 dark:text-white">Overtime Pending</span>
      <span :class="['font-bold', textClass('green')]">{{ stats.pending }}</span>
    </div>

    <div
      class="flex justify-between rounded-xl p-3 border font-semibold transition-colors duration-300 bg-white dark:bg-opacity-100"
      :class="[borderClass('teal'), bgClass('teal')]"
    >
      <span class="text-gray-600 dark:text-white">Overtime Approved</span>
      <span :class="['font-bold', textClass('teal')]">{{ stats.approved }}</span>
    </div>

    <div
      class="flex justify-between rounded-xl p-3 border font-semibold transition-colors duration-300 bg-white dark:bg-opacity-100"
      :class="[borderClass('red'), bgClass('red')]"
    >
      <span class="text-gray-600 dark:text-white">Overtime Rejected</span>
      <span :class="['font-bold', textClass('red')]">{{ stats.rejected }}</span>
    </div>
  </div>
</template>
