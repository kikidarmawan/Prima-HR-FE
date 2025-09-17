<script setup>
import Item from './Item.vue'

const props = defineProps({
  data: Object
})
</script>

<template>
  <div class="space-y-4 px-4" v-if="data">
    <Item label="Name" :value="data.nama_karyawan" />
    <Item label="Gender" :value="data.jk" />
    <Item label="Email" :value="data.email" />
    <Item label="Phone Number" :value="data.no_hp" />
    <Item label="Address" :value="data.alamat" />
    <Item label="Place, Date of Birth" :value="`${data.tmp_lahir}, ${data.tgl_lahir}`" />
  </div>
</template>
