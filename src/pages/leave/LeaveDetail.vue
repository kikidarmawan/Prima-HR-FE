<script setup></script>

<template>
  <div class="min-h-screen bg-white p-6">
    <!-- Header -->
    <div class="flex items-center mb-6">
      <router-link to="/leaves">
        <i class="fa-solid fa-angle-left text-2xl"></i>
      </router-link>
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

   
  </div>
</template>
