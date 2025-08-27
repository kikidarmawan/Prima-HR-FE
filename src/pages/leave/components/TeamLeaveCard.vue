<script setup>
import { Icon } from "@iconify/vue";
import { useStore } from "vuex";
import { ref } from "vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const store = useStore();
const loadingAction = ref(null); // "approve" | "reject" | null

const handleAction = async (type) => {
  loadingAction.value = type;
  const status = type === "approve" ? "Disetujui" : "Ditolak"; //  fix

try {
  await store.dispatch("team_leave/updateLeaveStatus", {
  item: props.item,
  status: type === "approve" ? "Disetujui" : "Ditolak",
});

  } catch (err) {
    console.error("Gagal update status:", err);
  } finally {
    loadingAction.value = null;
  }
};
</script>

<template>
  <div class="block mb-4">
    <div
      class="bg-white dark:bg-gray-900 rounded-2xl space-x-5 mx-3 p-4 shadow transition-colors duration-300"
    >
      <!-- Nama & Tanggal -->
      <div>
        <p class="text-sm font-medium text-gray-900 dark:text-white">
          {{ item.name }}
        </p>
        <p class="text-xs font-bold text-gray-700 dark:text-gray-300">
          {{ item.date }}
        </p>
      </div>

      <!-- Tombol Aksi -->
      <div class="mt-3 flex gap-2 w-full">
        <!-- Reject -->
        <button
          @click.stop="handleAction('reject')"
          :disabled="loadingAction === 'reject'"
          class="flex-1 py-2 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white text-sm cursor-pointer rounded-lg flex items-center justify-center gap-2 transition"
        >
          <Icon
            v-if="loadingAction !== 'reject'"
            icon="mdi:close-circle-outline"
            class="w-4 h-4"
          />
          <span>{{ loadingAction === 'reject' ? 'Loading...' : 'Reject' }}</span>
        </button>

        <!-- Approve -->
        <button
          @click.stop="handleAction('approve')"
          :disabled="loadingAction === 'approve'"
          class="flex-1 py-2 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white text-sm rounded-lg flex items-center justify-center cursor-pointer gap-2 transition"
        >
          <Icon
            v-if="loadingAction !== 'approve'"
            icon="mdi:check-circle-outline"
            class="w-4 h-4"
          />
          <span>{{ loadingAction === 'approve' ? 'Loading...' : 'Accept' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
