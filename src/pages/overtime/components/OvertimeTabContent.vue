<script setup>
import { computed } from "vue";
import OvertimeTabSelector from "@/pages/overtime/components/OvertimeTabSelector.vue";
import OvertimeCard from "@/pages/overtime/components/OvertimeCard.vue";
import TeamOvertimeCard from "@/pages/overtime/components/TeamOvertimeCard.vue";

const props = defineProps({
  items: { type: Array, default: () => [] },
  team: { type: Array, default: () => [] },
  activeTab: { type: String, default: "pending" },
});
const emit = defineEmits(["update:activeTab"]);

const filteredItems = computed(() =>
  props.items.filter(
    (item) =>
      item.status.toLowerCase() === props.activeTab.toLowerCase()
  )
);
</script>

<template>
  <div class="flex flex-col h-full w-full">
    <!-- Tabs (ikut container putih) -->
    <div class="space-y-3 text-sm">
      <OvertimeTabSelector v-model:activeTab="activeTab" />
    </div>

    <!-- Cards (pisah, scrollable) -->
    <div class="flex-1 overflow-y-auto mt-3 space-y-2 pb-20">
      <!-- My Overtime -->
      <div v-if="activeTab !== 'team'" class="space-y-2">
        <OvertimeCard
          v-for="item in filteredItems"
          :key="item.id"
          :item="item"
        />
      </div>

      <!-- Team Overtime -->
      <div v-else class="space-y-2">
        <TeamOvertimeCard
          v-for="member in team"
          :key="member.id"
          :member="member"
        />
      </div>
    </div>
  </div>
</template>
