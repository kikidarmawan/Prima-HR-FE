<script setup>
import { computed } from "vue";

const props = defineProps({
  dates: { type: Array, default: () => [] },
  selectedDate: { type: Number, default: 0 },
});

const emit = defineEmits(["update:selectedDate"]);

// cari index hari ini dari daftar dates
const todayIndex = computed(() => {
  const today = new Date().getDate();
  return props.dates.findIndex((d) => parseInt(d.day) === today);
});

// klik berlaku kalau index <= todayIndex
const handleClick = (index) => {
  if (index <= todayIndex.value) {
    emit("update:selectedDate", index);
  }
};
</script>

<template>
  <div class="flex w-full gap-4 px-5 mt-2 overflow-x-scroll pb-2">
    <div
      v-for="(date, index) in dates"
      :key="index"
      role="button"
      tabindex="0"
      @click="handleClick(index)"
      @keydown.enter="handleClick(index)"
      :class="[ 
        'min-w-[64px] h-16 flex-shrink-0 shadow flex flex-col items-center justify-center rounded-2xl transition-all duration-200',
        // aktif (tanggal <= hari ini)
        index <= todayIndex
          ? (index === props.selectedDate
              ? 'bg-blue-500 text-white border border-blue-500 cursor-pointer'
              : 'bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700')
          // disable (tanggal > hari ini)
          : 'bg-gray-200 dark:bg-gray-700 text-gray-400 border border-gray-300 dark:border-gray-600 cursor-not-allowed opacity-50'
      ]"
    >
      <span class="text-base font-semibold">{{ date.day }}</span>
      <span class="text-xs">{{ date.weekday }}</span>
    </div>
  </div>
</template>
