<template>
  <!-- Bottom Navbar -->
    <div class="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
      <div
        class="relative bg-white shadow-xl h-15 rounded-t-3xl px-6 flex justify-between items-center w-full max-w-md mx-auto">
        <!-- Curve Bulatan Tengah -->
        <div
          class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full z-10 flex items-center justify-center">
          <div
            class="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-md">
            <a href="/team">
            <i class="fa-solid fa-users text-xl"></i></a>
          </div>
        </div>

        <!-- Icons -->
        <div class="flex justify-between items-center w-full">
          <!-- Left 2 -->
            <div class="flex gap-15.5 items-center pl-2">
            <a href="/home" >
              <i class="fa-solid fa-house text-gray-500 text-xl hover:text-blue-600 transition-colors cursor-pointer"></i>
            </a>
            <a href="/leaves">
              <i class="fa-regular fa-calendar text-xl text-gray-500 hover:text-blue-600 transition-colors cursor-pointer"></i>
            </a>
            </div>
      
          <!-- Spacer Tengah -->
          <div class="w-16"></div>

            <!-- Spacer Tengah -->
            <div class="w-16"></div>

            <!-- Right 2 -->
            <div class="flex gap-15.5 items-center pr-2">
            <a href="/holiday">
              <i class="fa-solid fa-umbrella-beach text-xl text-gray-500 hover:text-blue-600 transition-colors cursor-pointer"></i>
            </a>
            <a href="/profile">
              <i class="fa-regular fa-user text-xl text-gray-500 hover:text-blue-600 transition-colors cursor-pointer"></i>
            </a >
            </div>
          </div>
        </div>
      </div>
</template>