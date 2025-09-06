<template>
    <div class="flex gap-2">
        <router-link
            to="/apply_overtime"
            class="p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm cursor-pointer bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
            <Icon icon="mdi:plus" class="text-base" />
        </router-link>

        <button
            @click="showModal = true"
            class="p-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm cursor-pointer bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
            <Icon icon="mdi:tune-variant" class="text-xl" />
        </button>
    </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
</script>