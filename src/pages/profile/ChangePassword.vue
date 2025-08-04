<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

// form data
const oldPassword = ref("");
const password = ref("");
const confirmPassword = ref("");

// toggle visibility
const showOld = ref(false);
const showPassword = ref(false);
const showConfirm = ref(false);

// toggle functions
const toggleOld = () => {
  showOld.value = !showOld.value;
};

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirm = () => {
  showConfirm.value = !showConfirm.value;
};

// update password function
const updatePassword = async () => {
  const userId = store.state.auth.user?.id;

  if (!oldPassword.value || !password.value || !confirmPassword.value) {
    alert("Semua field harus diisi");
    return;
  }

  if (password.value !== confirmPassword.value) {
    alert("Password baru dan konfirmasi tidak cocok");
    return;
  }

  try {
    await axios.post(
      `https://sunbeam-proper-pipefish.ngrok-free.app/api/change-password/${userId}`,
      {
        password: oldPassword.value,
        new_password: password.value,
      }
    );

    alert("Password berhasil diubah!");
    router.push("/profile");

  } catch (error) {
    console.error(error);
    alert("Gagal mengubah password: " + (error.response?.data?.message || error.message));
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
          Change Password
        </h1>
        <div class="w-6"></div>
      </div>

      <!-- Form -->
      <div class="px-6 space-y-6">
        <!-- Old Password -->
        <div class="relative">
          <label class="block text-blue-500 mb-1 text-sm font-medium">Old Password</label>
          <input :type="showOld ? 'text' : 'password'" v-model="oldPassword"
            class="w-full px-4 py-3 border border-blue-400 rounded-xl focus:outline-none focus:ring focus:ring-blue-300 text-gray-800 dark:text-white bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="Enter old password" />
          <button type="button" @click="toggleOld" class="absolute right-4 top-[42px] text-gray-500 dark:text-gray-400">
            <i :class="showOld ? 'fa fa-eye' : 'fa fa-eye-slash'"></i>
          </button>
        </div>

        <!-- New Password -->
        <div class="relative">
          <label class="block text-blue-500 mb-1 text-sm font-medium">New Password</label>
          <input :type="showPassword ? 'text' : 'password'" v-model="password"
            class="w-full px-4 py-3 border border-blue-400 rounded-xl focus:outline-none focus:ring focus:ring-blue-300 text-gray-800 dark:text-white bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="Enter new password" />
          <button type="button" @click="togglePassword"
            class="absolute right-4 top-[42px] text-gray-500 dark:text-gray-400">
            <i :class="showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'"></i>
          </button>
        </div>

        <!-- Confirm Password -->
        <div class="relative">
          <label class="block text-blue-500 mb-1 text-sm font-medium">Confirm Password</label>
          <input :type="showConfirm ? 'text' : 'password'" v-model="confirmPassword"
            class="w-full px-4 py-3 border border-blue-400 rounded-xl focus:outline-none focus:ring focus:ring-blue-300 text-gray-800 dark:text-white bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="Re-enter new password" />
          <button type="button" @click="toggleConfirm"
            class="absolute right-4 top-[42px] text-gray-500 dark:text-gray-400">
            <i :class="showConfirm ? 'fa fa-eye' : 'fa fa-eye-slash'"></i>
          </button>
        </div>
        <!-- Update Button -->
        <div @click="updatePassword"
          class="w-full bg-blue-500 mt-1 0 hover:bg-blue-600 text-white text-xl text-center py-3 cursor-pointer rounded-xl transition-colors duration-300">
          Update
        </div>
      </div>


      <!-- Update Button -->
      <div
        class="w-full bg-blue-500 mt-100 hover:bg-blue-600 text-white text-xl text-center py-3 cursor-pointer rounded-xl transition-colors duration-300">
        Update
      </div>

    </div>
  </div>
</template>
