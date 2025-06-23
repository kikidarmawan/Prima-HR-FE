<script setup>
import { Icon } from "@iconify/vue";

const emit = defineEmits(["open-options"]);

defineProps({
  avatar: String,
  name: String,
  email: String,
});
</script>

<template>
  <div class="border-b border-gray-300 py-4 px-3">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <img :src="avatar" class="w-10 h-10 rounded-full object-cover" />
        <div>
          <p class="font-semibold text-sm">{{ name }}</p>
          <p class="text-xs text-gray-500">{{ email }}</p>
        </div>
      </div>
      <button
        class="cursor-pointer text-gray-400 text-xl"
        @click="emit('open-options')"
      >
        <Icon icon="mdi:dots-vertical" class="cursor-pointer" />
      </button>
    </div>
  </div>
</template>
