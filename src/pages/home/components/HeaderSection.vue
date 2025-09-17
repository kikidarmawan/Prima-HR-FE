<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import Oren from "@/assets/images/Profile.png";

const store = useStore();


// ambil data karyawan dari store

const loading = ref(true);


const karyawan = computed(() => store.getters["karyawan/karyawan"]);
const nama = computed(() => karyawan.value?.nama_karyawan || "");
const jabatan = computed(() => karyawan.value?.jabatan?.nama_jabatan || "");

// foto profil, fallback ke localStorage atau default
const fotoUrl = computed(() => {

  const storedImage = localStorage.getItem("profileImage");

  if (!karyawan.value) return Oren;
  const storedImage = localStorage.getItem(`profileImage_${karyawan.value.id}`);

  if (storedImage) return storedImage;
  return karyawan.value?.foto_url || Oren;
});

// fetch data karyawan saat mounted
onMounted(async () => {
  try {
    await store.dispatch("karyawan/fetchKaryawanById");
  } catch (err) {
    console.error("Gagal ambil data karyawan:", err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="flex justify-between items-center p-5 gap-5 w-full">
    <!-- Kalau masih loading -->
    <template v-if="loading">
      <div class="flex items-center gap-5 animate-pulse">
        <div class="rounded-full bg-gray-300 dark:bg-gray-700 w-[52px] h-[52px]"></div>
        <div>
          <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32 mb-2"></div>
          <div class="h-3 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
        </div>
      </div>
      <div class="ml-auto">
        <div class="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
      </div>
    </template>

    <!-- Kalau sudah ada data -->
    <template v-else>
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
    </template>
  </div>
</template>
