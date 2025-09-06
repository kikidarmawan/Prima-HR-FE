<script setup>
const props = defineProps({
  activeTab: { type: String, default: "pending" },
});
const emit = defineEmits(["update:activeTab"]);

const tabs = [
  { key: "pending", label: "Pending", color: "bg-green-500" },
  { key: "approved", label: "Approved", color: "bg-blue-500" },
  { key: "rejected", label: "Rejected", color: "bg-red-500" },
  { key: "team", label: "Team Overtime", color: "bg-gray-500" },
];
</script>

<template>
  <div
    class="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1 w-fit transition-colors duration-300"
  >
    <button
      v-for="tab in tabs"
      :key="tab.key"
      class="px-1.5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease-in-out"
      :class="[
        activeTab === tab.key
          ? [tab.color, 'text-white shadow-sm scale-100']
          : 'text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 scale-95'
      ]"
      @click="emit('update:activeTab', tab.key)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>
