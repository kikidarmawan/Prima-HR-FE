<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm  flex items-end"
    @click.self="close"
  >
    <div class="bg-white w-full max-w-sm dark:bg-gray-800 justify-center mx-auto rounded-t-xl p-5">
      <!-- Tombol Call -->
      <button
        class="w-full text-left py-3 flex items-center space-x-3 cursor-pointer rounded"
        @click="$emit('call', member)"
      >
        <i class="fa-solid fa-phone text-2xl text-gray-700"></i>
        <span class="text-gray-700 dark:text-white">Call</span>
      </button>

      <!-- Tombol Delete -->
      <button
        class="w-full text-left py-3 flex items-center space-x-3 text-red-600 rounded cursor-pointer"
        @click="$emit('delete', member)"
      >
        <i class="fa-solid fa-trash-can text-2xl  dark:text-red-800"></i>
        <span>Delete</span>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: Boolean,
  member: Object,
});

const emit = defineEmits(["update:modelValue", "call", "delete"]);

const close = () => emit("update:modelValue", false);
</script>
