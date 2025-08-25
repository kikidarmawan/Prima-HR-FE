<script>
import { mapState } from "vuex";

export default {
  name: "TodayShift",
  props: {
    selectedDate: { type: Object, default: null }, // 👈 dates[selectedIndex] dikirim dari parent
  },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapState("shift", ["shift"]),
  },
  watch: {
    // kalau props.selectedDate berubah, fetch lagi
    async selectedDate(newDate) {
      if (newDate?.raw) {
        await this.fetchShift(newDate.raw);
      }
    },
  },
  methods: {
    async fetchShift(dateObj) {
      try {
        let userId = this.$store.getters["auth/userId"];
        if (!userId) {
          const karyawan = JSON.parse(localStorage.getItem("karyawan"));
          userId = karyawan?.user_id;
        }
        if (!userId) {
          this.$router.push("/login");
          return;
        }

        await this.$store.dispatch("karyawan/fetchKaryawanById", userId);
        const karyawanId = this.$store.getters["karyawan/karyawanId"];
        if (!karyawanId) throw new Error("Id karyawan tidak ditemukan");

        // tanggal dari props (misalnya "2025-08-19")
        const tanggal = dateObj.tanggal || dateObj.fullDate;

        await this.$store.dispatch("shift/fetchShiftByDate", {
          tanggal,
          karyawan_id: karyawanId,
        });
      } catch (err) {
        console.error("Gagal ambil shift:", err);
      } finally {
        this.loading = false;
      }
    },
  },
  async mounted() {
    // pertama kali ambil shift untuk hari ini
    if (this.selectedDate?.raw) {
      await this.fetchShift(this.selectedDate.raw);
    }
  },
};
</script>

<template>
  <div v-if="!loading">
    <h3>Shift Hari Ini</h3>
    <p>Jam Masuk: {{ shift?.jam_masuk || '-' }}</p>
    <p>Jam Pulang: {{ shift?.jam_pulang || '-' }}</p>
  </div>
</template>
