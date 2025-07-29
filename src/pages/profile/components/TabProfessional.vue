<script setup>
import Item from './Item.vue'

const props = defineProps({
  data: Object
})

console.log("PROPS PROFESSIONAL TAB:", props.data)
</script>

<template>
  <div class="space-y-4 px-4" v-if="data">
    <Item label="Jabatan" :value="data.jabatan?.nama_jabatan ?? '-'" />
    <Item label="Divisi ID" :value="data.jabatan?.divisi_id ?? '-'" />
    <Item label="Tanggal Masuk" :value="data.tgl_masuk ?? '-'" />
    <Item label="Status Karyawan" :value="data.status ?? '-'" />
    <Item label="Pendidikan Terakhir" :value="data.pendidikan_terkhir ?? '-'" />
    <!-- Tambah data lainnya sesuai kebutuhan -->
  </div>
</template>
