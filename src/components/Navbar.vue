<template>
    <!-- navbar -->
    <div class="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
      <div
        class="relative bg-white shadow-xl h-15 rounded-t-3xl px-6 flex justify-between items-center w-full max-w-md mx-auto"
      >
        <!-- Curve Bulatan Tengah -->
        <div
          class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full z-10 flex items-center justify-center"
        >
          <div
            class="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-md"
          >
          <router-link to="/team">
          <i class="fa-solid fa-users text-xl cursor-pointer"></i>
          </router-link>
            
          </div>
        </div>

        <!-- Icons -->
        <div class="flex justify-between items-center w-full">
          <!-- Left 2 -->
          <div class="flex gap-18 items-center pl-2">
            <router-link to="/home">
              <i
                class="fa-solid fa-house text-gray-500 text-xl hover:text-blue-600 transition-colors cursor-pointer"
              ></i>
            </router-link>
            <router-link to="/leaves">
              <i
                class="fa-regular fa-calendar text-xl text-gray-500 hover:text-blue-600 transition-colors cursor-pointer"
              ></i>
            </router-link>
          </div>

          <!-- Spacer Tengah -->
          <div class="w-16"></div>

          <!-- Right 2 -->
          <div class="flex gap-18 items-center pr-2">
            <router-link to="/">
              <i
                class="fa-solid fa-umbrella-beach text-xl text-gray-500 hover:text-blue-600 transition-colors cursor-pointer"
              ></i>
            </router-link>
            <router-link to="/">
              <i
                class="fa-regular fa-user text-xl text-gray-500 hover:text-blue-600 transition-colors cursor-pointer"
              ></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
</template>