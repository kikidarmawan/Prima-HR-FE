<template>
  <div class="min-h-screen bg-white dark:bg-black px-4 py-6 transition-colors duration-300">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <router-link to="/profile" class="text-2xl text-gray-700 dark:text-white">
        <i class="fa-solid fa-angle-left"></i>
      </router-link>
      <h1 class="text-xl font-semibold text-gray-800 dark:text-white">
        Terms & Conditions
      </h1>
      <div class="w-6"></div>
    </div>

    <!-- Last update -->
    <p class="text-xs text-gray-400 dark:text-gray-500 mb-2">
      Last update: 05/02/2023
    </p>

    <!-- Intro -->
    <p class="text-base font-semibold text-gray-600 dark:text-gray-300 mb-4">
      Please read these terms of service, carefully before using our app operated by us.
    </p>

    <!-- Section Title -->
    <p class="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
      Conditions of Uses
    </p>

    <!-- Paragraph Content -->
    <p class="text-base text-gray-800 dark:text-gray-200 leading-relaxed">
      It is a long established fact that a reader will be distracted by the readable content of a page
      when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
      distribution of letters, as opposed to using 'Content here, content here', making it look like
      readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their
      default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
      Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected
      humour and the like).
    </p>
  </div>
</template>
