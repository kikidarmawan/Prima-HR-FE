
<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
})

const borderClass = (color) => {
  const map = {
    blue: 'border-blue-300',
    green: 'border-green-300',
    teal: 'border-teal-300',
    red: 'border-red-300',
  }
  return map[color] || 'border-gray-300'
}

const bgClass = (color) => {
  const map = {
    blue: 'bg-blue-50',
    green: 'bg-green-50',
    teal: 'bg-teal-50',
    red: 'bg-red-50',
  }
  return map[color] || 'bg-gray-50'
}

const textClass = (color) => {
  const map = {
    blue: 'text-blue-500',
    green: 'text-green-500',
    teal: 'text-teal-500',
    red: 'text-red-500',
  }
  return map[color] || 'text-gray-600'
}
</script>


<template>
  <div class="grid grid-cols-2 gap-4">
    <div
      v-for="item in items"
      :key="item.label"
      class="p-4 rounded-2xl border font-semibold space-y-1"
      :class="[borderClass(item.color), bgClass(item.color)]"
    >
      <p class=" text-gray-600">{{ item.label }}</p>
      <p :class="['text-xl font-semibold', textClass(item.color)]">{{ item.value }}</p>
    </div>
  </div>
</template>