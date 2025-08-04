import api from "@/services/api";

export default {
  namespaced: true,
  state: () => ({
    karyawan: null
  }),
  mutations: {
    SET_KARYAWAN(state, data) {
      state.karyawan = data
    }
  },
  actions: {
    async fetchKaryawanById({ commit }, id) {
      try {
        const response = await api.get(`/api/detail-karyawan/${id}`)
        const karyawan = response.data.data
        commit("SET_KARYAWAN", karyawan)
        localStorage.setItem("karyawan", JSON.stringify(karyawan))
      } catch (err) {
        console.error("Gagal ambil data karyawan:", err)
      }
    }

  },
  getters: {
    karyawan: state => state.karyawan
  }
}
