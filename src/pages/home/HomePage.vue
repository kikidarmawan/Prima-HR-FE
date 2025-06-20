<script setup>
import { ref } from "vue";
import Oren from "../../assets/images/Oren.jpg";
import Navbar from "../../components/Navbar.vue";

// Data tanggal statis
const dates = [
  { day: "06", weekday: "Thu" },
  { day: "07", weekday: "Fri" },
  { day: "08", weekday: "Sat" },
  { day: "09", weekday: "Sun" },
  { day: "10", weekday: "Mon" },
  { day: "11", weekday: "Tue" },
  { day: "12", weekday: "Wed" },
];

const selectedDate = ref(3);

const toggleCheck = () => {
  isCheckedIn.value = !isCheckedIn.value;
};

const isCheckedIn = ref(false);
const isDragging = ref(false);
const startX = ref(0);
const thumbX = ref(0);

function startDrag(e) {
  isDragging.value = true;
  startX.value = e.clientX || e.touches?.[0]?.clientX;
}
// Saat drag berlangsung
function onDrag(e) {
  if (!isDragging.value) return;
  const currentX = e.clientX || e.touches?.[0]?.clientX;
  const dx = currentX - startX.value;
  thumbX.value = Math.max(0, Math.min(dx, maxDrag));
}
// Akhir drag
function endDrag() {
  if (!isDragging.value) return;
  isDragging.value = false;
  const threshold = maxDrag / 2;
  if (thumbX.value > threshold) {
    isCheckedIn.value = !isCheckedIn.value;
  }
  thumbX.value = 0;
}

// Lebar maksimum drag (misal kalkulasi berdasarkan container)
const maxDrag = 200;
</script>

<template>
  <div class="min-h-screen bg-gray-50 overflow-y-auto pb-28 ">
    <!-- Header -->
    <div class="flex justify-between items-center p-5 gap-5 w-full">
    <div class="flex items-center p-5 gap-5 w-full justify-between">
      <div class="flex gap-5 items-center">
        <img
          :src="Oren"
          class="rounded-full w-[52px] h-[52px] object-cover"
          alt=""
        />
        <div>
          <h1 class="text-xl font-semibold text-gray-900">Michael Mitc</h1>
          <p class="text-black text-xs">Lead UI/UX Designer</p>
        </div>
      </div>

     <!-- Bell Icon -->
      <a href="/notif">
        <div class="ml-auto">
      <!-- Bell Icon -->
      <router-link to="/notif" >
        <div class="justify-between">
          <div
            class="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 shadow-sm bg-white">
            <i class="fa-regular fa-bell text-lg text-gray-700"></i>
          </div>
        </div>
      </router-link>
    </div>

    <!-- Date Scroll -->
    <div class="flex w-full gap-4 px-5 mt-2 overflow-x-scroll pb-2">
      <div
        v-for="(date, index) in dates"
        :key="index"
        @click="selectedDate.value = index"
        :class="[
  'min-w-[64px] h-16 flex-shrink-0 shadow flex flex-col items-center justify-center rounded-2xl cursor-pointer transition-all duration-200',
  selectedDate.value === index
    ? 'bg-blue-500 text-white border-blue-500'
    : 'bg-white text-black border-gray-300 hover:bg-blue-500 hover:text-white hover:shadow-sm',
        ]"
      >
        <span class="text-base font-semibold">{{ date.day }}</span>
        <span class="text-xs">{{ date.weekday }}</span>
      </div>
    </div>

    <!-- Today Shift -->
    <div class="w-full bg-gray-100">
  <!-- Inner wrapper untuk posisi konten tetap rapih -->
  <div class="px-5 mt-5 py-5 max-w-sm mx-auto">
    <h1 class="text-base font-semibold mb-3">Today Shift</h1>
    <div class="flex gap-4">
    <div class="p-5  bg-gray-100 rounded-2xl mt-3">
      <h1 class="text-base font-semibold mb-3">Today Shift</h1>
      <div class="flex gap-4">
        <!-- Check In -->
        <div class="bg-white w-40 p-4 rounded-2xl shadow-sm">
          <div class="flex items-center gap-2 mb-2">
            <div class="bg-blue-100 w-8 h-8 flex items-center justify-center rounded-md">
              <i class="fa-solid fa-arrow-right text-[#4893fc]"></i>
            </div>
            <h2 class="text-sm font-medium text-gray-700">Check In</h2>
          </div>
          <h1 class="text-xl font-bold text-gray-900">
            10:20 <span class="lowercase">am</span>
          </h1>
          <p class="text-sm text-gray-500">On Time</p>
        </div>

        <!-- Check Out -->
        <div class="bg-white  w-40 p-4 rounded-2xl shadow-sm">
          <div class="flex items-center gap-2 mb-2">
            <div class="bg-blue-100 w-8 h-8 flex items-center justify-center rounded-md">
              <i class="fa-solid fa-arrow-left text-[#4893fc]"></i>
            </div>
            <h2 class="text-sm font-medium text-gray-700">Check Out</h2>
          </div>
          <h1 class="text-xl font-bold text-gray-900">
            07:00 <span class="lowercase">pm</span>
          </h1>
          <p class="text-sm text-gray-500">Go Home</p>
        </div>
      </div>
    </div>
    </div>

    <!-- Your Activity -->
    <div class="p-5">
      <h1 class="font-semibold flex justify-between">
      Your Activity <span class="text-blue-500 cursor-pointer">View All</span>
      </h1>

      <!-- Activity Cards -->
      <div class="space-y-3 mt-3">
      <!-- Check In -->
      <div
        class="bg-white  w-full p-4 rounded-2xl shadow-sm flex justify-between items-center"
      >
        <div class="flex items-center gap-3">
        <div class="bg-blue-100 w-8 h-8 flex items-center justify-center rounded-md">
          <i class="fa-solid text-sm fa-arrow-right text-[#4893fc]"></i>
        </div>
        <div>
          <h2 class="text-sm font-medium text-gray-800">Check In</h2>
          <p class="text-xs text-gray-400">April 17, 2023</p>
        </div>
        </div>
        <div class="text-right">
        <h1 class="text-base font-bold text-gray-900">
          10:00 <span class="lowercase">am</span>
        </h1>
        <p class="text-sm text-gray-500">On Time</p>
        <!-- Check In -->
        <div
          class="bg-white  w-full p-4 rounded-2xl shadow-sm flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="bg-blue-100 p-2 rounded-md">
              <i class="fa-solid fa-arrow-right text-blue-600"></i>
            </div>
            <div>
              <h2 class="text-sm font-medium text-gray-800">Check In</h2>
              <p class="text-xs text-gray-400">April 17, 2023</p>
            </div>
          </div>
          <div class="text-right">
            <h1 class="text-base font-bold text-gray-900">
              10:00 <span class="lowercase">am</span>
            </h1>
            <p class="text-sm text-gray-500">On Time</p>
          </div>
        </div>
      </div>

      <!-- Break In -->
      <div
        class="bg-white w-full p-4 rounded-2xl shadow-sm flex justify-between items-center"
      >
        <div class="flex items-center gap-3">
        <div class="bg-blue-100 w-8 h-8 flex items-center justify-center rounded-md">
          <i class="fa-solid text-xs fa-mug-saucer text-[#4893fc]"></i>
        </div>
        <div>
          <h2 class="text-sm font-medium text-gray-800">Break In</h2>
          <p class="text-xs text-gray-400">April 17, 2023</p>
        </div>
        </div>
        <div class="text-right">
        <h1 class="text-base font-bold text-gray-900">
          12:30 <span class="lowercase">pm</span>
        </h1>
        <p class="text-sm text-gray-500">On Time</p>
        <!-- Break In -->
        <div
          class="bg-white  w-full p-4 rounded-2xl shadow-sm flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="bg-blue-100 p-2 rounded-md">
              <i class="fa-solid fa-mug-saucer text-blue-600"></i>
            </div>
            <div>
              <h2 class="text-sm font-medium text-gray-800">Break In</h2>
              <p class="text-xs text-gray-400">April 17, 2023</p>
            </div>
          </div>
          <div class="text-right">
            <h1 class="text-base font-bold text-gray-900">
              12:30 <span class="lowercase">pm</span>
            </h1>
            <p class="text-sm text-gray-500">On Time</p>
          </div>
        </div>
      </div>
      </div>

      <!-- Swipe Button -->
      <div class="mt-6 flex justify-center">
      <div
        class="w-full max-w-md rounded-xl relative px-5 py-3 shadow-md overflow-hidden select-none"
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
        <!-- Ikon geser -->
        <div
        class="absolute top-1/2 left-2 -translate-y-1/2 bg-white px-3 py-2 rounded-xl shadow cursor-grab transition-transform duration-100"
        :style="{ transform: `translateX(${thumbX}px)` }"
        >
        <i
          class="fa-solid fa-arrow-right text-xl"
          :class="isCheckedIn ? 'text-rose-500' : 'text-blue-500'"
        ></i>
        </div>
        <!-- Teks -->
        <div class="w-full text-center text-white font-medium">
        {{ isCheckedIn ? "Swipe to Check Out" : "Swipe to Check In" }}
          @click="toggleCheck"
          class="w-full rounded-full flex items-center justify-start px-5 py-2 cursor-pointer shadow-md transition-all duration-300 hover:scale-[1.01]"
          :class="
            isCheckedIn
              ? 'bg-gradient-to-r from-pink-400 to-rose-400'
              : 'bg-gradient-to-r from-blue-500 to-blue-600'">
          <i
            class="fa-solid fa-arrow-right bg-white text-xl p-2 text-blue-500 rounded-2xl mr-3"
            :class="isCheckedIn ? 'text-rose-500' : 'text-blue-500'"
          ></i>
          <span class="text-white font-medium">
            {{ isCheckedIn ? "Swipe to Check Out" : "Swipe to Check In" }}
          </span>
        </div>
      </div>
      </div>
    </div>

    <Navbar />
  </div>
</template>