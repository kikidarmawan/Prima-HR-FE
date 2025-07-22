<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import SuccessLeave from "@/components/SuccessLeave.vue";

const router = useRouter();
const showSuccessLeave = ref(false);

const karyawanId = ref(23);
const tanggal = ref("");
const kategoriAbsensiId = ref("");
const keterangan = ref("");

const applyLeave = async () => {
  try {
    const response = await axios.post("https://sunbeam-proper-pipefish.ngrok-free.app/api/p-absen", {
      karyawan_id: karyawanId.value,
      tanggal: tanggal.value,
      kategori_absensi_id: parseInt(kategoriAbsensiId.value),
      keterangan: keterangan.value,
    });

    console.log("Absen berhasil:", response.data);
    showSuccessLeave.value = true;
  } catch (error) {
    console.error("Gagal absen:", error.response?.data || error.message);
    alert("Pengajuan gagal. Cek data atau koneksi.");
  }
};


const goToHome = () => {
  router.push("/leaves");
};

const contactNumber = ref("");
const onNumberInput = (e) => {
  contactNumber.value = e.target.value.replace(/\D/g, "");
};
</script>


<template>
  <div class="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300 p-6">
    <!-- Header -->
    <div class="flex items-center mb-6">
      <router-link to="/leaves">
        <i class="fa-solid fa-angle-left text-2xl text-gray-900 dark:text-white"></i>
      </router-link>
      <h1 class="ml-6 text-xl font-semibold">Apply Leave</h1>
    </div>

    <form class="space-y-4" @submit.prevent="applyLeave">
      <!-- Title -->
      <div class="border border-blue-500 rounded-lg px-1 pt-5 pb-2 bg-white dark:bg-gray-900 relative">
        <label class="text-xs text-blue-500 absolute top-1 left-2">Title</label>
        <input type="text" placeholder="Sick Leave"
          class="w-full outline-none bg-transparent pl-2 text-gray-900 dark:text-white" />
      </div>

      <!-- Leave Type -->
      <div class="border border-blue-500 rounded-lg px-1 pt-5 pb-2 bg-white dark:bg-gray-900 relative">
        <label for="leaveType" class="text-xs text-blue-500 absolute top-1 left-2">Jenis Absen</label>
        <select v-model="kategoriAbsensiId" id="leaveType"
          class="w-full outline-none bg-transparent text-gray-900 dark:text-white mt-1.5">
          <option disabled value="" class="text">Pilih Jenis Absen</option>
          <option value="1" class="text-black dark:text-white bg-white dark:bg-gray-900">Sakit</option>
          <option value="2" class="text-black dark:text-white bg-white dark:bg-gray-900">Cuti</option>
          <option value="3" class="text-black dark:text-white bg-white dark:bg-gray-900">Izin</option>
        </select>
      </div>

      <!-- Tanggal -->
      <div class="border border-blue-500 rounded-lg px-1 pt-5 pb-2 bg-white dark:bg-gray-900 relative">
        <label for="tanggal" class="text-xs text-blue-500 absolute top-1 left-2">Tanggal Absen</label>
        <input type="date" id="tanggal" v-model="tanggal"
          class="w-full outline-none bg-transparent text-gray-900 pl-2 dark:text-white mt-1.5" />
      </div>

      <!-- Keterangan -->
      <div class="border border-blue-500 rounded-lg px-1 pt-5 pb-2 bg-white dark:bg-gray-900 relative">
        <label for="keterangan" class="text-xs text-blue-500 absolute top-1 left-2">Keterangan</label>
        <textarea id="keterangan" rows="3" v-model="keterangan"
          placeholder="Contoh: Mengajukan cuti karena keperluan keluarga."
          class="w-full outline-none bg-transparent resize-none text-gray-900 dark:text-white mt-1.5"></textarea>
      </div>

      <!-- Button -->
      <button type="submit"
        class="w-full mt-5 bg-blue-500 text-white font-semibold py-3 rounded-xl hover:bg-blue-600 transition">
        Apply Leave
      </button>
    </form>

    <!-- Success Modal -->
    <SuccessLeave v-if="showSuccessLeave" @close="goToHome" />
  </div>
</template>

