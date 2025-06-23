<template>
  <div class="bg-white rounded-xl p-3 mb-2 flex items-center shadow-md">
    <svg
      class="w-5 h-5 text-gray-400 mr-2"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 24 24"
    >
      <circle
        cx="11"
        cy="11"
        r="8"
        stroke="currentColor"
        stroke-width="2"
        fill="none"
      />
      <line
        x1="21"
        y1="21"
        x2="16.65"
        y2="16.65"
        stroke="currentColor"
        stroke-width="2"
      />
    </svg>
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Search"
      class="w-full outline-none"
    />
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
});
defineEmits(["update:modelValue"]);
</script>
