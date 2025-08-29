<template>
  <!-- Bottom Navbar -->
  <div class="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center">
    <div
      class="relative bg-white dark:bg-gray-900 shadow-xl h-16 rounded-t-3xl px-4 flex items-center justify-between w-106 mx-auto transition-colors duration-300">
      <!-- Curve Bulatan Tengah -->
      <div
        class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white dark:bg-gray-900 rounded-full z-10 flex items-center justify-center">
        <button
          class="cursor-pointer w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-md disabled:opacity-50"
          :disabled="loading" @click="openCamera">
          <i v-if="!loading" class="fa-solid fa-camera text-xl"></i>
          <span v-else class="text-sm">...</span>
        </button>
      </div>

      <!-- Icons -->
      <div class="flex justify-between items-center w-full">
        <!-- Left 2 -->
        <div class="flex gap-15 items-center pl-2">
          <router-link to="/home">
            <i
              class="fa-solid fa-house text-xl text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"></i>
          </router-link>
          <router-link to="/leaves">
            <i
              class="fa-regular fa-calendar text-xl text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"></i>
          </router-link>
        </div>

        <!-- Right 2 -->
        <div class="flex gap-15 items-center pr-2">
          <router-link to="/holiday">
            <i
              class="fa-solid fa-umbrella-beach text-xl text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"></i>
          </router-link>
          <router-link to="/profile">
            <i
              class="fa-regular fa-user text-xl text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"></i>
          </router-link>
        </div>
      </div>
    </div>
  </div>

  <!-- Camera Modal -->
  <CameraModal v-if="isCameraOpen" @close="closeCamera" @submit="handleSubmit" />

  <!-- Preview Foto Presensi -->
  <div v-if="previewFoto" class="mt-4 flex justify-center">
    <img :src="`http://192.168.0.155:8000/${previewFoto}`" alt="Foto Presensi"
      class="w-32 h-32 rounded-lg border shadow" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CameraModal from './CameraModal.vue'
import api from "@/services/api";

const isCameraOpen = ref(false)
const presensiData = ref(null)
const loading = ref(false)
const previewFoto = ref(null)

const karyawanId = 34 // nanti ambil dari auth

// Buka modal kamera langsung
const openCamera = () => {
  isCameraOpen.value = true
}

const closeCamera = () => {
  isCameraOpen.value = false
}

function dataURLtoFile(dataurl, filename) {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

// format jam sesuai H:i (contoh: 09:30)
function formatHi(date) {
  const h = String(date.getHours()).padStart(2, "0");
  const m = String(date.getMinutes()).padStart(2, "0");
  return `${h}:${m}`;
}

// submit presensi
async function handleSubmit(photoBase64) {
  loading.value = true;

  try {
    const today = new Date();
    const tanggal = today.toISOString().split("T")[0];
    const jamSekarang = formatHi(today); // ✅ ganti pakai H:i

    // Ambil lokasi
    const pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, (err) => {
        alert("Lokasi harus diizinkan untuk presensi!");
        reject(err);
      });
    });
    const { latitude, longitude } = pos.coords;

    // cek data presensi hari ini
    let checkRes;
    try {
      checkRes = await api.get(`/api/get-presensi-today/${karyawanId}`);
      presensiData.value = checkRes.data.data;
    } catch (err) {
      presensiData.value = null; 
    }

    const sudahCheckIn = !!presensiData.value?.jam_masuk;
    const sudahCheckOut = !!presensiData.value?.jam_keluar;

    if (sudahCheckIn && sudahCheckOut) {
      alert("Anda sudah melakukan presensi hari ini.");
      return;
    }

    // check-in atau check-out
    const isCheckIn = !sudahCheckIn;
    // Ubah base64 → File
    const fotoFile = dataURLtoFile(photoBase64, "foto.png");

    // Upload foto
    const uploadForm = new FormData();
    uploadForm.append("foto", fotoFile);

    const uploadRes = await api.post(
      "/api/upload-foto-karyawan",
      uploadForm,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    const fotoPath = uploadRes.data.foto_path;

    // absensi
    const absensiPayload = {
      karyawan_id: karyawanId,
      tanggal,
      jam_masuk: isCheckIn ? jamSekarang : undefined,
      jam_keluar: !isCheckIn ? jamSekarang : undefined,
      lat_masuk: isCheckIn ? latitude : undefined,
      long_masuk: isCheckIn ? longitude : undefined,
      lat_pulang: !isCheckIn ? latitude : undefined,
      long_pulang: !isCheckIn ? longitude : undefined,
      foto_masuk: isCheckIn ? fotoPath : undefined,
      foto_keluar: !isCheckIn ? fotoPath : undefined,
    };

    const res = await api({
      method: isCheckIn ? "post" : "put",
      url: isCheckIn ? "/api/check-in" : "/api/check-out",
      data: absensiPayload,
    });

    alert(res.data.message || "Presensi berhasil!");

    // Refresh data presensi
    const refresh = await api.get(`/api/get-presensi-today/${karyawanId}`);
    presensiData.value = refresh.data.data;

    previewFoto.value = fotoPath;
  } catch (err) {
    console.error("❌ Error:", err.response?.data || err);
    alert(err.response?.data?.message || "Presensi gagal!");
  } finally {
    loading.value = false;
    closeCamera();
  }
}
</script>
