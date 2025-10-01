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

    // 🔍 Debug log biar kelihatan isi response sebenarnya
    console.log("API detail-karyawan response:", response.data);

    const karyawan = response.data?.data;

    if (!karyawan) {
      console.warn("⚠️ Data karyawan kosong dari API");
      commit("SET_KARYAWAN", null);
      return null;
    }

    if (karyawan.foto_url) {
      karyawan.foto_url = `${karyawan.foto_url}?t=${Date.now()}`;
    }

    commit("SET_KARYAWAN", karyawan);
    localStorage.setItem("karyawan", JSON.stringify(karyawan));
    return karyawan;
  } catch (err) {
    console.error("❌ Gagal ambil data karyawan:", err.response?.data || err);
    throw err;
  }
},


    // Satu updateKaryawan saja, handle JSON & FormData
    async updateKaryawan({ commit }, { data }) {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        if (data instanceof FormData) {
          headers["Content-Type"] = "multipart/form-data";
        } else {
          headers["Content-Type"] = "application/json";
        }

        const response = await api.put(`/api/update-karyawan`, data, { headers });
        const updated = response.data.data || response.data;

        // Cache-busting foto
        if (updated.foto_url) {
          updated.foto_url = `${import.meta.env.VITE_API_URL}/${updated.foto_url}?t=${Date.now()}`;
        }

        commit("SET_KARYAWAN", updated);
        localStorage.setItem("karyawan", JSON.stringify(updated));
        return updated;
      } catch (err) {
        console.error("❌ Gagal update karyawan:", err.response?.data || err);
        if (err.response?.data?.errors) {
          console.error(
            "Detail validation errors:",
            JSON.stringify(err.response.data.errors, null, 2)
          );
        }
        throw err;
      }
    },

    async initKaryawan({ commit }) {
  try {
    const stored = localStorage.getItem("karyawan");
    if (stored && stored !== "undefined" && stored !== "null") {
      commit("SET_KARYAWAN", JSON.parse(stored));
    }
  } catch (e) {
    console.warn("❌ Gagal parse karyawan dari localStorage:", e);
    localStorage.removeItem("karyawan");
  }
}
,
  },
  getters: {
    karyawan: (state) => state.karyawan,
    karyawanId: (state) => state.karyawan?.id || null,
  },
};
