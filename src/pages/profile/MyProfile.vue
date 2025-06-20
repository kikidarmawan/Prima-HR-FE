<script setup>
import Oren from "../../assets/images/Oren.jpg";
import Navbar from "../../components/Navbar.vue";
</script>

<template>
  <div class="min-h-screen bg-white flex flex-col justify-between pb-20">
    <!-- Profile -->
    <div class="flex flex-col items-center p-10">
      <img :src="Oren" class="rounded-full w-24 h-24" alt="" />
      <h1 class="font-semibold text-xl mt-4">Michael Mitc</h1>
      <h2 class="text-base text-gray-500">Lead UI/UX Designer</h2>

      <!-- Edit Profile -->
      <button
        class="mt-4 bg-blue-500 w-full text-lg text-white px-6 py-2 rounded-xl">
        Edit Profile
      </button>
    </div>

    <!-- list -->
    <div class="px-6">
      <div
        class="flex items-center justify-between px-2 py-5 border-b border-gray-200">
        <div class="flex items-center gap-4">
          <div
            class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <i class="fa-regular fa-user text-2xl text-gray-600"></i>
          </div>
          <span class="text-base font-medium">My Profile</span>
        </div>
        <a href="/profile/details">
  <i class="fa-solid fa-angle-right text-gray-400"></i>
</a>

      </div>

      <!-- Settings -->
      <div
        class="flex items-center justify-between px-2 py-5 border-b border-gray-200">
        <div class="flex items-center gap-4">
          <div
            class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <i class="fa-solid fa-lock text-2xl text-gray-600"></i>           
          </div>
          <span class="text-base font-medium ">Change Password</span>
        </div>
        <a href="/change-password">
          <i class="fa-solid fa-angle-right text-gray-400"></i>
        </a>
      </div>

      <!-- Terms & Conditions -->
      <div
        class="flex items-center justify-between px-2 py-5 border-b border-gray-200">
        <div class="flex items-center gap-4">
          <div
            class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <i class="fa-regular fa-file-lines text-2xl text-gray-600"></i>
          </div>
          <span class="text-base font-medium">Terms & Conditions</span>
        </div>
        <a href="/conditions">
          <i class="fa-solid fa-angle-right text-gray-400"></i>
        </a>
      </div>

      <!-- Privacy Policy -->
      <div class="flex items-center justify-between px-2 py-5">
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <i class="fa-solid fa-shield-halved text-2xl text-gray-600"></i>
          </div>
          <span class="text-base font-medium">Privacy Policy</span>
        </div>
        <a href="/privacy">
          <i class="fa-solid fa-angle-right text-gray-400"></i>
        </a>
      </div>
    </div>

    <!-- Logout -->
     <a href="/login">
      <div class="flex items-center  gap-4 h-15 p-7 text-2xl text-red-500 mt-4 ">
      <div
        class="w-10 h-10 rounded-full jus bg-red-100 justify-center items-center flex p-6">
        <i class="fa-solid fa-arrow-right-from-bracket text-xl"></i>
      </div>
      <span class="text-xl items-center justify-center font-medium"
        >Log out</span>
    </div>
     </a>
    <Navbar />
  </div>
</template>
