<script setup>
import { ref, watch } from "vue"

// Props dari parent (LeavesPage.vue)
const props = defineProps({
  kategoriAbsensi: {
    type: Array,
    default: () => []
  },
  selected: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(["close", "apply"])

// state lokal
const status = ref([])
const leaveType = ref([...props.selected])
const teamMember = ref("")

// state loading 
const loadingAction = ref(null)


watch(
  () => props.selected,
  (val) => {
    leaveType.value = [...val]
  }
)

const resetFilter = () => {
  if (loadingAction.value) return
  loadingAction.value = "reset"
  setTimeout(() => {
    status.value = []
    leaveType.value = []
    teamMember.value = ""

    emit("apply", {
      status: [],
      leaveType: [],
      teamMember: ""
    })

    loadingAction.value = null
  }, 1000) // 1 detik loading
}

const applyFilter = () => {
  if (loadingAction.value) return
  loadingAction.value = "apply"
  setTimeout(() => {
    emit("apply", {
      status: status.value,
      leaveType: leaveType.value,
      teamMember: teamMember.value
    })
    emit("close")
    loadingAction.value = null
  }, 2000) 
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-end justify-center bg-black/30 backdrop-blur-sm">
    <div
      class="bg-white dark:bg-gray-900 w-105 max-w-md rounded-t-3xl px-6 pt-4 pb-6 text-gray-900 dark:text-gray-100 transition-colors duration-300 relative"
    >
      <!-- Garis indikator -->
      <div class="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-4"></div>

      <!-- Header -->
      <div class="flex items-center justify-between mb-4">
        <h2 class="font-semibold text-lg">Filter</h2>
        <button
          @click="emit('close')"
          :disabled="loadingAction"
          class="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &times;
        </button>
      </div>

      <!-- Leave Type Filter -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Leave Type</label>
        <div class="space-y-2">
          <label
            v-for="item in kategoriAbsensi"
            :key="item.id"
            class="flex items-center gap-2 text-sm"
          >
            <input
              type="checkbox"
              :value="item.nama"
              v-model="leaveType"
              class="accent-blue-500"
              :disabled="loadingAction"
            />
            {{ item.nama }}
          </label>
        </div>
      </div>

      <!-- Tombol -->
      <div class="flex justify-between gap-4">
        <!-- Reset -->
        <button
          @click="resetFilter"
          :disabled="loadingAction"
          class="w-full py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg font-semibold text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <span v-if="loadingAction !== 'reset'">Reset</span>
          <span v-else class="flex items-center gap-2">
            <svg
              class="animate-spin h-4 w-4 text-gray-600 dark:text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            Loading...
          </span>
        </button>

        <!-- Apply -->
        <button
          @click="applyFilter"
          :disabled="loadingAction"
          class="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold text-sm transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <span v-if="loadingAction !== 'apply'">Apply</span>
          <span v-else class="flex items-center gap-2">
            <svg
              class="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            Loading...
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
