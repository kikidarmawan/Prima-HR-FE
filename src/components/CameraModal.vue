<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const emit = defineEmits(["close", "submit"]);
const videoRef = ref(null);
const canvasRef = ref(null);
const photo = ref(null);
let stream = null;

async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.value.srcObject = stream;
  } catch (err) {
    console.error("Tidak bisa akses kamera:", err);
  }
}

function capturePhoto() {
  const context = canvasRef.value.getContext("2d");
  canvasRef.value.width = videoRef.value.videoWidth;
  canvasRef.value.height = videoRef.value.videoHeight;

  // (mirror)
  context.translate(canvasRef.value.width, 0);
  context.scale(-1, 1);

  context.drawImage(videoRef.value, 0, 0);
  photo.value = canvasRef.value.toDataURL("image/png");
}

function submitPhoto() {
  emit("submit", photo.value);
  closeCamera();
}

function closeCamera() {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }
  emit("close");
}

onMounted(startCamera);
onUnmounted(closeCamera);
</script>

<template>
  <div class="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50">
    <div
      class="p-5 rounded-lg shadow-lg w-[90%] max-w-md transition-colors duration-300
             bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100"
    >
      <h2 class="text-lg font-bold mb-4">Ambil Foto</h2>

      <!-- Preview mirror -->
      <div v-if="!photo" class="relative">
        <video
          ref="videoRef"
          autoplay
          playsinline
          class="w-full rounded-lg transform -scale-x-100"
        ></video>
      </div>

      <canvas ref="canvasRef" class="hidden"></canvas>

      <div v-if="photo" class="mb-3">
        <img :src="photo" class="w-full rounded-lg" />
      </div>

      <div class="flex justify-between mt-4">
        <button
          v-if="!photo"
          @click="capturePhoto"
          class="cursor-pointer px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600"
        >
          Capture
        </button>

        <button
          v-if="photo"
          @click="submitPhoto"
          class="cursor-pointer px-4 py-2 rounded-lg text-white bg-green-500 hover:bg-green-600"
        >
          Submit
        </button>

        <button
          @click="closeCamera"
          class="px-4 py-2 rounded-lg text-white bg-gray-400 hover:bg-gray-500
                 dark:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>
