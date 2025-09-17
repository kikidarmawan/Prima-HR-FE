<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import SuccessLeave from "@/components/SuccessLeave.vue";

const router = useRouter();
const store = useStore();

const showSuccess = ref(false);
const showLoading = ref(false);

// ambil karyawan dari localStorage
const karyawan = JSON.parse(localStorage.getItem("karyawan"));
const karyawanId = ref(karyawan?.id || null);

// form state
const tanggal = ref("");
const startTime = ref("");
const endTime = ref("");
const description = ref("");

// helper untuk hitung durasi lembur
function hitungDurasi(masuk, keluar) {
  if (!masuk || !keluar) return "0";
  const [hm, mm] = masuk.split(":").map(Number);
  const [hk, mk] = keluar.split(":").map(Number);
  let durasi = hk * 60 + mk - (hm * 60 + mm);
  if (durasi < 0) durasi += 24 * 60; // untuk karyawan yang lembur tengah malam
  return Math.floor(durasi / 60).toString();
}

//  Watcher buat ngecek error dari Vuex module p_lembur
watch(
  () => store.getters["p_lembur/errorMessage"],
  (val) => {
    if (val) {
      console.error(" Error dari Vuex p_lembur:", val);
      alert(`Pengajuan gagal (Vuex): ${val}`);
    }
  }
);

// submit
const applyOvertime = async () => {
  if (!karyawanId.value) {
    alert("ID Karyawan tidak ditemukan. Silakan login ulang.");
    return;
  }

  if (!tanggal.value || !startTime.value || !endTime.value || !description.value) {
    alert("Mohon lengkapi semua field.");
    return;
  }

  const payload = {
    karyawan_id: parseInt(karyawanId.value),
    tanggal: tanggal.value,
    tanggal_keluar: tanggal.value,
    jam_masuk: startTime.value,
    jam_keluar: endTime.value,
    durasi: hitungDurasi(startTime.value, endTime.value),
    keterangan: description.value,
    alasan_ditolak: null,
    verified_by: null,
  };

  showLoading.value = true;

  try {
    await store.dispatch("p_lembur/addLembur", payload);

    setTimeout(() => {
      showLoading.value = false;
      showSuccess.value = true; // tampilkan modal sukses
    }, 1000);
  } catch (error) {
    console.error(" Gagal lembur (dari ApplyOvertime.vue):", error);
    alert(`Pengajuan gagal: ${error?.response?.data?.message || error.message}`);
    showLoading.value = false;
  }
};

const goToOvertime = () => {
  router.push("/overtime");
};
</script>

<template>
  <div
    class="min-h-screen bg-white dark:bg-[#0c0e19] text-gray-900 dark:text-gray-100 transition-colors duration-300 p-6"
  >
    <!-- Header -->
    <div class="flex items-center mb-6">
      <router-link to="/overtime">
        <i class="fa-solid fa-angle-left text-2xl text-gray-900 dark:text-white"></i>
      </router-link>
      <h1 class="ml-6 text-xl font-semibold">Apply Overtime</h1>
    </div>

    <!-- Form -->
    <form class="space-y-4" @submit.prevent="applyOvertime">
      <!-- Tanggal -->
      <div
        class="border border-blue-500 rounded-lg px-1 pt-5 pb-2 bg-white dark:bg-gray-900 relative"
      >
        <label class="text-xs text-blue-500 absolute top-1 left-2">Date</label>
        <input
          v-model="tanggal"
          type="date"
          class="w-full outline-none bg-transparent pl-2 text-gray-900 dark:text-white mt-1.5"
          required
        />
      </div>

      <!-- Jam Mulai & Selesai -->
      <div class="flex gap-3">
        <div
          class="flex-1 border border-blue-500 rounded-lg px-1 pt-5 pb-2 bg-white dark:bg-gray-900 relative"
        >
          <label class="text-xs text-blue-500 absolute top-1 left-2">Start</label>
          <input
            v-model="startTime"
            type="time"
            class="w-full outline-none bg-transparent pl-2 text-gray-900 dark:text-white mt-1.5"
            required
          />
        </div>
        <div
          class="flex-1 border border-blue-500 rounded-lg px-1 pt-5 pb-2 bg-white dark:bg-gray-900 relative"
        >
          <label class="text-xs text-blue-500 absolute top-1 left-2">End</label>
          <input
            v-model="endTime"
            type="time"
            class="w-full outline-none bg-transparent pl-2 text-gray-900 dark:text-white mt-1.5"
            required
          />
        </div>
      </div>

      <!-- Deskripsi -->
      <div
        class="border border-blue-500 rounded-lg px-1 pt-5 pb-2 bg-white dark:bg-gray-900 relative"
      >
        <label class="text-xs text-blue-500 absolute top-1 left-2">Description</label>
        <textarea
          v-model="description"
          rows="3"
          placeholder=""
          class="w-full outline-none bg-transparent resize-none text-gray-900 dark:text-white mt-1.5"
          required
        ></textarea>
      </div>

      <!-- Tombol Submit -->
      <button
        type="submit"
        class="w-full mt-5 bg-blue-500 text-white font-semibold py-3 rounded-xl hover:bg-blue-600 transition"
      >
        Apply Overtime
      </button>
    </form>

    <!-- Modal Loading -->
    <transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showLoading"
        class="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
      >
        <div
          class="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-sm w-full mx-4 flex flex-col items-center shadow-xl"
        >
          <svg
            class="animate-spin h-12 w-12 text-blue-500 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <h3 class="text-lg font-semibold mb-1">Loading...</h3>
          <p class="text-gray-500 text-sm">Processing Request</p>
        </div>
      </div>
    </transition>

    <!-- Modal Sukses -->
    <SuccessLeave
      v-if="showSuccess"
      title="Overtime Success"
      message="Your request has been sent"
      @close="goToOvertime"
    />
  </div>
</template>
