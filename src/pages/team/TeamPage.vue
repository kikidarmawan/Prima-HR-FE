<script setup>
import { ref, computed } from "vue";
import SearchBar from "./components/SearchBar.vue";
import TeamMemberCard from "./components/TeamMemberCard.vue";
import AddMemberButton from "./components/AddMemberButton.vue";
import MemberActionModal from "./components/MemberActionModal.vue";
import Navbar from "@/components/Navbar.vue";
import { Icon } from "@iconify/vue";

const search = ref("");

const members = ref([
  {
    id: 1,
    name: "Jane Hawkins",
    email: "janehawkins@demo.com",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE26NjQaonqTRt7BXD_87Iuukitk_kcGBv3w&s",
  },
  {
    id: 2,
    name: "Brooklyn Simmons",
    email: "brooklynsimmons@demo.com",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE26NjQaonqTRt7BXD_87Iuukitk_kcGBv3w&s",
  },
  {
    id: 3,
    name: "Leslie Alexander",
    email: "lesliealexander@demo.com",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE26NjQaonqTRt7BXD_87Iuukitk_kcGBv3w&s",
  },
]);

const filteredMembers = computed(() =>
  members.value.filter((m) =>
    m.name.toLowerCase().includes(search.value.toLowerCase())
  )
);

const selectedMember = ref(null);
const showModal = ref(false);

const openModal = (member) => {
  selectedMember.value = member;
  showModal.value = true;
};

const handleCall = (member) => {
  console.log("Call", member.name);
};

const handleDelete = (member) => {
  console.log("Delete", member.name);
};
</script>

<template>
  <div class="min-h-screen mx-auto overflow-scroll py-6 px-4">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-lg font-semibold">Team Members</h1>
      <button class="text-gray-400 text-xl">
        <Icon icon="mdi:dots-vertical" />
      </button>
    </div>

    <SearchBar v-model="search" />

    <div class="divide-y mt-6">
      <TeamMemberCard
        v-for="member in filteredMembers"
        :key="member.id"
        :name="member.name"
        :email="member.email"
        :avatar="member.avatar"
        @open-options="openModal"
      />

      <AddMemberButton />
      <Navbar />

      <MemberActionModal
        v-model="showModal"
        :member="selectedMember"
        @call="handleCall"
        @delete="handleDelete"
      />
    </div>
  </div>
</template>
