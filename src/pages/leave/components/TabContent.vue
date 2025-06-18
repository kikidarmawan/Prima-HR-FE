<template>
  <div class="space-y-4 mt-3">
    <p v-if="!data || data.length === 0" class="text-gray-500 text-center">
      No records for "{{ activeTab }}"
    </p>

    <div v-else>
      <!-- Upcoming & Past dengan CheckCard-->
      <div v-if="activeTab !== 'Team Leave'" class="space-y-3">
        <CheckCard
          v-for="item in data"
          :key="item.id"
          :item="item"
        />
      </div>
      <!-- Team Leave dengan TeamLeaveCard -->
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
import CheckCard from './CheckCard.vue'
import TeamLeaveCard from './TeamLeaveCard.vue'

const props = defineProps({
  activeTab: String,
  data: { type: Array, default: () => [] },
})
const emit = defineEmits(['card-action'])
function emitCardAction(payload) {
  emit('card-action', payload)
}
</script>
