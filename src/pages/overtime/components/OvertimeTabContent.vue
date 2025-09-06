<script setup>
import { ref, computed } from "vue";
import OvertimeTabSelector from "@/pages/overtime/components/OvertimeTabSelector.vue";
import OvertimeCard from "@/pages/overtime/components/OvertimeCard.vue";
import TeamOvertimeCard from "@/pages/overtime/components/TeamOvertimeCard.vue";

const props = defineProps({
  items: { type: Array, default: () => [] },
  team: { type: Array, default: () => [] },
});

const activeTab = ref("pending");

const filteredItems = computed(() =>
  props.items.filter(item => item.status.toLowerCase() === activeTab.value)
);
</script>

<template>
  <div class="space-y-3 text-sm">
    <!-- Tabs -->
    <OvertimeTabSelector v-model:activeTab="activeTab" class="scale-100" />

    <!-- My Overtime -->
    <div v-if="activeTab !== 'team'" class="space-y-2">
      <OvertimeCard
        v-for="item in filteredItems"
        :key="item.id"
        :item="item"
        class="scale-95"
      />
    </div>

    <!-- Team Overtime -->
    <div v-else class="space-y-2">
      <TeamOvertimeCard
        v-for="member in team"
        :key="member.id"
        :member="member"
        class="scale-95"
      />
    </div>
  </div>
</template>
