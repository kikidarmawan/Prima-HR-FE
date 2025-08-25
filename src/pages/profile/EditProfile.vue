<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const karyawan = JSON.parse(localStorage.getItem("karyawan"));
const id = karyawan?.user_id; // Pastikan ini sesuai backend

const form = ref({
  nama_karyawan: "",
  email: "",
  no_hp: "",
  foto: null, // Untuk file foto
});

const defaultAvatar = "https://via.placeholder.com/150";
const previewImage = ref(null);
const existingData = ref(null);

// Ambil data awal karyawan
onMounted(async () => {
  if (!id) return;
  await store.dispatch("karyawan/fetchKaryawanById", id);
  const data = store.getters["karyawan/karyawan"];
  if (data) {
    existingData.value = data;
    form.value.nama_karyawan = data.nama_karyawan || "";
    form.value.email = data.email || "";
    form.value.no_hp = data.no_hp || "";
    previewImage.value = data.foto
      ? `${import.meta.env.VITE_API_URL}/${data.foto}`
      : defaultAvatar;
  }
});

// Handle upload foto
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    previewImage.value = URL.createObjectURL(file);
    form.value.foto = file; // Gunakan field 'foto'
  }
};

// Update profile
const updateProfile = async () => {
  const formData = new FormData();
  formData.append("nama_karyawan", form.value.nama_karyawan);
  formData.append("email", form.value.email);
  formData.append("no_hp", form.value.no_hp);

  // Tambahkan field lain dari data lama agar backend tidak error
  formData.append("jam_kerja_id", existingData.value.jam_kerja_id);
  formData.append("jabatan_id", existingData.value.jabatan_id);
  formData.append("departemen_id", existingData.value.departemen_id);
  formData.append("status", existingData.value.status);

  // Tambahkan foto jika ada
  if (form.value.foto) {
    formData.append("foto", form.value.foto);
  }

  try {
    await store.dispatch("karyawan/updateKaryawan", { id, data: formData });
    await store.dispatch("karyawan/fetchKaryawanById", id);
    alert("Profile berhasil diupdate ✅");
    router.push("/profile");
  } catch (err) {
    alert("Gagal update profile ❌, cek console");
    console.error(err.response?.data || err);
  }
};
</script>

<template>
  <div class="bg-white dark:bg-black min-h-screen transition-colors duration-300">
    <div class="max-w-sm mx-auto">
      <!-- Header -->
      <div class="flex items-center justify-between p-6">
        <router-link to="/profile" class="text-2xl text-gray-700 dark:text-white">
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
          <label class="block text-blue-500 mb-1 text-sm font-medium">Name</label>
          <input
            type="text"
            v-model="form.nama_karyawan"
            class="w-full px-4 py-3 border border-blue-400 rounded-xl focus:outline-none focus:ring focus:ring-blue-300 
                   text-gray-800 dark:text-white bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="Enter your name" />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-blue-500 mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            v-model="form.email"
            class="w-full px-4 py-3 border border-blue-400 rounded-xl focus:outline-none focus:ring focus:ring-blue-300 
                   text-gray-800 dark:text-white bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="Enter your email" />
        </div>

        <!-- Phone -->
        <div>
          <label class="block text-blue-500 mb-1 text-sm font-medium">Phone</label>
          <input
            type="text"
            v-model="form.no_hp"
            class="w-full px-4 py-3 border border-blue-400 rounded-xl focus:outline-none focus:ring focus:ring-blue-300 
                   text-gray-800 dark:text-white bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="Enter your phone number" />
        </div>

        <!-- Save Button -->
        <button type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white text-xl text-center py-3 cursor-pointer rounded-xl transition-colors duration-300">
          Save Changes
        </button>
      </form>
    </div>
  </div>
</template>   