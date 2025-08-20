import api from "@/services/api";

const state = {
  absensiData: {
    pending: [],
    disetujui: [],
    ditolak: [],
  },
  absensiCount: {
    pending: 0,
    disetujui: 0,
    ditolak: 0,
  },
};

const mutations = {
  SET_ABSENSI_DATA(state, { status, data }) {
    state.absensiData[status.toLowerCase()] = data;
    state.absensiCount[status.toLowerCase()] = data.length;
  },
};

const actions = {
  async getAbsensiByStatus({ commit }, status) {
    try {
      const response = await api.get(`/api/absensi/${status}`);

      commit("SET_ABSENSI_DATA", {
        status: status.toLowerCase(),
        data: response.data.data, // Asumsi response format { data: [...] }
      });

      return response.data.data;
    } catch (error) {
      console.error(`Error fetching ${status} data:`, error);
      throw error;
    }
  },

  async getAllAbsensiData({ dispatch }) {
    try {
      await Promise.all([
        dispatch("getAbsensiByStatus", "Pending"),
        dispatch("getAbsensiByStatus", "Disetujui"),
        dispatch("getAbsensiByStatus", "Ditolak"),
      ]);
    } catch (error) {
      console.error("Error fetching all data:", error);
      throw error;
    }
  },
};

const getters = {
  // Getter untuk data lengkap
  pendingData: (state) => state.absensiData.pending,
  approvedData: (state) => state.absensiData.disetujui,
  rejectedData: (state) => state.absensiData.ditolak,

  // Getter untuk count
  pendingCount: (state) => state.absensiCount.pending,
  approvedCount: (state) => state.absensiCount.disetujui,
  rejectedCount: (state) => state.absensiCount.ditolak,

  
  absensiData: (state) => state.absensiData,
  absensiCount: (state) => state.absensiCount,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
