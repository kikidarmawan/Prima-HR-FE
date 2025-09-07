import api from "@/services/api";

const state = {
  totalHours: 0,
};

const mutations = {
  SET_TOTAL_HOURS(state, hours) {
    state.totalHours = hours;
  },
};

const actions = {
  async getTotalOvertimeHours({ commit }) {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get(`/api/lembur-count`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

  
      commit("SET_TOTAL_HOURS", response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching total overtime hours:", error);
      throw error;
    }
  },
};

const getters = {
  totalHours: (state) => state.totalHours,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
