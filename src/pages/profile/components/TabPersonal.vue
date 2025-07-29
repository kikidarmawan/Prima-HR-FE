<script setup>
import Item from './Item.vue'

const props = defineProps({
  data: Object
})

console.log("PROPS PERSONAL TAB:", props.data)
</script>

<template>
  <div class="space-y-4 px-4" v-if="data">
    <Item label="Nama" :value="data.nama_karyawan" />
    <Item label="Jenis Kelamin" :value="data.jk" />
    <Item label="Email" :value="data.email" />
    <Item label="Nomor HP" :value="data.no_hp" />
    <Item label="Alamat" :value="data.alamat" />
    <Item label="Tempat, Tanggal Lahir" :value="`${data.tmp_lahir}, ${data.tgl_lahir}`" />
  </div>
</template>
