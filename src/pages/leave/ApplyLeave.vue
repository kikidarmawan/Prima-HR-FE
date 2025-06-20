<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import SuccessLeave from "@/components/SuccessLeave.vue";

const router = useRouter();
const showSuccessLeave = ref(false);

const applyLeave = (e) => {
  e.preventDefault();

  showSuccessLeave.value = true;
};

const goToHome = () => {
  router.push("/leaves");
};

const contactNumber = ref("");

const onNumberInput = (e) => {
  // Hanya izinkan angka
  contactNumber.value = e.target.value.replace(/\D/g, "");
};
</script>

<template>
  <div class="min-h-screen bg-white p-6">
    <!-- Header -->
    <div class="flex items-center mb-6">
      <router-link to="/leaves">
        <i class="fa-solid fa-angle-left text-2xl"></i>
      </router-link>
      <h1 class="ml-6 text-xl font-semibold">Apply Leave</h1>
    </div>

    <form class="space-y-4" @submit.prevent="applyLeave">
      <!-- Title -->
      <div class="border border-blue-500 rounded-lg p-2">
        <label class="text-xs text-blue-500">Title</label>
        <input
          type="text"
          placeholder="Sick Leave"
          class="w-full outline-none"
        />
      </div>

      <!-- Leave Type -->
      <div class="border border-blue-500 rounded-lg p-2">
        <label class="text-xs text-blue-500">Leave Type</label>
        <div class="relative">
          <select class="w-full appearance-none outline-none pr-8">
            <option>Medical Leave</option>
            <option>Annual Leave</option>
            <option>Emergency Leave</option>
          </select>
          <i
            class="fa-solid fa-chevron-down absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          ></i>
        </div>
      </div>

      <!-- Contact Number -->
      <div class="border border-blue-500 rounded-lg p-2 w-full">
        <label class="text-xs text-blue-500">Contact Number</label>
        <input
          type="text"
          placeholder="(+62)"
          class="w-full outline-none"
          v-model="contactNumber"
          @input="onNumberInput"
        />
      </div>

      <!-- Start Date -->
      <div class="border border-blue-500 rounded-lg p-2">
        <label class="text-xs text-blue-500">Start Date</label>
        <div>
          <input type="date" class="w-full outline-none pr-8" />
        </div>
      </div>

      <!-- End Date -->
      <div class="border border-blue-500 rounded-lg p-2">
        <label class="text-xs text-blue-500">End Date</label>
        <div class="relative">
          <input type="date" class="w-full outline-none pr-8 appearance-none" />
        </div>
      </div>

      <!-- Reason for leave -->
      <div class="border border-blue-500 rounded-lg w-full p-2">
        <label class="text-xs text-blue-500">Reason for Leave</label>
        <textarea
          rows="3"
          placeholder="I need to take a medical leave."
          class="w-full outline-none resize-none"
        ></textarea>
      </div>

      <!-- Button apply -->
      <button
        type="submit"
        class="w-full mt-5 bg-blue-500 text-white cursor-pointer font-semibold py-3 rounded-xl hover:bg-blue-600 transition">
        Apply Leave
      </button>
    </form>

    <!-- Modal -->
    <SuccessLeave v-if="showSuccessLeave" @close="goToHome" />
  </div>
</template>
