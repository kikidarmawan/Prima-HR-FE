<template>
  <div class="block mb-4">
    <div
      class="bg-white dark:bg-gray-900 rounded-2xl space-x-5 mx-3 p-4 shadow transition-colors duration-300"
    >
      <!-- Nama dan Tanggal -->
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
          @click.stop="openConfirm('reject')"
          class="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white text-sm cursor-pointer rounded-lg flex items-center justify-center gap-2 transition"
        >
          <Icon icon="mdi:close-circle-outline" class="w-4 h-4" />
          <span>Reject</span>
        </button>

        <!-- Approve -->
        <button
          @click.stop="openConfirm('approve')"
          class="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg flex items-center justify-center cursor-pointer gap-2 transition"
        >
          <Icon icon="mdi:check-circle-outline" class="w-4 h-4" />
          <span>Accept</span>
        </button>
      </div>
    </div>
  </div>

  <!-- Modal Konfirmasi -->
  <transition
    enter-active-class="transition ease-out duration-300 transform"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition ease-in duration-200 transform"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
>
    <div
      v-if="showConfirm"
      class="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
    >
      <div
        class="w-105 max-w-md bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl mx-4"
      >
        <!-- Title -->
        <h3 class="text-lg font-semibold text-center text-gray-900 dark:text-white">
          Konfirmasi
        </h3>

        <!-- Description -->
        <p class="mt-2 text-center text-gray-700 dark:text-gray-300 text-sm">
          Are you sure you want to
          <span
            :class="
              confirmType === 'approve'
                ? 'text-green-500 font-semibold'
                : 'text-red-500 font-semibold'
            ">
            {{ confirmType === 'approve' ? 'Approve' : 'Reject' }}
          </span>
          this request?
        </p>

        <!-- Actions -->
        <div class="mt-6 flex gap-3">
          <button
            @click="showConfirm = false"
            class="flex-1 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            @click="confirmAction"
            class="flex-1 py-2 rounded-lg text-white font-medium transition"
            :class="
              confirmType === 'approve'
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-red-500 hover:bg-red-600'
            "
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </transition>

  <!-- Modal Loading -->
  <transition
    enter-active-class="transition-opacity duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="showLoadingModal"
      class="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
    >
      <div
        class="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-sm w-105 mx-4 flex flex-col items-center shadow-xl"
      >
        <!-- Spinner -->
        <svg
          class="animate-spin h-12 w-12 text-blue-500 mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24">
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4">
            </circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 
               0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 
               3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
        </svg>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Loading...
        </h3>
        <p class="text-gray-600 dark:text-gray-300 text-center text-sm">
          Processing Request
        </p>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { useStore } from "vuex";
import { ref, watch } from "vue";

const props = defineProps({
  item: { type: Object, required: true },
});
const emit = defineEmits(["action"]);

const store = useStore();
const showConfirm = ref(false);
const confirmType = ref(null);
const showLoadingModal = ref(false);

// Alert 
const showAlert = ref(false);
const alertMessage = ref("");
const alertType = ref("success");

watch(showConfirm, (val) => {
  document.body.classList.toggle("overflow-hidden", val);
});

const openConfirm = (type) => {
  confirmType.value = type;
  showConfirm.value = true;
};

const confirmAction = async () => {
  showConfirm.value = false;
  showLoadingModal.value = true; //  tampilkan loading

  try {
    await store.dispatch("team_leave/updateLeaveStatus", {
      item: props.item,
      status: confirmType.value === "approve" ? "Disetujui" : "Ditolak",
    });

    emit("action", { item: props.item, status: confirmType.value });

    setTimeout(() => {
      showLoadingModal.value = false;
      alertMessage.value = `Request berhasil ${
        confirmType.value === "approve" ? "disetujui" : "ditolak"
      }!`;
      alertType.value = "success";
      showAlert.value = true;
      setTimeout(() => (showAlert.value = false), 2000);
    }, 1000);
  } catch (err) {
    console.error("Gagal update status:", err);
    showLoadingModal.value = false;
    alertMessage.value = "Terjadi kesalahan!";
    alertType.value = "error";
    showAlert.value = true;
    setTimeout(() => (showAlert.value = false), 2000);
  }
};
</script>
