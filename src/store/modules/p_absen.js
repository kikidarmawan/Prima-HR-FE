import api from "@/services/api";

const state = {
  pengajuanResponse: null,
};

const mutations = {
  SET_PENGAJUAN_RESPONSE(state, payload) {
    state.pengajuanResponse = payload;
  },
};

const actions = {
  async ajukanAbsen({ commit }, payload) {
    try {
      const response = await api.post("/api/p-absen", {
        karyawan_id: payload.karyawan_id,
        tanggal: payload.tanggal,
        kategori_absensi_id: parseInt(payload.kategori_absensi_id),
        keterangan: payload.keterangan,
      });

      commit("SET_PENGAJUAN_RESPONSE", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Gagal mengajukan absen:",
        error.response?.data || error.message
      );
      throw error;
    }
  },
};

const getters = {
  pengajuanResponse: (state) => state.pengajuanResponse,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
