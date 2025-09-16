
<script setup>
import { ref, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import SuccessModal from "@/components/SuccessModal.vue";
import api from "@/services/api";

const store = useStore();
const router = useRouter();
const form = ref({
  nama_karyawan: "",
  email: "",
  no_hp: "",
  jk: "",
  foto: null,
});
const defaultAvatar = new URL(
  "../../assets/images/Profile.png",
  import.meta.url
).href;
const previewImage = ref(null);
const existingData = ref(null);
// modal
const showLoadingModal = ref(false);
const showSuccessModal = ref(false);
const showErrorModal = ref(false);
const errorMessage = ref("");

// ambil data awal
onMounted(async () => {
  await store.dispatch("karyawan/fetchKaryawanById");
  const data = store.getters["karyawan/karyawan"];
  if (data) {
    existingData.value = data;
    form.value.nama_karyawan = data.nama_karyawan || "";
    form.value.email = data.email || "";
    form.value.no_hp = data.no_hp || "";
    form.value.jk = data.jk || "";
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      previewImage.value = storedImage;
    } else {
      previewImage.value = data.foto_url || defaultAvatar;
    }
  }
});

watch(
  () => store.getters["karyawan/karyawan"],
  (newData) => {
    if (newData) {
      existingData.value = newData;
      if (!showLoadingModal.value && !localStorage.getItem("profileImage")) {
        previewImage.value = newData.foto_url || defaultAvatar;
      }
    }
  },
  { deep: true, immediate: true }
);

// upload avatar
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.value.foto = file;
    previewImage.value = URL.createObjectURL(file);
  }
};

// update profile
const updateProfile = async () => {
  showLoadingModal.value = true;
  try {
    let fotoUrl = null;
    if (form.value.foto instanceof File) {
      const formData = new FormData();
      formData.append("foto", form.value.foto);

      const token = localStorage.getItem("token");
      const uploadRes = await api.post("/api/upload-foto-karyawan", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (uploadRes.data?.status && uploadRes.data.url_path) {
        const newUrl = `${uploadRes.data.url_path}?t=${Date.now()}`;
        previewImage.value = newUrl;
        localStorage.setItem("profileImage", newUrl);
      }
    }
    let jkMapped = form.value.jk;
    if (jkMapped === "Laki-laki") jkMapped = "L";
    if (jkMapped === "Perempuan") jkMapped = "P";

    // payload PUT
    const formPayload = {
      id: existingData.value?.id,
      nama_karyawan: form.value.nama_karyawan,
      email: form.value.email,
      no_hp: form.value.no_hp,
      jk: jkMapped,
    };

    if (fotoUrl) formPayload.foto = fotoUrl;
    console.log("Final payload PUT:", formPayload);

    const token = localStorage.getItem("token");
    const res = await api.put("/api/update-karyawan", formPayload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const updatedData = res.data.data || res.data;

    store.commit("karyawan/SET_KARYAWAN", updatedData);
    localStorage.setItem("karyawan", JSON.stringify(updatedData));

    form.value.nama_karyawan =
      updatedData.nama_karyawan || form.value.nama_karyawan;
    form.value.email = updatedData.email || form.value.email;
    form.value.no_hp = updatedData.no_hp || form.value.no_hp;
    form.value.jk = updatedData.jk || form.value.jk;
    if (fotoUrl) {
      const newUrl = `${fotoUrl}?t=${Date.now()}`;
      previewImage.value = newUrl;
      localStorage.setItem("profileImage", newUrl);
    }

    showLoadingModal.value = false;
    showSuccessModal.value = true;
  } catch (err) {
    showLoadingModal.value = false;
    console.error("Full error:", err);
    console.error("Validation errors:", err.response?.data?.errors);

    // parsing error message
    let errorText = "";
    if (err.response?.data?.errors) {
      errorText = Object.entries(err.response.data.errors)
        .map(([field, msgs]) => `${field}: ${msgs.join(", ")}`)
        .join("; ");
    }

    errorMessage.value =
      errorText ||
      err.response?.data?.message ||
      "Gagal update profile, coba lagi.";
    showErrorModal.value = true;
  }
};

const handleSuccessClose = () => {
  showSuccessModal.value = false;
  router.push("/profile");
};
</script>

<template>
  <div
    class="bg-white dark:bg-[#0c0e19] min-h-screen transition-colors duration-300"
  >
    <div class="max-w-sm mx-auto">
      <!-- Header -->
      <div class="flex items-center justify-between p-6">
        <router-link
          to="/profile"
          class="text-2xl text-gray-700 dark:text-white"
        >
          <i class="fa-solid fa-angle-left"></i>
        </router-link>
        <h1 class="text-xl font-semibold text-gray-800 dark:text-white">
          Edit Profile
        </h1>
        <div class="w-6"></div>
      </div>
      <!-- Avatar Upload -->
      <div class="flex flex-col items-center mb-6">
        <div class="relative">
          <img
            :src="previewImage || defaultAvatar"
            alt="Profile"
            class="w-28 h-28 rounded-full object-cover border-4 border-blue-400 shadow-md"
            :key="previewImage"
          />
          <label
            for="avatar"
            class="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full cursor-pointer shadow-md"
          >
            <i class="fa-solid fa-camera"></i>
          </label>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            class="hidden"
            @change="handleImageUpload"
          />
        </div>
        <p class="text-gray-500 dark:text-gray-400 text-sm mt-2">
          Tap icon to change photo
        </p>
      </div>
      <!-- Form -->
      <form @submit.prevent="updateProfile" class="px-6 space-y-6">
        <!-- Name -->
        <div>
          <label class="block text-blue-500 mb-1 text-sm font-medium"
            >Name</label
          >
          <input
            type="text"
            v-model="form.nama_karyawan"
            class="w-full px-4 py-3 border border-blue-400 rounded-xl focus:outline-none focus:ring focus:ring-blue-300 text-gray-800 dark:text-white bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="Enter your name"
          />
        </div>
        <!-- Email -->
        <div>
          <label class="block text-blue-500 mb-1 text-sm font-medium"
            >Email</label
          >
          <input
            type="email"
            v-model="form.email"
            class="w-full px-4 py-3 border border-blue-400 rounded-xl focus:outline-none focus:ring focus:ring-blue-300 text-gray-800 dark:text-white bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="Enter your email"
          />
        </div>
        <!-- Phone -->
        <div>
          <label class="block text-blue-500 mb-1 text-sm font-medium"
            >Phone</label
          >
          <input
            type="text"
            v-model="form.no_hp"
            class="w-full px-4 py-3 border border-blue-400 rounded-xl focus:outline-none focus:ring focus:ring-blue-300 text-gray-800 dark:text-white bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="Enter your phone number"
          />
        </div>
        <!-- Save Button -->
        <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white text-xl text-center py-3 cursor-pointer rounded-xl transition-colors duration-300"
        >
          Save Changes
        </button>
      </form>
    </div>
  </div>
  <!-- Modal Loading -->
  <transition
    enter-active-class="transition-opacity duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="showLoadingModal"
      class="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
    >
      <div
        class="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-sm w-full mx-4 flex flex-col items-center shadow-xl"
      >
        <svg
          class="animate-spin h-12 w-12 text-blue-500 mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 
            3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Loading...
        </h3>
        <p class="text-gray-600 dark:text-gray-300 text-center text-sm">
          Updating Profile
        </p>
      </div>
    </div>
  </transition>
  <!-- Success Modal -->
  <SuccessModal
    v-if="showSuccessModal"
    img="https://cdn-icons-png.flaticon.com/512/190/190411.png"
    message="Profile berhasil diupdate "
    @close="handleSuccessClose"
  />
  <!-- Error Modal -->
  <transition
    enter-active-class="transition-opacity duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="showErrorModal"
      class="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
    >
      <div
        class="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl text-center"
      >
        <h3 class="text-lg font-semibold text-red-500 mb-2">Error</h3>
        <p class="text-gray-700 dark:text-gray-300 text-sm mb-4">
          {{ errorMessage }}
        </p>
        <button
          @click="showErrorModal = false"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Tutup
        </button>
      </div>
    </div>
  </transition>
</template>