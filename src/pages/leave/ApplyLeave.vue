<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import SuccessLeave from "@/components/SuccessLeave.vue";

const router = useRouter();
const store = useStore();
const showSuccessLeave = ref(false);

//  Ambil karyawan dari localStorage
const karyawan = JSON.parse(localStorage.getItem("karyawan"));
const karyawanId = ref(karyawan?.id || null);

// Form data
const title = ref("");
const tanggal = ref("");
const kategoriAbsensiId = ref("");
const keterangan = ref("");

// Fungsi submit
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

  console.log("Payload yang dikirim:", payload);

  try {
    const res = await store.dispatch("p_absen/ajukanAbsen", payload);
    console.log("Response dari store:", res);
    showSuccessLeave.value = true;
    
  } catch (error) {
    console.error("Gagal absen (dari ApplyLeave.vue):", error);
    alert(
      `Pengajuan gagal: ${error?.response?.data?.message || error.message}`
    );
  }
};

// Navigasi balik ke halaman utama
const goToHome = () => {
  router.push("/leaves");
};
</script>

<template>
  <div
    class="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300 p-6"
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

      <!-- Jenis Absen -->
      <div
        class="border border-blue-500 rounded-lg px-1 pt-5 pb-2 bg-white dark:bg-gray-900 relative"
      >
        <label class="text-xs text-blue-500 absolute top-1 left-2"
          >Jenis Absen</label
        >
        <select
          v-model="kategoriAbsensiId"
          class="w-full outline-none bg-transparent text-gray-900 dark:text-white mt-1.5"
          required
        >
          <option disabled value="">Pilih Jenis Absen</option>
          <option
            value="1"
            class="text-black dark:text-white bg-white dark:bg-gray-900"
          >
            Sakit
          </option>
          <option
            value="2"
            class="text-black dark:text-white bg-white dark:bg-gray-900"
          >
            Cuti
          </option>
          <option
            value="3"
            class="text-black dark:text-white bg-white dark:bg-gray-900"
          >
            Izin
          </option>
        </select>
      </div>

      <!-- Tanggal -->
      <div
        class="border border-blue-500 rounded-lg px-1 pt-5 pb-2 bg-white dark:bg-gray-900 relative"
      >
        <label class="text-xs text-blue-500 absolute top-1 left-2"
          >Tanggal Absen</label
        >
        <input
          v-model="tanggal"
          type="date"
          class="w-full outline-none bg-transparent text-gray-900 dark:text-white pl-2 mt-1.5"
          required
        />
      </div>

      <!-- Keterangan -->
      <div
        class="border border-blue-500 rounded-lg px-1 pt-5 pb-2 bg-white dark:bg-gray-900 relative"
      >
        <label class="text-xs text-blue-500 absolute top-1 left-2"
          >Keterangan</label
        >
        <textarea
          v-model="keterangan"
          rows="3"
          placeholder="Contoh: Mengajukan cuti karena keperluan keluarga."
          class="w-full outline-none bg-transparent resize-none text-gray-900 dark:text-white mt-1.5"
          required
        ></textarea>
      </div>

      <!-- Tombol Submit -->
      <button
        type="submit"
        class="w-full mt-5 bg-blue-500 text-white font-semibold py-3 rounded-xl hover:bg-blue-600 transition"
      >
        Apply Leave
      </button>
    </form>

    <!-- Modal Sukses -->
    <SuccessLeave v-if="showSuccessLeave" @close="goToHome" />
  </div>
</template>
