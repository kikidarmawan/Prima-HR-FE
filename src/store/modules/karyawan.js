import api from "@/services/api";

export default {
  namespaced: true,
  state: () => ({
    karyawan: null,
  }),
  mutations: {
    SET_KARYAWAN(state, data) {
      state.karyawan = data;
    },
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
        if (karyawan.foto_url) {
          karyawan.foto_url = `${karyawan.foto_url}?t=${Date.now()}`;
        }
        commit("SET_KARYAWAN", karyawan);
        localStorage.setItem("karyawan", JSON.stringify(karyawan));
        return karyawan;
      } catch (err) {
        console.error("Gagal ambil data karyawan:", err.response?.data || err);
        throw err;
      }
    },
    async updateKaryawan({ commit }, { data }) {
      try {
        const token = localStorage.getItem("token");
        console.log("Data yang dikirim ke backend:", data);
        const formData = new FormData();
        Object.keys(data).forEach(key => {
          if (data[key] !== null && data[key] !== undefined) {
            formData.append(key, data[key]);
          }
        });
        
        console.log("FormData yang dikirim:");
        for (let pair of formData.entries()) {
          console.log(pair[0] + ': ', pair[1]);
        }
        
        const response = await api.put(`/api/update-karyawan`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        
        console.log("Response dari update karyawan:", response.data);
        const responseData = response.data;
        const updated = responseData.data || responseData;
        
        if (updated.foto_url) {
          updated.foto_url = `${updated.foto_url}?t=${Date.now()}`;
        }
        
        commit("SET_KARYAWAN", updated);
        localStorage.setItem("karyawan", JSON.stringify(updated));
        return updated;
      } catch (err) {
        console.error("❌ Gagal update karyawan:", err.response?.data || err);
        if (err.response?.data?.errors) {
          console.error("Detail validation errors:", JSON.stringify(err.response.data.errors, null, 2));
        }
        throw err;
      }
    },
    async initKaryawan({ commit }) {
      const stored = localStorage.getItem("karyawan");
      if (stored) {
        commit("SET_KARYAWAN", JSON.parse(stored));
      }
    },
  },
  getters: {
    karyawan: (state) => state.karyawan,
    karyawanId: (state) => state.karyawan?.id || null,
  },
};