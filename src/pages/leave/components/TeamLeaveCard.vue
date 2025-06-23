<template>
  <router-link to="/leave-detail" class="block mb-4">
    <div
      class="bg-white dark:bg-gray-900 rounded-2xl space-x-5 mx-3 p-4 shadow transition-colors duration-300">
      <div class="flex gap-3 items-start">
        <img
          :src="item.avatar"
          alt="Avatar"
          class="w-10 h-10 rounded-full object-cover mt-1"/>
        <div>
          <p class="text-sm font-medium text-gray-900 dark:text-white">
            {{ item.name }}
          </p>
          <p class="text-xs font-bold text-gray-700 dark:text-gray-300">
            {{ item.date }}
          </p>
        </div>
      </div>

      <div class="mt-3 flex gap-2 w-full">
        <button
          @click.stop="$emit('action', { id: item.id, type: 'reject' })"
          class="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white text-sm cursor-pointer rounded-lg flex items-center justify-center gap-2 transition">
          <Icon icon="mdi:close-circle-outline" class="w-4 h-4" />
          Reject
        </button>
        <button
          @click.stop="$emit('action', { id: item.id, type: 'approve' })"
          class="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg flex items-center justify-center cursor-pointer gap-2 transition">
          <Icon icon="mdi:check-circle-outline" class="w-4 h-4" />
          Accept
        </button>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { Icon } from "@iconify/vue";

defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>
