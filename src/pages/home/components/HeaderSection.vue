<script setup>
import Oren from "@/assets/images/Oren.jpg";

const karyawan = JSON.parse(localStorage.getItem("karyawan"));
const nama = karyawan?.nama_karyawan; 
const jabatan = karyawan?.jabatan.nama_jabatan; 

console.log(karyawan)
console.log(nama, jabatan)
</script>

<template>
  <div class="flex justify-between items-center p-5 gap-5 w-full">
    <div class="flex items-center gap-5">
      <img :src="Oren" class="rounded-full w-[52px] h-[52px] object-cover" />
      <div>
        <h1 class="text-xl font-semibold text-gray-900 dark:text-white">
          {{ nama }}
        </h1>
        <p class="text-black text-xs dark:text-gray-300">
          {{ jabatan }}
        </p>
      </div>
    </div>

    <div class="ml-auto">
      <router-link to="/notif">
        <div
          class="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 shadow-sm bg-white dark:bg-gray-800"
        >
          <i class="fa-regular fa-bell text-lg text-gray-700 dark:text-gray-300"></i>
        </div>
      </router-link>
    </div>
  </div>
</template>
