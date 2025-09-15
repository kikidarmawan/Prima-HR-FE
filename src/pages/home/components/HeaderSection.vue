<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import Oren from "@/assets/images/Oren.jpg";

const store = useStore();

// PERUBAHAN: Gunakan computed untuk mendapatkan data karyawan dari Vuex store
const karyawan = computed(() => store.getters["karyawan/karyawan"]);
const nama = computed(() => karyawan.value?.nama_karyawan || ""); 
const jabatan = computed(() => karyawan.value?.jabatan?.nama_jabatan || ""); 

// PERUBAHAN: Gunakan computed untuk fotoUrl dengan fallback
const fotoUrl = computed(() => {
  // Cek dulu apakah ada gambar di localStorage
  const storedImage = localStorage.getItem("profileImage");
  if (storedImage) {
    return storedImage;
  }
  // Jika tidak ada, gunakan dari Vuex store
  return karyawan.value?.foto_url || Oren;
});

// PERUBAHAN: Ambil data karyawan saat komponen dimount
onMounted(async () => {
  try {
    await store.dispatch("karyawan/fetchKaryawanById");
  } catch (err) {
    console.error("Gagal ambil data karyawan:", err);
  }
});
</script>

<template>
  <div class="flex justify-between items-center p-5 gap-5 w-full">
    <div class="flex items-center gap-5">
      <img
        :src="fotoUrl"
        @error="fotoUrl = Oren"
        class="rounded-full w-[52px] h-[52px] object-cover"
      />
      <div>
        <h1 class="text-base md:text-xl font-semibold text-gray-900 dark:text-white">
          {{ nama }}
        </h1>
        <p class="text-black text-xs dark:text-gray-300">
          {{ jabatan }}
        </p>
      </div>
    </div>
    <div class="ml-auto">
      <router-link to="/notif">
        <div
          class="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 shadow-sm bg-white dark:bg-gray-800"
        >
          <i class="fa-regular fa-bell text-lg text-gray-700 dark:text-gray-300"></i>
        </div>
      </router-link>
    </div>
  </div>
</template>