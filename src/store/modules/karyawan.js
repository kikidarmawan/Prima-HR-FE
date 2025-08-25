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
    async fetchKaryawanById({ commit }, user_id) {
      try {
        // Perbaiki endpoint: gunakan user_id sebagai parameter
        const response = await api.get(`/api/detail-karyawan/${user_id}`);
        const karyawan = response.data.data;
        commit("SET_KARYAWAN", karyawan);
        localStorage.setItem("karyawan", JSON.stringify(karyawan));
      } catch (err) {
        console.error("Gagal ambil data karyawan:", err);
      }
    },

    async updateKaryawan({ commit, state }, { id, data }) {
      try {
        // Jika data adalah FormData (upload foto), langsung kirim
        let payload = data;
        let headers = { "Accept": "application/json" };

        // Jika bukan FormData, merge dengan data lama
        if (!(data instanceof FormData)) {
          let currentKaryawan = state.karyawan;
          if (!currentKaryawan) {
            const storedKaryawan = localStorage.getItem("karyawan");
            if (storedKaryawan) {
              currentKaryawan = JSON.parse(storedKaryawan);
            }
          }
          if (!currentKaryawan) {
            await this.dispatch('karyawan/fetchKaryawanById', id);
            currentKaryawan = state.karyawan;
          }

          payload = {
            jam_kerja_id: data.jam_kerja_id ?? currentKaryawan.jam_kerja_id,
            nama_karyawan: data.nama_karyawan ?? currentKaryawan.nama_karyawan,
            no_hp: data.no_hp ?? currentKaryawan.no_hp,
            manager: data.manager ?? currentKaryawan.manager,
            email: data.email ?? currentKaryawan.email,
            tgl_lahir: data.tgl_lahir ?? currentKaryawan.tgl_lahir,
            tmp_lahir: data.tmp_lahir ?? currentKaryawan.tmp_lahir,
            jk: data.jk ?? currentKaryawan.jk,
            pendidikan_terkhir: data.pendidikan_terkhir ?? currentKaryawan.pendidikan_terkhir,
            status: data.status ?? currentKaryawan.status,
            alamat: data.alamat ?? currentKaryawan.alamat,
            jabatan_id: data.jabatan_id ?? currentKaryawan.jabatan_id,
            foto: data.foto ?? undefined
          };

          Object.keys(payload).forEach(key => {
            if (payload[key] === undefined) {
              delete payload[key];
            }
          });
        } else {
          // Jika FormData, set header untuk upload file
          headers["Content-Type"] = "multipart/form-data";
        }

        const response = await api.put(`/api/update-karyawan/${id}`, payload, { headers });
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