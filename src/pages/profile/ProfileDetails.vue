<script setup>
import { ref, watchEffect, computed } from "vue";
import { useStore } from "vuex";
import api from "@/services/api";
import TabPersonal from "./components/TabPersonal.vue";
import TabProfessional from "./components/TabProfessional.vue";
import TabDocuments from "./components/TabDocuments.vue";

// Tabs
const tabs = ["Personal", "Professional", "Documents"];
const activeTab = ref("Personal");
const store = useStore();

// PERUBAHAN: Gunakan computed untuk mendapatkan data karyawan dari Vuex store
const karyawan = computed(() => store.getters["karyawan/karyawan"]);

// PERUBAHAN: Tetap ambil data dari API saat komponen dimount untuk memastikan data terbaru
watchEffect(async () => {
  try {
    await store.dispatch("karyawan/fetchKaryawanById");
  } catch (err) {
    console.error("Gagal ambil data karyawan:", err);
  }
});
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-[#0c0e19] px-4 sm:px-6 py-6 max-w-md mx-auto transition-colors duration-300">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <router-link to="/profile" class="text-2xl text-gray-700 dark:text-gray-200 cursor-pointer">
        <i class="fa-solid fa-angle-left"><span class="text-white dark:text-black"></span></i>
      </router-link>
      <h1 class="text-lg font-bold text-center text-gray-900 dark:text-white -ml-10">
        My Profile
      </h1>
      <div>
      </div>
    </div>
    <!-- Tabs -->
    <div class="flex justify-around mb-5">
      <button v-for="tab in tabs" :key="tab" @click="activeTab = tab" :class="[
        'px-4 py-2 rounded-lg dark:text-gray-100 text-sm font-medium cursor-pointer transition',
        activeTab === tab
          ? 'bg-blue-500 text-white'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-100',
      ]">
        {{ tab }}
      </button>
    </div>
    <!-- Tab Content -->
    <div class="space-y-6">
      <TabPersonal v-if="activeTab === 'Personal'" :data="karyawan" />
      <TabProfessional v-if="activeTab === 'Professional'" :data="karyawan" />
      <TabDocuments v-if="activeTab === 'Documents'" />
    </div>
  </div>
</template>