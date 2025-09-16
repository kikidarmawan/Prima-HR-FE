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
        <!-- Home -->
        <router-link to="/home" class="flex flex-col items-center justify-center transition-colors group">
          <i class="fa-solid fa-house text-xl transition-colors"
             :class="getNavClass('/home')"></i>
          <p class="text-xs font-medium transition-colors"
             :class="getNavClass('/home')">
            Home
          </p>
        </router-link>
        <!-- Leaves -->
        <router-link to="/leaves" class="flex flex-col items-center justify-center transition-colors group">
          <i class="fa-regular fa-calendar text-xl transition-colors"
             :class="getNavClass('/leaves')"></i>
          <p class="text-xs font-medium transition-colors"
             :class="getNavClass('/leaves')">
            Leaves
          </p>
        </router-link>
        <!-- Overtime -->
        <router-link to="/overtime" class="flex flex-col items-center justify-center transition-colors group">
          <i class="fa-regular fa-clock text-xl transition-colors"
             :class="getNavClass('/overtime')"></i>
          <p class="text-xs font-medium transition-colors"
             :class="getNavClass('/overtime')">
            Overtime
          </p>
        </router-link>
        <!-- Holiday -->
        <router-link to="/holiday" class="flex flex-col items-center justify-center transition-colors group">
          <i class="fa-solid fa-umbrella-beach text-xl transition-colors"
             :class="getNavClass('/holiday')"></i>
          <p class="text-xs font-medium transition-colors"
             :class="getNavClass('/holiday')">
            Holiday
          </p>
        </router-link>
        <!-- Profile -->
        <router-link to="/profile" class="flex flex-col items-center justify-center transition-colors group">
          <i class="fa-regular fa-user text-xl transition-colors"
             :class="getNavClass('/profile')"></i>
          <p class="text-xs font-medium transition-colors"
             :class="getNavClass('/profile')">
            Profile
          </p>
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

  <!-- Success Modal -->
  <SuccessModal
    v-if="showSuccessModal"
    :title="successTitle"
    :message="successMessage"
    @close="showSuccessModal = false"
  />

  <!-- Error Modal -->
  <transition
    enter-active-class="transition-opacity duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="showErrorModal"
      class="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
    >
      <div
        class="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl text-center"
      >
        <h3 class="text-lg font-semibold text-red-500 mb-2">Error</h3>
        <p class="text-gray-700 dark:text-gray-300 text-sm mb-4">
          {{ errorMessage }}
        </p>
        <button
          @click="showErrorModal = false"
          class="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Tutup
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import CameraModal from './CameraModal.vue'
import SuccessModal from './SuccessModal.vue'
import api from "@/services/api"

const route = useRoute()
const isCameraOpen = ref(false)
const presensiData = ref(null)
const loading = ref(false)
const previewFoto = ref(null)

// Modal states
const showSuccessModal = ref(false)
const showErrorModal = ref(false)
const successTitle = ref('')
const successMessage = ref('')
const errorMessage = ref('')

const user = JSON.parse(localStorage.getItem("user"))
const karyawanId = user?.id || null
if (!karyawanId) {
  errorMessage.value = "User tidak ditemukan, silakan login ulang."
  showErrorModal.value = true
}

const openCamera = () => { isCameraOpen.value = true }
const closeCamera = () => { isCameraOpen.value = false }

//  Helper untuk class active/hover nav
const getNavClass = (path) => {
  return route.path === path
    ? "text-blue-600 dark:text-blue-400"
    : "text-gray-500 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400"
}

//  Konversi base64 ke File
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

//  Submit presensi
async function handleSubmit(photoBase64) {
  loading.value = true
  try {
    const today = new Date()
    const tanggal = today.toISOString().split("T")[0]
    const token = localStorage.getItem("token")
    
    // 🔎 cek status presensi hari ini
    let checkRes
    try {
      checkRes = await api.get(`/api/presensi-today?tanggal=${tanggal}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      presensiData.value = checkRes.data.data
    } catch (err) {
      presensiData.value = null
    }
    
    const todayData = presensiData.value?.["0"] || null
    const sudahCheckIn = !!todayData?.jam_masuk
    const sudahCheckOut = !!todayData?.jam_keluar
    
    if (sudahCheckIn && sudahCheckOut) {
      errorMessage.value = "Anda sudah melakukan presensi hari ini."
      showErrorModal.value = true
      return
    }
    
    const isCheckIn = !sudahCheckIn
    const jamSekarang = isCheckIn ? formatHi(today) : formatHis(today)
    
    //  ambil lokasi user
    const pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, (err) => {
        errorMessage.value = "Lokasi harus diizinkan untuk presensi!"
        showErrorModal.value = true
        reject(err)
      })
    })
    
    const { latitude, longitude } = pos.coords
    
    //  upload foto
    const fotoFile = dataURLtoFile(photoBase64, "foto.png")
    const uploadForm = new FormData()
    uploadForm.append("foto", fotoFile)
    const uploadRes = await api.post("/api/upload-foto-karyawan", uploadForm, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
    const fotoPath = uploadRes.data.foto_path
    
    // payload absensi
    const absensiPayload = {
      karyawan_id: karyawanId,
      tanggal,
      ...(isCheckIn
        ? { jam_masuk: jamSekarang, lat_masuk: latitude, long_masuk: longitude, foto_masuk: fotoPath }
        : { jam_keluar: jamSekarang, lat_pulang: latitude, long_pulang: longitude, foto_keluar: fotoPath }),
    }
    
    console.log("Action:", isCheckIn ? "Check-in" : "Check-out")
    console.log("Absensi Payload:", absensiPayload)
    
    const res = await api({
      method: isCheckIn ? "post" : "put",
      url: isCheckIn ? "/api/check-in" : "/api/check-out",
      data: absensiPayload,
      headers: { 
        Authorization: `Bearer ${token}`,  
        Accept: "application/json",
      },
    })
    
    successTitle.value = isCheckIn ? "Check-in Successful" : "Check-out Successful"
    successMessage.value = res.data.message || (isCheckIn ? "Your check-in has been recorded successfully!" : "Your check-out has been recorded successfully!")
    showSuccessModal.value = true
    
    previewFoto.value = fotoPath
    
    // Refresh data
    const refresh = await api.get(`/api/presensi-today?tanggal=${tanggal}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    await api.get(`/api/presensi-month`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    presensiData.value = refresh.data.data
  } catch (err) {
    console.error("Error:", err.response?.data || err)
    errorMessage.value = err.response?.data?.message || "Presensi gagal!"
    showErrorModal.value = true
  } finally {
    loading.value = false
    closeCamera()
  }
}
</script>