<script setup>
import { ref, computed, onMounted } from "vue";
import Navbar from "@/components/Navbar.vue";
import HeaderSection from "./components/HeaderSection.vue";
import DateScroll from "./components/DateScroll.vue";
import TodayShift from "./components/TodayShift.vue";
import YourActivity from "./components/YourActivity.vue";
import { generateCalendar } from "@/store/modules/kalender.js";
import { useStore } from "vuex";

const store = useStore();
const selectedDate = ref(null);
const dates = computed(() => store.getters["kalender/getKalender"]);

const selectedDate = ref(null);
const dates = ref([]);
const activities = computed(() => {
  if (!store.state.presensi.todayPresensi) return [];
  const p = store.state.presensi.todayPresensi;
  const arr = [];
  if (p.jam_masuk) arr.push({ type: "checkin", time: p.jam_masuk });
  if (p.jam_keluar) arr.push({ type: "checkout", time: p.jam_keluar });
  return arr;
});
onMounted(() => {
  dates.value = generateCalendar(); 

  if (dates.value.length > 0) {
    const today = new Date().getDate();
    const todayIndex = dates.value.findIndex(d => parseInt(d.day) === today);

    if (todayIndex !== -1) {
      selectedDate.value = todayIndex;
    } else {
      selectedDate.value = 0;
  store.dispatch("kalender/fetchKalender").then(() => {
    if (dates.value.length > 0) {
      const today = new Date().getDate();
      const todayIndex = dates.value.findIndex(d => parseInt(d.day) === today);
      selectedDate.value = todayIndex !== -1 ? todayIndex : 0;
    }
  }
});
const Oren = ref("/path/to/image.jpg"); 
const isCheckedIn = ref(false);
const thumbX = ref(0);
const startDrag = () => {};
const onDrag = () => {};
const endDrag = () => {};
const toggleCheck = () => {
  isCheckedIn.value = !isCheckedIn.value;
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-black dark:text-white overflow-y-auto pb-28 transition-colors duration-300">
    <!-- Header Section -->
    <HeaderSection />

    <!-- Date Scroll -->
    <DateScroll :dates="dates" v-model:selectedDate="selectedDate" />

    <!-- Today Shift -->
    <TodayShift :selectedDate="dates[selectedDate]" />
    <YourActivity :activities="activities" />

    <!-- Your Activity -->
    <YourActivity />

    <!-- Profile Header -->
    <div class="flex justify-between items-center p-5 gap-5 w-full">
      <div class="flex items-center gap-5">
        <img :src="Oren" class="rounded-full w-[52px] h-[52px] object-cover" />
        <div>
          <h1 class="text-xl font-semibold text-gray-900 dark:text-white">Michael Mitc</h1>
          <p class="text-black text-xs dark:text-gray-300">Lead UI/UX Designer</p>
        </div>
      </div>

      <!-- Bell Icon -->
      <div class="ml-auto">
        <router-link to="/notif">
          <div class="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 shadow-sm bg-white dark:bg-gray-800">
            <i class="fa-regular fa-bell text-lg text-gray-700 dark:text-gray-300"></i>
          </div>
        </router-link>
      </div>
    </div>

    <!-- Swipe Button Example -->
    <div class="mt-6 flex justify-center">
      <div
        class="w-full max-w-md rounded-xl relative px-5 py-3 shadow-md overflow-hidden select-none transition-colors"
        :class="isCheckedIn ? 'bg-gradient-to-r from-pink-400 to-rose-400' : 'bg-gradient-to-r from-blue-500 to-[#4893fc]'"
        @pointerdown="startDrag"
        @pointermove="onDrag"
        @pointerup="endDrag"
        @pointerleave="endDrag"
      >
        <div
          class="absolute top-1/2 left-2 -translate-y-1/2 bg-white px-3 py-2 rounded-xl shadow cursor-grab transition-transform duration-100"
          :style="{ transform: `translateX(${thumbX}px)` }"
        >
          <i class="fa-solid fa-arrow-right text-xl" :class="isCheckedIn ? 'text-rose-500' : 'text-blue-500'"></i>
        </div>
        <div
          @click="toggleCheck"
          class="w-full rounded-full flex items-center justify-center px-5 py-2 cursor-pointer transition-all duration-300 hover:scale-[1.01]"
        >
          <span class="text-white font-medium">
            {{ isCheckedIn ? "Swipe to Check Out" : "Swipe to Check In" }}
          </span>
        </div>
      </div>
    </div>

    <!-- Navbar -->\
    <Navbar />
  </div>
</template>
