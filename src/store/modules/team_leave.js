import api from "@/services/api";
import store from "@/store";

const state = {
  teamLeave: [],
  loading: false,
  error: null,
};

const mutations = {
  SET_TEAM_LEAVE(state, data) {
    state.teamLeave = data;
  },
  SET_LOADING(state, status) {
    state.loading = status;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
};

const actions = {
  // ambil data leave untuk tim manager yang login
  async getTeamLeaveData({ commit }) {
    commit("SET_LOADING", true);
    commit("SET_ERROR", null);

    try {
      const res = await api.get("/api/absensi-manager");

      const mapped = res.data.data.map((item) => {
        return {
          ...item,
          name: item.karyawan?.name,
          date: item.tanggal,
          karyawan_id: item.karyawan_id,
        };
      });

      commit("SET_TEAM_LEAVE", mapped);
    } catch (err) {
      console.error("Failed to fetch team leave:", err);
      commit("SET_ERROR", err.message);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  // update status (accept / reject)
  async updateLeaveStatus({ dispatch }, { item, status }) {
    try {
      const payload = {
        tanggal: item.date,
        karyawan_id: item.karyawan_id,
        status: status,
        alasan_ditolak: status === "Ditolak" ? "Alasan ditolak" : null,
      };
      await api.put(`/api/update-absensi-status/${item.id}`, payload);

      // refresh data
      await dispatch("getTeamLeaveData");
    } catch (err) {
      console.error("=== Update Failed ===");
      console.error("Error Response:", err.response?.data || err.message);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
