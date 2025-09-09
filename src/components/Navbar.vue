<template>
  <!-- Bottom Navbar -->
  <div class="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center">
    <div
      class="relative bg-white dark:bg-gray-900 shadow-xl h-16 rounded-t-3xl px-4 flex items-center justify-between w-106 mx-auto transition-colors duration-300">

      <!-- Curve Bulatan Tengah -->
      <div
        class="absolute -top-14 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 rounded-full z-30 flex items-center justify-center">
        <button
          class="cursor-pointer w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg disabled:opacity-50"
          :disabled="loading" @click="openCamera">
          <i v-if="!loading" class="fa-solid fa-camera text-lg"></i>
          <span v-else class="text-xs">...</span>
        </button>
      </div>

      <!-- Icons -->
      <div class="grid grid-cols-5 w-full text-center">
        <router-link to="/home">
          <i class="fa-solid fa-house text-xl text-gray-500 dark:text-gray-300 
            hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"></i>
        </router-link>

        <router-link to="/leaves">
          <i class="fa-regular fa-calendar text-xl text-gray-500 dark:text-gray-300 
            hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"></i>
        </router-link>

        <router-link to="/overtime">
          <i class="fa-regular fa-clock text-xl text-gray-500 dark:text-gray-300 
            hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"></i>
        </router-link>

        <router-link to="/holiday">
          <i class="fa-solid fa-umbrella-beach text-xl text-gray-500 dark:text-gray-300 
            hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"></i>
        </router-link>

        <router-link to="/profile">
          <i class="fa-regular fa-user text-xl text-gray-500 dark:text-gray-300 
            hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"></i>
        </router-link>
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

// 🔹 Ambil data user dari localStorage
const user = JSON.parse(localStorage.getItem("user"))
const karyawanId = user?.id || null

//  user belum login
if (!karyawanId) {
  alert("User tidak ditemukan, silakan login ulang.")
}

// Buka tutup modal kamera
const openCamera = () => { isCameraOpen.value = true }
const closeCamera = () => { isCameraOpen.value = false }

// Konversi base64 ke File
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

function formatHi(date) {
  const h = String(date.getHours()).padStart(2, "0")
  const m = String(date.getMinutes()).padStart(2, "0")
  return `${h}:${m}`
}

function formatHis(date) {
  const h = String(date.getHours()).padStart(2, "0")
  const m = String(date.getMinutes()).padStart(2, "0")
  const s = String(date.getSeconds()).padStart(2, "0")
  return `${h}:${m}:${s}`
}

// Submit presensi
async function handleSubmit(photoBase64) {
  loading.value = true

  try {
    const today = new Date()
    const tanggal = today.toISOString().split("T")[0]
    const token = localStorage.getItem("token")

    // presensi hari ini
    let checkRes
    try {
      checkRes = await api.get(`/api/presensi-today?tanggal=${tanggal}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      presensiData.value = checkRes.data.data
    } catch (err) {
      presensiData.value = null
    }

    const sudahCheckIn = !!presensiData.value?.jam_masuk
    const sudahCheckOut = !!presensiData.value?.jam_keluar

    if (sudahCheckIn && sudahCheckOut) {
      alert("Anda sudah melakukan presensi hari ini.")
      return
    }

    // check-in atau check-out
    const isCheckIn = !sudahCheckIn
    const jamSekarang = isCheckIn ? formatHi(today) : formatHis(today)

    // Ambil lokasi
    const pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, (err) => {
        alert("Lokasi harus diizinkan untuk presensi!")
        reject(err)
      })
    })
    const { latitude, longitude } = pos.coords
    const fotoFile = dataURLtoFile(photoBase64, "foto.png")

    // Upload foto
    const uploadForm = new FormData()
    uploadForm.append("foto", fotoFile)

    const uploadRes = await api.post("/api/upload-foto-karyawan", uploadForm, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })

    const fotoPath = uploadRes.data.foto_path

    // Payload absensi
    const absensiPayload = {
      karyawan_id: karyawanId,
      tanggal,
      ...(isCheckIn
        ? {
            jam_masuk: jamSekarang,
            lat_masuk: latitude,
            long_masuk: longitude,
            foto_masuk: fotoPath,
          }
        : {
            jam_keluar: jamSekarang,
            lat_pulang: latitude,
            long_pulang: longitude,
            foto_keluar: fotoPath,
          }),
    }

    // Kirim absensi
    const res = await api({
      method: isCheckIn ? "post" : "put",
      url: isCheckIn ? "/api/check-in" : "/api/check-out",
      data: absensiPayload,
      headers: { Authorization: `Bearer ${token}` },
    })

    alert(res.data.message || "Presensi berhasil!")

    // Refresh data
    const refresh = await api.get(`/api/presensi-today?tanggal=${tanggal}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    presensiData.value = refresh.data.data

    previewFoto.value = fotoPath
  } catch (err) {
    console.error("Error:", err.response?.data || err)
    alert(err.response?.data?.message || "Presensi gagal!")
  } finally {
    loading.value = false
    closeCamera()
  }
}
</script>
