<script setup>
import { computed, ref, onMounted, watch, nextTick } from "vue";

const props = defineProps({
  dates: { type: Array, default: () => [] },
  selectedDate: { type: Number, default: 0 },
});

const emit = defineEmits(["update:selectedDate"]);

const containerRef = ref(null);
const itemRefs = ref([]);

// cari index hari ini
const todayIndex = computed(() => {
  const today = new Date().getDate();
  return props.dates.findIndex((d) => parseInt(d.day) === today);
});

const handleClick = (index) => {
  if (index <= todayIndex.value) {
    emit("update:selectedDate", index);
  }
};


const scrollToIndex = (index) => {
  if (containerRef.value && itemRefs.value[index]) {
    const container = containerRef.value;
    const target = itemRefs.value[index];

    let tries = 0;
    const doScroll = () => {
      const offset =
        target.offsetLeft - (container.clientWidth / 2 - target.clientWidth / 2);

      container.scrollTo({ left: offset, behavior: "auto" });

      if (tries < 3) {
        tries++;
        requestAnimationFrame(doScroll);
      }
    };

    requestAnimationFrame(doScroll);
  }
};

onMounted(async () => {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  await nextTick();
  if (todayIndex.value !== -1) {
    scrollToIndex(todayIndex.value);
  }
});

watch(
  () => props.dates,
  async () => {
    await nextTick();
    if (todayIndex.value !== -1) {
      scrollToIndex(todayIndex.value);
    }
  }
);
</script>

<template>
<div
  ref="containerRef"
  class="scroll-x flex w-full gap-4 cursor-grab px-5 mt-2 overflow-x-scroll pb-2 scroll-smooth"
>

    <div
      v-for="(date, index) in dates"
      :key="index"
      :ref="el => itemRefs[index] = el"
      role="button"
      tabindex="0"
      @click="handleClick(index)"
      @keydown.enter="handleClick(index)"
      :class="[ 
        'min-w-[64px] h-16 flex-shrink-0 shadow flex flex-col items-center justify-center rounded-2xl transition-all duration-200',
        index <= todayIndex
          ? (index === props.selectedDate
              ? 'bg-blue-500 text-white border border-blue-500 cursor-pointer'
              : 'bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700')
          : 'bg-gray-200 dark:bg-gray-700 text-gray-400 border border-gray-300 dark:border-gray-600 cursor-not-allowed opacity-50'
      ]"
    >
      <span class="text-base font-semibold">{{ date.day }}</span>
      <span class="text-xs">{{ date.weekday }}</span>
    </div>
  </div>
</template>

<style>
.scroll-x {
  -webkit-overflow-scrolling: touch;
  touch-action: pan-x;
}

</style>