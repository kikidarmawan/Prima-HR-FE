// store/modules/overtime_by_status.js
import api from "@/services/api";

const state = {
  overtimeData: {
    pending: [],
    disetujui: [],
    ditolak: [],
  },
  overtimeCount: {
    pending: 0,
    disetujui: 0,
    ditolak: 0,
  },
};

const mutations = {
  SET_OVERTIME_DATA(state, { status, data }) {
    state.overtimeData[status] = data;
    state.overtimeCount[status] = data.length;
  },
};

const actions = {
  async getOvertimeByStatus({ commit }, status) {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get(`/api/lembur/${status}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      commit("SET_OVERTIME_DATA", {
        status: status.toLowerCase(),
        data: response.data.data,
      });

      return response.data.data;
    } catch (error) {
      console.error(`Error fetching ${status} overtime data:`, error);
      throw error;
    }
  },

  async getAllOvertimeData({ dispatch }) {
    try {
      await Promise.all([
        dispatch("getOvertimeByStatus", "Pending"),
        dispatch("getOvertimeByStatus", "Disetujui"),
        dispatch("getOvertimeByStatus", "Ditolak"),
      ]);
    } catch (error) {
      console.error("Error fetching all overtime data:", error);
      throw error;
    }
  },
};

const getters = {
  // Data
  pendingOvertime: (state) => state.overtimeData.pending,
  approvedOvertime: (state) => state.overtimeData.disetujui,
  rejectedOvertime: (state) => state.overtimeData.ditolak,

  // Count
  pendingCount: (state) => state.overtimeCount.pending,
  approvedCount: (state) => state.overtimeCount.disetujui,
  rejectedCount: (state) => state.overtimeCount.ditolak,

  overtimeData: (state) => state.overtimeData,
  overtimeCount: (state) => state.overtimeCount,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
