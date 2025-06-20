<script setup>
import Oren from "../../assets/images/Oren.jpg";
const notifications = [
  {
    id: 1,
    title: "You update your profile picture",
    message: "You just update your profile picture.",
    time: "Just Now",
    icon: "fa-user",
    type: "profile",
  },
  {
    id: 2,
    title: "Password Changed",
    message: "You’ve completed change the password.",
    time: "April 12, 2023 at 22:22 Pm",
    icon: "fa-lock",
    type: "password",
  },
  {
    id: 3,
    title: "Mark Alen Applied for Leave",
    message: "Please accept my leave request.",
    time: "February 23, 2022 at 21:22 Pm",
    image: Oren,
    type: "leave",
  },
  {
    id: 4,
    title: "System Update",
    message: "Please update to newest app, for get amazing experience.",
    time: "April 15, 2023 at 21:22 Pm",
    icon: "fa-download",
    type: "system",
  },
  {
    id: 5,
    title: "You update your profile picture",
    message: "You just update your profile picture.",
    time: "Just Now",
    icon: "fa-user",
    type: "profile",
  },
  {
    id: 6,
    title: "Password Changed",
    message: "You’ve completed change the password.",
    time: "April 12, 2023 at 22:22 Pm",
    icon: "fa-lock",
    type: "password",
  },
];
</script>

<template>
  <div class="min-h-screen bg-white p-5">
    <!-- Topbar -->
    <div class="flex items-center justify-between mb-5">
      <router-link to="/home" class="text-xl">
        <i class="fa-solid fa-angle-left"></i>
      </router-link>
      <h1 class="text-lg font-semibold">Notification</h1>
      <div class="w-6"></div> 
    </div>

    <!-- Notification List -->
    <div class="space-y-5">
      <div
        v-for="item in notifications"
        :key="item.id"
        class="flex items-start gap-4 border-b border-gray-200 pb-4 mb-4">
        <!-- Icon -->
        <div>
          <template v-if="item.image">
            <img
              :src="item.image"
              alt="avatar"
              class="w-10 h-10 rounded-full object-cover"/>
          </template>
          <template v-else>
            <div
              class="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-500">
              <i :class="['fas', item.icon]"></i>
            </div>
          </template>
        </div>

        <!-- Content -->
        <div class="flex-1">
          <p class="text-sm font-semibold text-gray-900">
            {{ item.title }}
          </p>
          <p class="text-sm text-gray-500">
            {{ item.message }}
          </p>
          <p class="text-xs text-gray-400 mt-1">
            {{ item.time }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

