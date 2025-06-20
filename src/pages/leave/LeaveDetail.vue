<script setup></script>

<template>
  <div class="min-h-screen bg-white p-6">
    <!-- Header -->
    <div class="flex items-center mb-6">
      <a href="/leaves">
        <i class="fa-solid fa-angle-left text-2xl"></i>
      </a>
      <h1 class="ml-6 text-xl font-semibold">Leave Details</h1>
    </div>

    <!-- Content -->
    <div class="divide-y divide-gray-200 text-sm text-gray-800">
      <div class="py-1">
        <p class="text-gray-400 mb-1">Title</p>
        <p class="text-lg font-semibold">Sick Leave</p>
      </div>
      <div class="py-1">
        <p class="text-gray-400 mb-1">Leave Type</p>
        <p class="text-lg font-semibold">Medical Leave</p>
      </div>
      <div class="py-1">
        <p class="text-gray-400 mb-1">Date</p>
        <p class="text-lg font-semibold">April 15, 2023 - April 18, 2023</p>
      </div>
      <div class="py-1">
        <p class="text-gray-400 mb-1">Reason</p>
        <p class="text-lg font-semibold">I need to take a medical leave.</p>
      </div>
      <div class="py-1">
        <p class="text-gray-400 mb-1">Applied on</p>
        <p class="text-lg font-semibold">February 20, 2023</p>
      </div>
      <div class="py-1">
        <p class="text-gray-400 mb-1">Contact Number</p>
        <p class="text-lg font-semibold">(603) 555-0123</p>
      </div>
      <div class="py-1">
        <p class="text-gray-400 mb-1">Status</p>
        <p class="text-lg font-semibold">Pending</p>
      </div>
      <div class="py-1">
        <p class="text-gray-400 mb-1">Approved By</p>
        <p class="text-lg font-semibold">Michael Mitc</p>
      </div>
    </div>

    <!-- Buttons -->
    <div class="flex justify-between mt-10">
      <button
        class="flex-1 bg-red-500 text-white font-semibold py-3 rounded-xl mr-2 flex items-center justify-center gap-2 hover:bg-red-600 transition">
        <div class="w-8 h-8 rounded-full border border-white flex items-center justify-center">
            <i class="fa-solid fa-xmark text-white text-base"></i>
        </div>
        Reject
      </button>
      <a href="/leaves"
        class="flex-1 bg-emerald-500 text-white font-semibold py-3 rounded-xl ml-2 flex items-center justify-center gap-2 hover:bg-emerald-600 transition">
        <div
          class="w-8 h-8 rounded-full border border-white flex items-center justify-center">
          <i class="fa-solid fa-check text-white text-base "></i>
        </div>
        Accept
      </a>
    </div>
  </div>
</template>
