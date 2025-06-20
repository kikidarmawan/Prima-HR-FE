<!-- src/pages/holiday/HolidayPage.vue -->
<template>
  <div class="p-5 bg-gray-50">
    
    <div style="overflow-y: auto;">
    <h1 class="text-xl font-bold mb-5">Holiday List</h1>

    <HolidayList
      date="January 26, 2023"
      day="Thursday"
      name="Republic Day"
    />
    <HolidayList
      date="March 08, 2023"
      day="Friday"
      name="Holi"
    />
    <HolidayList
      date="August 15, 2023"
      day="Tuesday"
      name="Independence Day"
      :highlight="true"
    />
      <HolidayList
        date="August 30, 2023"
        day="Wednesday"
        name="Raksha Bandhan"
        :highlight="true"
      />
      <HolidayList
        date="September 07, 2023"
        day="Thursday"
        name="Janmashtami"
        :highlight="true"
      />
      <HolidayList
        date="November 12, 2023"
        day="Sunday"
        name="Diwali"
      />
    <HolidayList
      date="September 07, 2023"
      day="Thursday"
      name="Janmashtami"
      :highlight="true"
    />
    <HolidayList
      date="November 12, 2023"
      day="Sunday"
      name="Diwali"
    />
    </div>

    <Navbar />
  </div>
</template>

<script setup>
import HolidayList from './components/HolidayList.vue'
import Navbar from '@/components/Navbar.vue'
</script>
