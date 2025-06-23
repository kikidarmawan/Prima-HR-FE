<script setup>
import { ref } from "vue";
import TabPersonal from "./components/TabPersonal.vue";
import TabProfessional from "./components/TabProfessional.vue";
import TabDocuments from "./components/TabDocuments.vue";

const tabs = ["Personal", "Professional", "Documents"];
const activeTab = ref("Personal");
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
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="activeTab = tab"
        :class="[
          'px-4 py-2 rounded-lg dark:text-gray-100 text-sm font-medium cursor-pointer transition',
          activeTab === tab
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-100',
        ]"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Tab Content -->
    <div class="space-y-6">
      <TabPersonal v-if="activeTab === 'Personal'" />
      <TabProfessional v-if="activeTab === 'Professional'" />
      <TabDocuments v-if="activeTab === 'Documents'" />
    </div>
  </div>
</template>
