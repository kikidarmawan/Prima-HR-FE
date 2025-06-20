<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs">
        <transition name="modal-fade">
            <div
                v-show="visible"
                class="bg-white rounded-2xl p-6 w-80 text-center shadow-xl" >
                <img :src="img" alt="Success" class="mx-auto w-40 mb-4" />
                <h2 class="text-lg font-bold text-blue-500 mb-1">Congratulations 🎉</h2>
                <p class="text-sm text-gray-600 mb-6">Your account is ready to use</p>
                <button
                    @click="$emit('close')"
                    class="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded-lg text-sm font-semibold cursor-pointer">
                    Back to Home
                </button>
            </div>
        </transition>
    </div>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs">
    <transition name="modal-fade">
      <div
        v-show="visible"
        class="bg-white rounded-2xl p-6 w-80 text-center shadow-xl">
        <img :src="img" alt="Success" class="mx-auto w-40 mb-4" />
        <h2 class="text-lg font-bold text-blue-500 mb-1">🎉 Congratulations</h2>
        <p class="text-sm text-gray-600 mb-6">Your account is ready to use</p>
        <button
          @click="$emit('close')"
          class="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded-lg text-sm font-semibold">
          Back to Home
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

defineProps({
  img: {
    type: String,
    required: true,
  },
});

const visible = ref(false);

onMounted(() => {
  visible.value = true;
});
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.modal-fade-enter-to,
.modal-fade-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
