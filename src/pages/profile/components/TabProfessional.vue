<script setup>
import Item from './Item.vue'

const props = defineProps({
  data: Object
})
</script>

<template>
  <div class="space-y-4 px-4" v-if="data">
    <Item label="Position" :value="data.jabatan?.nama_jabatan ?? '-'" />
    <Item label="Division ID" :value="data.jabatan?.divisi_id ?? '-'" />
    <Item label="Date Joined" :value="data.tgl_masuk ?? '-'" />
    <Item label="Employment Status" :value="data.status ?? '-'" />
    <Item label="Last Education" :value="data.pendidikan_terkhir ?? '-'" />
  </div>
</template>
