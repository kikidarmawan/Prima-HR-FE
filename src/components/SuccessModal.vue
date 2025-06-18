<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs">
    <div class="bg-white rounded-2xl p-6 w-80 text-center shadow-xl">
      <img :src="img" alt="Success" class="mx-auto w-40 mb-4" />
      <h2 class="text-lg font-bold text-gray-800 mb-1">🎉 Congratulations</h2>
      <p class="text-sm text-gray-600 mb-6">Your account is ready to use</p>
      <a href="home">  <button
        @click="$emit('close')"
        class="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded-lg text-sm font-semibold">Back to Home</button></a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  img: String
})
</script>
