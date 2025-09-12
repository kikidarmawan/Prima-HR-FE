<template>
  <div class="flex items-center bg-white dark:bg-gray-900 rounded-xl p-4 mb-3 relative transition-colors duration-300">
    <!-- Strip warna di kiri -->
    <div class="absolute left-0 top-0 bottom-0 w-3 rounded-l-xl"
      :class="highlight ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-700'"></div>

    <div class="pl-4 flex flex-col w-full">
      <div class="flex items-center justify-between text-xs md:text-sm text-gray-500 dark:text-gray-400">
        <span class="flex items-center">
          <i class="fas fa-calendar-alt mr-1"></i>
          {{ formattedDate }}
        </span>
        <span>{{ formattedDay }}</span>
      </div>
      <p class="font-semibold text-black dark:text-white text-sm mt-2 md:text-base">
        {{ name }}
      </p>
    </div>
  </div>
</template>

<script setup>
  import {
    computed
  } from "vue";

  const props = defineProps({
    date: String, // contoh: "17 Agustus 2025"
    day: String, // contoh: "Minggu"
    name: String,
    highlight: Boolean,
  });

  // 🔹 Mapping bulan Indonesia → Inggris
  const monthMap = {
    Januari: "January",
    Februari: "February",
    Maret: "March",
    April: "April",
    Mei: "May",
    Juni: "June",
    Juli: "July",
    Agustus: "August",
    September: "September",
    Oktober: "October",
    November: "November",
    Desember: "December",
  };

  // 🔹 Mapping hari Indonesia → Inggris
  const dayMap = {
    Senin: "Monday",
    Selasa: "Tuesday",
    Rabu: "Wednesday",
    Kamis: "Thursday",
    Jumat: "Friday",
    Sabtu: "Saturday",
    Minggu: "Sunday",
  };

  // Format tanggal ke English
  const formattedDate = computed(() => {
    if (!props.date) return "";

    // split "17 Agustus 2025"
    const [day, monthId, year] = props.date.split(" ");
    const monthEn = monthMap[monthId] || monthId;

    return `${monthEn} ${day}, ${year}`;
  });

  // Format hari ke English
  const formattedDay = computed(() => {
    if (!props.day) return "";
    return dayMap[props.day] || props.day;
  });
</script>
