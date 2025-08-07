<script setup>
import { ref, onMounted } from "vue";
import Navbar from "../../components/Navbar.vue";
import Oren from "../../assets/images/Oren.jpg";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const avatar = ref(Oren);

onMounted(() => {
  const savedImage = localStorage.getItem("profileImage");
  if (savedImage) {
    avatar.value = savedImage;
  }
});

const updateProfilePic = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      avatar.value = reader.result;
      localStorage.setItem("profileImage", reader.result);
    };
    reader.readAsDataURL(file);
  }
};

const handleLogout = () => {
  store.dispatch("auth/logout");
  router.push("/login");
};
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-black flex flex-col justify-between pb-20 transition-colors duration-300">
    <!-- Profile -->
    <div class="flex flex-col items-center p-10 relative">
      <div class="relative w-24 h-24">
        <img :src="avatar" class="rounded-full w-24 h-24 object-cover" alt="User Avatar" />
        <label for="fileInput" class="absolute -bottom-1 -right-1 bg-blue-500 hover:bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center shadow-md cursor-pointer">
          <i class="fa-solid fa-camera text-xs"></i>
          <input id="fileInput" type="file" accept="image/*" class="hidden" @change="updateProfilePic" />
        </label>
      </div>

      <h1 class="font-semibold text-xl mt-4 text-gray-900 dark:text-white">Michael Mitc</h1>
      <h2 class="text-base text-gray-500 dark:text-gray-400">Lead UI/UX Designer</h2>

      <button class="mt-4 bg-blue-500 w-full text-lg text-white px-6 py-2 rounded-xl cursor-pointer hover:bg-blue-600 transition">
        Edit Profile
      </button>
    </div>

    <!-- Menu list -->
    <div class="px-6">
      <!-- My Profile -->
      <router-link to="/profile/details">
        <div class="flex items-center justify-between px-2 py-5 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <i class="fa-regular fa-user text-2xl text-gray-600 dark:text-gray-300"></i>
            </div>
            <span class="text-base font-medium text-gray-800 dark:text-gray-200">My Profile</span>
          </div>
          <i class="fa-solid fa-angle-right text-gray-400 dark:text-gray-500"></i>
        </div>
      </router-link>

      <!-- Change Password -->
      <router-link to="/change-password">
        <div class="flex items-center justify-between px-2 py-5 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <i class="fa-solid fa-lock text-2xl text-gray-600 dark:text-gray-300"></i>
            </div>
            <span class="text-base font-medium text-gray-800 dark:text-gray-200">Change Password</span>
          </div>
          <i class="fa-solid fa-angle-right text-gray-400 dark:text-gray-500"></i>
        </div>
      </router-link>

      <!-- Terms & Conditions -->
      <router-link to="/conditions">
        <div class="flex items-center justify-between px-2 py-5 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <i class="fa-regular fa-file-lines text-2xl text-gray-600 dark:text-gray-300"></i>
            </div>
            <span class="text-base font-medium text-gray-800 dark:text-gray-200">Terms & Conditions</span>
          </div>
          <i class="fa-solid fa-angle-right text-gray-400 dark:text-gray-500"></i>
        </div>
      </router-link>

      <!-- Privacy Policy -->
      <router-link to="/privacy">
        <div class="flex items-center justify-between px-2 py-5 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <i class="fa-solid fa-shield-halved text-2xl text-gray-600 dark:text-gray-300"></i>
            </div>
            <span class="text-base font-medium text-gray-800 dark:text-gray-200">Privacy Policy</span>
          </div>
          <i class="fa-solid fa-angle-right text-gray-400 dark:text-gray-500"></i>
        </div>
      </router-link>

      <!-- Settings (Switch Mode) -->
      <div class="flex items-center justify-between px-2 py-5 border-b border-gray-200 dark:border-gray-700"
        x-data="{ darkMode: localStorage.getItem('theme') === 'dark' }"
        x-init="$watch('darkMode', val => { document.documentElement.classList.toggle('dark', val); localStorage.setItem('theme', val ? 'dark' : 'light') })">
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <i class="fa-solid fa-gear text-2xl text-gray-600 dark:text-gray-300"></i>
          </div>
          <span class="text-base font-medium text-gray-800 dark:text-gray-200">Switch Mode</span>
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" x-model="darkMode" class="sr-only peer" />
          <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-500 transition-all"></div>
          <div class="absolute left-0.5 top-0.5 w-5 h-5 bg-white border border-gray-300 rounded-full transition-transform peer-checked:translate-x-full dark:border-gray-600"></div>
        </label>
      </div>
    </div>

    <!-- Logout -->
    <button @click="handleLogout" class="w-full text-left cursor-pointer">
      <div class="flex items-center gap-5 px-9 py-5 mt-2 text-red-500">
        <div class="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
          <i class="fa-solid fa-arrow-right-from-bracket text-base"></i>
        </div>
        <span class="text-base font-medium">Log out</span>
      </div>
    </button>

    <!-- Bottom Navbar -->
    <Navbar />
  </div>
</template>
