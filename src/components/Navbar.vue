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
          <span v-else class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
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
  <!-- <div v-if="previewFoto" class="mt-4 flex justify-center">
    <img :src="`http://192.168.0.155:8000/${previewFoto}`" alt="Foto Presensi"
      class="w-32 h-32 rounded-lg border shadow" />
  </div> -->
  <transition enter-active-class="transition-opacity duration-300 ease-out" enter-from-class="opacity-0"
    enter-to-class="opacity-100" leave-active-class="transition-opacity duration-300 ease-in"
    leave-from-class="opacity-100" leave-to-class="opacity-0">
    <div v-if="loading "
      class="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div class="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-sm w-full mx-4 flex flex-col items-center shadow-xl">
        <svg class="animate-spin h-12 w-12 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 
            3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Loading...</h3>
        <p class="text-gray-600 dark:text-gray-300 text-center text-sm">Proccess Your Data</p>
      </div>
    </div>
  </transition>
  <!-- Success Modal -->
  <SuccessModal v-if="showSuccessModal" img="https://cdn-icons-png.flaticon.com/512/190/190411.png"
    message="Absen Berhasil" @close="handleSuccessClose" />

  <!-- Error Modal -->
  <transition enter-active-class="transition-opacity duration-300 ease-out" enter-from-class="opacity-0"
    enter-to-class="opacity-100" leave-active-class="transition-opacity duration-300 ease-in"
    leave-from-class="opacity-100" leave-to-class="opacity-0">
    <div v-if="showErrorModal" class="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div class="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl text-center">
        <h3 class="text-lg font-semibold text-red-500 mb-2">Error</h3>
        <p class="text-gray-700 dark:text-gray-300 text-sm mb-4">{{ errorMessage }}</p>
        <button @click="showErrorModal = false" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
          Tutup
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import CameraModal from './CameraModal.vue'
import api from "@/services/api"
import { useStore } from "vuex";
import SuccessModal from "@/components/SuccessModalAbsensi.vue";


const route = useRoute()
const store = useStore();
const isCameraOpen = ref(false)
const presensiData = ref(null)
const loading  = computed(() => store.state.absen.loadingSubmitPresensi)
const showSuccessModal = ref(false)
const showErrorModal = ref(false)
const previewFoto = ref(null)

const user = JSON.parse(localStorage.getItem("user"))
const karyawanId = user?.id || null
if (!karyawanId) {
  alert("User tidak ditemukan, silakan login ulang.")
}

const openCamera = () => { isCameraOpen.value = true }
const closeCamera = () => { isCameraOpen.value = false }

// 🔹 Helper untuk class active/hover nav
const getNavClass = (path) => {
  return route.path === path
    ? "text-blue-600 dark:text-blue-400"
    : "text-gray-500 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400"
}

const handleSuccessClose = () => {
  showSuccessModal.value = false;
};

// 🔹 Submit presensi
async function handleSubmit(photoBase64) {
  loading.value = true
  try {
    const result = await store.dispatch("absen/submitAbsensi", {
      photoBase64,
      karyawanId,
    })

    if (!result) throw new Error("Gagal mendapatkan hasil presensi")

    const { message, fotoPath } = result

    showSuccessModal.value = true
    console.log("Foto tersimpan di:", fotoPath)

    // alert(message || "Presensi berhasil!")
    previewFoto.value = fotoPath
    store.dispatch("presensi/fetchTodayPresensi");
    store.dispatch("presensi/fetchMonthPresensi");
  } catch (err) {
    console.error("Error:", err)
    showErrorModal.value = true
  } finally {
    loading.value = false
    closeCamera()
  }
}

</script>
