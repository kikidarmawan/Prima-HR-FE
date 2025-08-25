<template>
  <!-- Your Activity -->
    <div class="p-5">
      <h1 class="font-semibold flex justify-between">
        Your Activity <span class="text-blue-500 cursor-pointer">View All</span>
      </h1>

      <div class="space-y-3 mt-3">
        <div
          class="bg-white dark:bg-gray-800 w-full p-4 rounded-2xl shadow-sm flex justify-between items-center"
        >
          <div class="flex items-center gap-3">
            <div
              class="bg-blue-100 dark:bg-blue-900 w-8 h-8 flex items-center justify-center rounded-md"
            >
              <i class="fa-solid text-sm fa-arrow-right text-[#4893fc]"></i>
            </div>
            <div>
              <h2 class="text-sm font-medium text-gray-800 dark:text-white">
                Check In
              </h2>
              <p class="text-xs text-gray-400 dark:text-gray-300">
                April 17, 2023
              </p>
            </div>
          </div>
          <div class="text-right">
            <h1 class="text-base font-bold text-gray-900 dark:text-white">
              10:00 <span class="lowercase">am</span>
            </h1>
            <p class="text-sm text-gray-500 dark:text-gray-400">On Time</p>
          </div>
        </div>

        <div
          class="bg-white dark:bg-gray-800 w-full p-4 rounded-2xl shadow-sm flex justify-between items-center"
        >
          <div class="flex items-center gap-3">
            <div
              class="bg-blue-100 dark:bg-blue-900 w-8 h-8 flex items-center justify-center rounded-md"
            >
              <i class="fa-solid text-xs fa-mug-saucer text-[#4893fc]"></i>
            </div>
            <div>
              <h2 class="text-sm font-medium text-gray-800 dark:text-white">
                Break In
              </h2>
              <p class="text-xs text-gray-400 dark:text-gray-300">
                April 17, 2023
              </p>
            </div>
          </div>
          <div class="text-right">
            <h1 class="text-base font-bold text-gray-900 dark:text-white">
              12:30 <span class="lowercase">pm</span>
            </h1>
            <p class="text-sm text-gray-500 dark:text-gray-400">On Time</p>
          </div>
        </div>
      </div>
    </div>
</template>
