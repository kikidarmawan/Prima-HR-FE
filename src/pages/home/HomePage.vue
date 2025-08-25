<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

import Navbar from "@/components/Navbar.vue";
import HeaderSection from "./components/HeaderSection.vue";
import DateScroll from "./components/DateScroll.vue";
import TodayShift from "./components/TodayShift.vue";
import YourActivity from "./components/YourActivity.vue";

const store = useStore();
const selectedDate = ref(null);
// ambil data kalender dari store
const dates = computed(() => store.getters["kalender/getKalender"]);

onMounted(() => {
  store.dispatch("kalender/fetchKalender").then(() => {
    if (dates.value.length > 0) {
      const today = new Date().getDate();
      const todayIndex = dates.value.findIndex(d => parseInt(d.day) === today);

      // kalau ketemu, pilih tanggal hari ini
      if (todayIndex !== -1) {
        selectedDate.value = todayIndex;
      } else {
        // fallback kalau tanggal hari ini gak ada di API
        selectedDate.value = 0;
      }
    }
  });
});

</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-black dark:text-white overflow-y-auto pb-28 transition-colors duration-300">
    <HeaderSection />
    <DateScroll :dates="dates" v-model:selectedDate="selectedDate" />
    <TodayShift :selectedDate="dates[selectedDate]" />
    <YourActivity />
  <div
    class="min-h-screen bg-gray-50 dark:bg-black dark:text-white overflow-y-auto pb-28 transition-colors duration-300"
  >
    <!-- Header -->
    <div class="flex justify-between items-center p-5 gap-5 w-full">
      <div class="flex items-center gap-5">
        <img :src="Oren" class="rounded-full w-[52px] h-[52px] object-cover" />
        <div>
          <h1 class="text-xl font-semibold text-gray-900 dark:text-white">
            Michael Mitc
          </h1>
          <p class="text-black text-xs dark:text-gray-300">
            Lead UI/UX Designer
          </p>
        </div>
      </div>

      <!-- Bell Icon -->
      <div class="ml-auto">
        <router-link to="/notif">
          <div
            class="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 shadow-sm bg-white dark:bg-gray-800"
          >
            <i
              class="fa-regular fa-bell text-lg text-gray-700 dark:text-gray-300"
            ></i>
          </div>
        </router-link>
      </div>
    </div>

    <!-- Date Scroll -->
    <div class="flex w-full gap-4 px-5 mt-2 overflow-x-scroll pb-2">
      <div
        v-for="(date, index) in dates"
        :key="index"
        @click="selectedDate = index"
        :class="[
          'min-w-[64px] h-16 flex-shrink-0 shadow flex flex-col items-center justify-center rounded-2xl cursor-pointer transition-all duration-200',
          selectedDate === index
            ? 'bg-blue-500 text-white border-blue-500'
            : 'bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600 hover:bg-blue-500 hover:text-white',
        ]"
      >
        <span class="text-base font-semibold">{{ date.day }}</span>
        <span class="text-xs">{{ date.weekday }}</span>
      </div>
    </div>

    <!-- Today Shift -->
    <div class="w-full bg-gray-100 dark:bg-gray-900">
      <div class="px-5 mt-5 py-5 max-w-sm mx-auto">
        <h1 class="text-base font-semibold mb-3">Today Shift</h1>
        <div class="flex gap-4">
          <div class="bg-white dark:bg-gray-800 w-40 p-4 rounded-2xl shadow-sm">
            <div class="flex items-center gap-2 mb-2">
              <div
                class="bg-blue-100 dark:bg-blue-900 w-8 h-8 flex items-center justify-center rounded-md"
              >
                <i class="fa-solid fa-arrow-right text-[#4893fc]"></i>
              </div>
              <h2 class="text-sm font-medium text-gray-700 dark:text-gray-300">
                Check In
              </h2>
            </div>
            <h1 class="text-xl font-bold text-gray-900 dark:text-white">
              10:20 <span class="lowercase">am</span>
            </h1>
            <p class="text-sm text-gray-500 dark:text-gray-400">On Time</p>
          </div>

          <div class="bg-white dark:bg-gray-800 w-40 p-4 rounded-2xl shadow-sm">
            <div class="flex items-center gap-2 mb-2">
              <div
                class="bg-blue-100 dark:bg-blue-900 w-8 h-8 flex items-center justify-center rounded-md"
              >
                <i class="fa-solid fa-arrow-left text-[#4893fc]"></i>
              </div>
              <h2 class="text-sm font-medium text-gray-700 dark:text-gray-300">
                Check Out
              </h2>
            </div>
            <h1 class="text-xl font-bold text-gray-900 dark:text-white">
              07:00 <span class="lowercase">pm</span>
            </h1>
            <p class="text-sm text-gray-500 dark:text-gray-400">Go Home</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Your Activity -->
    <div class="p-5">
      <h1 class="font-semibold flex justify-between">
        Your Activity <span class="text-blue-500 cursor-pointer">View All</span>
      </h1>

      <div class="space-y-3 mt-3">
        <div
          class="bg-white dark:bg-gray-800 w-full p-4 rounded-2xl shadow-sm flex justify-between items-center"
        >
          <div class="flex items-center gap-3">
            <div
              class="bg-blue-100 dark:bg-blue-900 w-8 h-8 flex items-center justify-center rounded-md"
            >
              <i class="fa-solid text-sm fa-arrow-right text-[#4893fc]"></i>
            </div>
            <div>
              <h2 class="text-sm font-medium text-gray-800 dark:text-white">
                Check In
              </h2>
              <p class="text-xs text-gray-400 dark:text-gray-300">
                April 17, 2023
              </p>
            </div>
          </div>
          <div class="text-right">
            <h1 class="text-base font-bold text-gray-900 dark:text-white">
              10:00 <span class="lowercase">am</span>
            </h1>
            <p class="text-sm text-gray-500 dark:text-gray-400">On Time</p>
          </div>
        </div>

        <div
          class="bg-white dark:bg-gray-800 w-full p-4 rounded-2xl shadow-sm flex justify-between items-center"
        >
          <div class="flex items-center gap-3">
            <div
              class="bg-blue-100 dark:bg-blue-900 w-8 h-8 flex items-center justify-center rounded-md"
            >
              <i class="fa-solid text-xs fa-mug-saucer text-[#4893fc]"></i>
            </div>
            <div>
              <h2 class="text-sm font-medium text-gray-800 dark:text-white">
                Break In
              </h2>
              <p class="text-xs text-gray-400 dark:text-gray-300">
                April 17, 2023
              </p>
            </div>
          </div>
          <div class="text-right">
            <h1 class="text-base font-bold text-gray-900 dark:text-white">
              12:30 <span class="lowercase">pm</span>
            </h1>
            <p class="text-sm text-gray-500 dark:text-gray-400">On Time</p>
          </div>
        </div>
      </div>

      <!-- Swipe Button -->
      <div class="mt-6 flex justify-center">
        <div
          class="w-full max-w-md rounded-xl relative px-5 py-3 shadow-md overflow-hidden select-none transition-colors"
          :class="
            isCheckedIn
              ? 'bg-gradient-to-r from-pink-400 to-rose-400'
              : 'bg-gradient-to-r from-blue-500 to-[#4893fc]'
          "
          @pointerdown="startDrag"                        
          @pointermove="onDrag"
          @pointerup="endDrag"
          @pointerleave="endDrag"
        >
          <div
            class="absolute top-1/2 left-2 -translate-y-1/2 bg-white px-3 py-2 rounded-xl shadow cursor-grab transition-transform duration-100"
            :style="{ transform: `translateX(${thumbX}px)` }"
          >
            <i
              class="fa-solid fa-arrow-right text-xl"
              :class="isCheckedIn ? 'text-rose-500' : 'text-blue-500'"
            ></i>
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
    </div>

    <!-- Navbar -->
    <Navbar />
  </div>
</template>
