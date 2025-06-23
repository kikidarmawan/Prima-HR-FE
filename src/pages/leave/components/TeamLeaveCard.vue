<template>
  <router-link to="/leave-detail" class="block mb-4">
    <div class="bg-white rounded-2xl space-x-5 mx-3 p-4 shadow">
      <div class="flex gap-3 items-start">
        <img
          :src="item.avatar"
          alt="Avatar"
          class="w-10 h-10 rounded-full object-cover mt-1"
        />
        <div>
          <p class="text-sm font-medium text-gray-900">{{ item.name }}</p>
          <p class="text-xs font-bold">{{ item.date }}</p>
        </div>
      </div>

      <div class="mt-3 flex gap-2 w-full">
        <button
          @click="$emit('action', { id: item.id, type: 'reject' })"
          class="flex-1 py-2 bg-red-400 hover:bg-red-500 text-white text-sm cursor-pointer rounded-lg flex items-center justify-center gap-2"
        >
          <Icon icon="mdi:close-circle-outline" class="w-4 h-4" />
          Reject
        </button>
        <button
          @click="$emit('action', { id: item.id, type: 'approve' })"
          class="flex-1 py-2 bg-green-400 hover:bg-green-500 text-white text-sm rounded-lg flex items-center justify-center cursor-pointer gap-2"
        >
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
    // item: { id, avatar, name, date }
  },
});
</script>
