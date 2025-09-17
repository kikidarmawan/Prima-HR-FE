<script setup>
import { ref, computed, onMounted, watch } from "vue";
import Navbar from "../../components/Navbar.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const karyawan = computed(() => store.getters["karyawan/karyawan"]);
const nama = computed(() => karyawan.value?.nama_karyawan || "");
const jabatan = computed(() => karyawan.value?.jabatan?.nama_jabatan || "");
const darkMode = ref(localStorage.getItem("theme") === "dark");
const defaultAvatar = new URL("../../assets/images/Profile.png", import.meta.url).href;
const avatar = ref(defaultAvatar);
const imageKey = ref(0);
const isUpdating = ref(false);

// apply darkmode + load avatar
onMounted(async () => {
  document.documentElement.classList.toggle("dark", darkMode.value);
  await store.dispatch("karyawan/fetchKaryawanById");
});

watch(darkMode, (val) => {
  document.documentElement.classList.toggle("dark", val);
  localStorage.setItem("theme", val ? "dark" : "light");
});

const checkLocalStorageForImage = () => {
  const storedImage = localStorage.getItem("profileImage");
  if (storedImage) {
    return storedImage;
  }
  return null;
};

// perubahan data karyawan
watch(
  karyawan,
  (newVal) => {
    const storedImage = checkLocalStorageForImage();

    if (storedImage && !isUpdating.value) {
      avatar.value = storedImage;
      imageKey.value++;
    } else if (newVal?.foto_url) {
      avatar.value = `${newVal.foto_url}?t=${Date.now()}`;
    } else {
      avatar.value = defaultAvatar;
    }

    imageKey.value++;
  },
  { immediate: true }
);

const handleLogout = () => {
  store.dispatch("auth/logout");
  router.push("/login");
};
</script>

<template>
  <div
    class="min-h-screen bg-white dark:bg-[#0c0e19] flex flex-col justify-between pb-20 transition-colors duration-300"
  >
    <!-- Profile -->
    <div class="flex flex-col items-center p-10 relative">
      <div class="relative w-24 h-24">
        <img 
          :key="imageKey" 
          :src="avatar" 
          class="rounded-full w-24 h-24 object-cover" 
        />
      </div>
      <h1 class="font-semibold text-xl mt-4 text-gray-900 dark:text-white">
        {{ nama }}
      </h1>
      <h2 class="text-base text-gray-500 dark:text-gray-400">{{ jabatan }}</h2>
      <router-link to="/edit-profile">
        <button
          class="mt-4 bg-blue-500 dark:bg-blue-800 w-full text-white px-4 py-2 rounded-xl text-base cursor-pointer hover:bg-blue-600 transition"
        >
          Edit Profile
        </button>
      </router-link>
    </div>
    <!-- Menu list -->
    <div class="px-6">
      <!-- My Profile -->
      <router-link to="/profile/details">
        <div
          class="flex items-center justify-between px-2 py-5 border-b border-gray-200 dark:border-gray-700"
        >
          <div class="flex items-center gap-4">
            <div
              class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
            >
              <i
                class="fa-regular fa-user text-2xl text-gray-600 dark:text-gray-300"
              ></i>
            </div>
            <span class="text-base font-medium text-gray-800 dark:text-gray-200"
              >My Profile</span
            >
          </div>
          <i
            class="fa-solid fa-angle-right text-gray-400 dark:text-gray-500"
          ></i>
        </div>
      </router-link>
      <!-- Change Password -->
      <router-link to="/change-password">
        <div
          class="flex items-center justify-between px-2 py-5 border-b border-gray-200 dark:border-gray-700"
        >
          <div class="flex items-center gap-4">
            <div
              class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
            >
              <i
                class="fa-solid fa-lock text-2xl text-gray-600 dark:text-gray-300"
              ></i>
            </div>
            <span class="text-base font-medium text-gray-800 dark:text-gray-200"
              >Change Password</span
            >
          </div>
          <i
            class="fa-solid fa-angle-right text-gray-400 dark:text-gray-500"
          ></i>
        </div>
      </router-link>
      <!-- Settings (Switch Mode) -->
      <div
        class="flex items-center justify-between px-2 py-5 border-b border-gray-200 dark:border-gray-700"
      >
        <div class="flex items-center gap-4">
          <div
            class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
          >
            <i
              class="fa-solid fa-gear text-2xl text-gray-600 dark:text-gray-300"
            ></i>
          </div>
          <span class="text-base font-medium text-gray-800 dark:text-gray-200"
            >Switch Mode</span
          >
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="darkMode" class="sr-only peer" />
          <div
            class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-500 transition-all"
          ></div>
          <div
            class="absolute left-0.5 top-0.5 w-5 h-5 bg-white border border-gray-300 rounded-full transition-transform peer-checked:translate-x-full dark:border-gray-600"
          ></div>
        </label>
      </div>
    </div>
    <!-- Logout -->
    <button @click="handleLogout" class="w-full text-left cursor-pointer">
      <div class="flex items-center gap-5 px-9 py-5 mt-2 text-red-500">
        <div class="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
          <i class="fa-solid fa-arrow-right-from-bracket text-base text-red-500 dark:text-red-100"></i>
        </div>
        <span class="text-base font-medium">Log out</span>
      </div>
    </button>
    <!-- Bottom Navbar -->
    <Navbar />
  </div>
</template>