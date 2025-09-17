<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import SuccessLeave from "@/components/SuccessLeave.vue";

const router = useRouter();
const store = useStore();

// state modal
const showSuccessLeave = ref(false);
const showLoadingModal = ref(false);

// Ambil karyawan dari localStorage
const karyawan = JSON.parse(localStorage.getItem("karyawan"));
const karyawanId = ref(karyawan?.id || null);

// Form data
const title = ref("");
const tanggal = ref("");
const kategoriAbsensiId = ref("");
const keterangan = ref("");

// Fetch kategori absensi saat komponen dimount
onMounted(async () => {
  try {
    await store.dispatch("kategori_absen/fetchKategoriAbsensi");
  } catch (error) {
    console.error("Gagal memuat kategori absensi:", error);
  }
});

// submit
const applyLeave = async () => {
  if (!karyawanId.value) {
    alert("ID Karyawan tidak ditemukan. Silakan login ulang.");
    return;
  }

  if (
    !title.value ||
    !tanggal.value ||
    !kategoriAbsensiId.value ||
    !keterangan.value
  ) {
    alert("Mohon lengkapi semua field yang diperlukan.");
    return;
  }

  const payload = {
    karyawan_id: parseInt(karyawanId.value),
    title: title.value,
    tanggal: tanggal.value,
    kategori_absensi_id: parseInt(kategoriAbsensiId.value),
    keterangan: keterangan.value,
  };

  showLoadingModal.value = true;

  try {
    await store.dispatch("p_absen/ajukanAbsen", payload);
    await store.dispatch("absensi/getAllAbsensiData");

    // kasih jeda biar animasi loading keliatan
    setTimeout(() => {
      showLoadingModal.value = false;
      showSuccessLeave.value = true;
    }, 1000);
  } catch (error) {
    console.error("Gagal absen (dari ApplyLeave.vue):", error);
    alert(
      `Pengajuan gagal: ${error?.response?.data?.message || error.message}`
    );
    showLoadingModal.value = false;
  }
};

const goToHome = () => {
  router.push("/leaves");
};
</script>

<template>
  <div
    class="min-h-screen bg-white dark:bg-[#0c0e19] text-gray-900 dark:text-gray-100 transition-colors duration-300 p-6"
  >
    <!-- Header -->
    <div class="flex items-center mb-6">
      <router-link to="/leaves">
        <i
          class="fa-solid fa-angle-left text-2xl text-gray-900 dark:text-white"
        ></i>
      </router-link>
      <h1 class="ml-6 text-xl font-semibold">Apply Leave</h1>
    </div>

    <!-- Form -->
    <form class="space-y-4" @submit.prevent="applyLeave">
      <!-- Title -->
      <div
        class="border border-blue-500 rounded-lg px-1 pt-5 pb-2 bg-white dark:bg-gray-900 relative"
      >
        <label class="text-xs text-blue-500 absolute top-1 left-2">Title</label>
        <input
          v-model="title"
          type="text"
          placeholder="Sick Leave"
          class="w-full outline-none bg-transparent pl-2 text-gray-900 dark:text-white"
          required
        />
      </div>

      <!-- Leave Type -->
      <div
        class="border border-blue-500 rounded-lg px-1 pt-5 pb-2 bg-white dark:bg-gray-900 relative"
      >
        <label class="text-xs text-blue-500 absolute top-1 left-2"
          >Leave Type</label
        >
        <select
          v-model="kategoriAbsensiId"
          class="w-full outline-none bg-transparent text-gray-900 dark:text-white mt-1.5"
          required
        >
          <option disabled value="">Select Leave Type</option>
          <option
            v-for="kategori in $store.getters['kategori_absen/allKategoriAbsensi']"
            :key="kategori.id"
            :value="kategori.id"
            class="text-black dark:text-white bg-white dark:bg-gray-900"
          >
            {{ kategori.nama }}
          </option>
        </select>
      </div>

      <!-- Date -->
      <div
        class="border border-blue-500 rounded-lg px-1 pt-5 pb-2 bg-white dark:bg-gray-900 relative"
      >
        <label class="text-xs text-blue-500 absolute top-1 left-2"
          >Leave Date</label
        >
        <input
          v-model="tanggal"
          type="date"
          class="w-full outline-none bg-transparent text-gray-900 dark:text-white pl-2 mt-1.5"
          required
        />
      </div>

      <!-- Notes -->
      <div
        class="border border-blue-500 rounded-lg px-1 pt-5 pb-2 bg-white dark:bg-gray-900 relative"
      >
        <label class="text-xs text-blue-500 absolute top-1 left-2">Notes</label>
        <textarea
          v-model="keterangan"
          rows="3"
          placeholder=""
          class="w-full outline-none bg-transparent resize-none text-gray-900 dark:text-white mt-1.5"
          required
        ></textarea>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="w-full mt-5 bg-blue-500 text-white font-semibold py-3 rounded-xl hover:bg-blue-600 transition"
      >
        Apply Leave
      </button>
    </form>

    <!-- Modal Loading (rapi + overlay non-clickable) -->
    <transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showLoadingModal"
        class="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 pointer-events-none"
      >
        <div
          class="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-sm w-full mx-4 flex flex-col items-center shadow-xl pointer-events-auto"
        >
          <!-- Spinner -->
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
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Loading...
          </h3>
          <p class="text-gray-600 dark:text-gray-300 text-center text-sm">
            Processing Request
          </p>
        </div>
      </div>
    </transition>

    <!-- Modal Sukses -->
    <SuccessLeave
      v-if="showSuccessLeave"
      title="Leave Submitted"
      message="Your request has been sent"
      @close="goToHome"
    />
  </div>
</template>
