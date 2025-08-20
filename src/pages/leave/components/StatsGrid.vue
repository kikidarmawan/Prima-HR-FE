<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const borderClass = (color) => {
  const map = {
    blue: "border-blue-500",
    green: "border-lime-400",
    teal: "border-teal-400",
    red: "border-red-400",
    orange: "border-orange-400", 
  };
  return map[color] || "border-gray-600";
};

const bgClass = (color) => {
  const map = {
    blue: "dark:bg-[#0A132F]",
    green: "dark:bg-[#0F1B0E]",
    teal: "dark:bg-[#072322]",
    red: "dark:bg-[#1F1417]",
    orange: "dark:bg-[#2B1706]", 

  };
  return map[color] || "dark:bg-gray-800";
};

const textClass = (color) => {
  const map = {
    blue: "text-blue-400",
    green: "text-lime-400",
    teal: "text-teal-400",
    red: "text-red-400",
    orange: "border-orange-400", 
  };
  return map[color] || "text-gray-200";
};
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <div
      v-for="item in items"
      :key="item.label"
      class="p-4 rounded-2xl border font-semibold space-y-1 transition-colors duration-300 bg-white dark:bg-opacity-100"
      :class="[borderClass(item.color), bgClass(item.color)]"
    >
      <p class="text-gray-600 dark:text-white">{{ item.label }}</p>
      <p :class="['text-xl font-semibold', textClass(item.color)]">
        {{ item.value }}
      </p>
    </div>
  </div>
</template>
