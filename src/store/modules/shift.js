import api from "@/services/api";

const state = {
  shift: null,
};

const mutations = {
  SET_SHIFT(state, shift) {
    state.shift = shift;
  },
};

const actions = {
  async fetchShiftByDate({ commit }, { tanggal, karyawan_id }) {
  try {
    const res = await api.get(`/api/get-shift-karyawan/${karyawan_id}`);
    console.log("Response API shift:", res.data);

    let shiftHariIni = null;

    if (res.data?.data?.bulan_ini) {
      shiftHariIni = res.data.data.bulan_ini.find(
        (s) => s.tanggal === tanggal
      );
      console.log("Cari shift untuk tanggal:", tanggal, "->", shiftHariIni);
    }

    commit("SET_SHIFT", shiftHariIni || null);
  } catch (error) {
    commit("SET_SHIFT", null);
    console.error("Gagal ambil shift:", error);
    throw error;
  }
},
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
