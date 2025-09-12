import api from "@/services/api";

export default {
  namespaced: true,
  state: () => ({
    karyawan: null
  }),
  mutations: {
    SET_KARYAWAN(state, data) {
      state.karyawan = data;
    }
  },
  actions: {
    async fetchKaryawanById({ commit }) {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get(`/api/detail-karyawan`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const karyawan = response.data.data;
        commit("SET_KARYAWAN", karyawan);
        localStorage.setItem("karyawan", JSON.stringify(karyawan));
      } catch (err) {
        console.error("Gagal ambil data karyawan:", err.response?.data || err);
      }
    },

  async updateKaryawan({ commit }, { data }) {
  try {
    const token = localStorage.getItem("token");
    let headers = { Authorization: `Bearer ${token}` };

    if (data instanceof FormData) {
      headers["Content-Type"] = "multipart/form-data";
    } else {
      headers["Accept"] = "application/json";
    }

    // gunakan PUT bukan POST
    const response = await api.put(`/api/update-karyawan`, data, {
      headers,
    });

    const updated = response.data.data;
    commit("SET_KARYAWAN", updated);
    localStorage.setItem("karyawan", JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error("Gagal update karyawan:", err.response?.data || err);
    throw err;
  }
},


    async initKaryawan({ commit }) {
      const stored = localStorage.getItem("karyawan");
      if (stored) {
        commit("SET_KARYAWAN", JSON.parse(stored));
      }
    }
  },
  getters: {
    karyawan: (state) => state.karyawan,
    karyawanId: (state) => state.karyawan?.id || null
  }
}
