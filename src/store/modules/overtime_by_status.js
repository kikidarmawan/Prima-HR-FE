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
    const key = status.toLowerCase();
    state.overtimeData[key] = data;
    state.overtimeCount[key] = data.length;
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

      const data = response.data?.data || [];
      commit("SET_OVERTIME_DATA", {
        status: status.toLowerCase(),
        data,
      });

 

      return data;
    } catch (error) {
      console.error(`Error fetching ${status} overtime data:`, error);
      throw error;
    }
  },

  async getAllOvertimeData({ dispatch }) {
    try {
      const statuses = ["Pending", "Disetujui", "Ditolak"];
      await Promise.all(statuses.map((s) => dispatch("getOvertimeByStatus", s)));
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

  // Full state
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
