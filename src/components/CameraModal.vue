<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const emit = defineEmits(["close", "submit"]);
const videoRef = ref(null);
const canvasRef = ref(null);
const photo = ref(null);
const showLoadingModal = ref(false);

let stream = null;

// Start camera
async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.value.srcObject = stream;
  } catch (err) {
    console.error("Tidak bisa akses kamera:", err);
    alert("Kamera tidak bisa diakses. Pastikan izin sudah diberikan.");
  }
}

// Stop camera
function stopCamera() {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    stream = null;
  }
}

// Capture photo
function capturePhoto() {
  const video = videoRef.value;
  const canvas = canvasRef.value;
  const context = canvas.getContext("2d");

  if (!video || video.readyState < 2) return;

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.setTransform(1, 0, 0, 1, 0, 0);

  // mirror
  context.translate(canvas.width, 0);
  context.scale(-1, 1);
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  photo.value = canvas.toDataURL("image/png");
  stopCamera();
}

// Retake
async function retakePhoto() {
  photo.value = null;
  await startCamera();
}

// Submit
async function submitPhoto() {
  if (!photo.value) return;

  showLoadingModal.value = true;

  // simulasi proses async (misalnya upload API)
  setTimeout(() => {
    showLoadingModal.value = false;
    emit("submit", photo.value);
    closeCamera();
  }, 2000);
}

// Close
function closeCamera() {
  stopCamera();
  emit("close");
}

onMounted(startCamera);
onUnmounted(stopCamera);
</script>

<template>
  <div class="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50">
    <div
      class="p-5 rounded-lg shadow-lg w-[90%] max-w-md transition-colors duration-300
             bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100"
    >
      <h2 class="text-lg font-bold mb-4">Ambil Foto</h2>

      <!-- Preview kamera -->
      <div v-if="!photo" class="relative">
        <video
          ref="videoRef"
          autoplay
          playsinline
          class="w-full rounded-lg transform -scale-x-100"
        ></video>
      </div>

      <!-- Foto hasil capture -->
      <div v-else class="mb-3">
        <img :src="photo" class="w-full rounded-lg" />
      </div>
      <canvas ref="canvasRef" class="hidden"></canvas>

      <!-- Tombol -->
      <div class="flex justify-between mt-4 gap-2">
        <button
          v-if="!photo"
          @click="capturePhoto"
          class="flex-1 px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600"
        >
          Capture
        </button>

        <template v-else>
          <button
            @click="retakePhoto"
            class="flex-1 px-4 py-2 rounded-lg text-white bg-yellow-500 hover:bg-yellow-600"
          >
            Retake
          </button>
          <button
            @click="submitPhoto"
            class="flex-1 px-4 py-2 rounded-lg text-white bg-green-500 hover:bg-green-600"
          >
            Submit
          </button>
        </template>

        <button
          @click="closeCamera"
          class="px-4 py-2 rounded-lg text-white bg-gray-400 hover:bg-gray-500
                 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

