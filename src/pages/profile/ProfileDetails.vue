<script setup>
import { ref, watchEffect } from "vue";
import { useStore } from "vuex";
import api from "@/services/api";

import TabPersonal from "./components/TabPersonal.vue";
import TabProfessional from "./components/TabProfessional.vue";
import TabDocuments from "./components/TabDocuments.vue";

// Tabs
const tabs = ["Personal", "Professional", "Documents"];
const activeTab = ref("Personal");
const store = useStore();
const karyawan = ref(null);

// Tunggu user tersedia
watchEffect(async () => {
  let userId = store.state.auth.user?.id;

  // Ambil dari localStorage kalau belum ada user
  if (!userId) {
    const userFromLocal = localStorage.getItem("user");
    if (userFromLocal) {
      const parsed = JSON.parse(userFromLocal);
      userId = parsed.id;
      store.commit("auth/SET_USER", parsed);
    }
  }

  console.warn("userId sekarang:", userId);
  if (!userId) return;

  //token localStorage
  const token = localStorage.getItem("token");
  if (!token) {
    console.warn("Token tidak ditemukan. Apakah sudah login?");
    return;
  }

  try {
    const res = await api.get(`/api/detail-karyawan/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    karyawan.value = res.data.data;
    localStorage.setItem("karyawan", JSON.stringify(karyawan.value));


    console.log("DATA KARYAWAN:", karyawan.value);
  } catch (err) {
    console.error("Gagal ambil data karyawan:", err);
  }
});
</script>



<template>
  <div class="p-5 max-w-sm mx-auto min-h-screen bg-white dark:bg-black transition-colors duration-300">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <router-link to="/profile" class="text-2xl text-gray-700 dark:text-gray-200">
        <i class="fa-solid fa-angle-left"><span class="text-white dark:text-black">A</span></i>
      </router-link>

      <h1 class="text-lg font-bold text-center flex-1 -ml-6 text-gray-900 dark:text-white">
        My Profile
      </h1>
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
