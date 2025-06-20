<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end"
    @click.self="close"
  >
    <div class="bg-white w-full max-w-sm mx-auto rounded-t-xl p-5">
      <button
        class="w-full text-left py-3 flex  items-center space-x-3 cursor-pointer hover:bg-gray-100 rounded"
        @click="$emit('call', member)"
      >
        <Icon icon="mdi:phone-outline" class="text-xl" />
        <span>Call</span>
      </button>
      <button
        class="w-full text-left py-3 flex items-center space-x-3 text-red-600 hover:bg-red-100 rounded cursor-pointer"
        @click="$emit('delete', member)"
      >
        <Icon icon="mdi:delete-outline" class="text-xl" />
        <span>Delete</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

defineProps({
  modelValue: Boolean,
  member: Object,
})

const emit = defineEmits(['update:modelValue', 'call', 'delete'])

const close = () => emit('update:modelValue', false)
</script>
