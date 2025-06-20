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

      <div class="relative w-full ">
        <select
          id="leaveType"
          class="peer w-full appearance-none border border-blue-500 text-sm text-gray-700 bg-white rounded-lg pt-5 pb-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500  ">
          <option value="">Medical Leave</option>
          <option>Annual Leave</option>
          <option>Emergency Leave</option>
        </select>

        <!-- Floating label -->
        <label
          for="leaveType"
          class="absolute space-y-5 left-3 top-2 text-xs text-blue-500 bg-white px-1 transition-all peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-blue-600 pointer-events-none">
          Leave Type
        </label>
        <!-- Chevron icon -->
        <i
          class="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
      </div>

      <!-- Contact Number -->
      <div class="border border-blue-500 rounded-lg p-2 w-full">
        <label class="text-xs text-blue-500 ">Contact Number</label>
        <input
          type="text"
          placeholder="(+62)"
          class="w-full outline-none"
          v-model="contactNumber"
          @input="onNumberInput"
        />
      </div>

      <div class="space-y-4">
        <!-- Start Date -->
        <!-- Start Date -->
        <div class="border border-blue-500 rounded-lg p-2">
          <label class="text-xs text-blue-500">Start Date</label>
          <input
            type="date"
            class="w-full outline-none pr-2 text-sm text-gray-700"
          />
        </div>

        <!-- End Date -->
        <div class="border border-blue-500 rounded-lg p-2">
          <label class="text-xs text-blue-500">End Date</label>
          <input
            type="date"
            class="w-full outline-none pr-2 text-sm text-gray-700"
          />
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
        class="w-full mt-5 bg-blue-500 text-white cursor-pointer font-semibold py-3 rounded-xl hover:bg-blue-600 transition"
      >
        Apply Leave
      </button>
    </form>

    <!-- Modal -->
    <SuccessLeave v-if="showSuccessLeave" @close="goToHome" />
  </div>
</template>
