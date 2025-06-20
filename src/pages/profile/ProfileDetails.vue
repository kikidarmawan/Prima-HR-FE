<script setup>
import { ref } from "vue";
import TabPersonal from "./components/TabPersonal.vue";
import TabProfessional from "./components/TabProfessional.vue";
import TabDocuments from "./components/TabDocuments.vue";

const tabs = ["Personal", "Professional", "Documents"];
const activeTab = ref("Personal");
</script>

<template>
  <div class="p-5 max-w-sm mx-auto min-h-screen bg-white">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div class="cursor-pointer">
        <a href="/profile">
          <i class="fa-solid fa-angle-left text-2xl"><span class="text-white">a</span></i>              
        </a>
      </div>

      <h1 class="text-lg font-bold text-center flex-1 -ml-6">My Profile</h1>
    </div>

    <!-- Tabs -->
    <div class="flex justify-around mb-5">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="activeTab = tab"
        :class="[
          'px-4 py-2 rounded-lg text-sm font-medium',
          activeTab === tab
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-700',
        ]"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Tab Content -->
    <div class="p6 space-y-6">
      <TabPersonal v-if="activeTab === 'Personal'" />
      <TabProfessional v-if="activeTab === 'Professional'" />
      <TabDocuments v-if="activeTab === 'Documents'" />
    </div>
  </div>
</template>
