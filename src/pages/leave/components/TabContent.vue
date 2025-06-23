<template>
  <div class="space-y-4 mt-3 transition-colors duration-300">
    <!-- Kalau data kosong -->
    <p
      v-if="!data || data.length === 0"
      class="text-gray-500 dark:text-gray-400 text-center italic">
      No records for "{{ activeTab }}"
    </p>

    <!-- Kalau ada data -->
    <div v-else>
      <!-- Upcoming & Past -->
      <div v-if="activeTab !== 'Team Leave'" class="space-y-3">
        <CheckCard
          v-for="item in data"
          :key="item.id"
          :item="item"
        />
      </div>

      <!-- Team Leave -->
      <div v-else class="space-y-3">
        <TeamLeaveCard
          v-for="item in data"
          :key="item.id"
          :item="item"
          @action="emitCardAction"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import CheckCard from "./CheckCard.vue";
import TeamLeaveCard from "./TeamLeaveCard.vue";

const props = defineProps({
  activeTab: String,
  data: { type: Array, default: () => [] },
});

const emit = defineEmits(["card-action"]);

function emitCardAction(payload) {
  emit("card-action", payload);
}
</script>


