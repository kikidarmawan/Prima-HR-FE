import api from "@/services/api";

export default {
  namespaced: true,
  state: {
    kalender: [],
    loading: false,
    error: null,
  },
  mutations: {
    SET_KALENDER(state, data) {
      state.kalender = data;
    },
    SET_LOADING(state, status) {
      state.loading = status;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
  },
  actions: {
    async fetchKalender({ commit }) {
      commit("SET_LOADING", true);
      try {
        const res = await api.get("/api/kalender-presensi");
        const mapped = res.data.data.map((item) => {
          const [year, month, day] = item.tanggal.split("-");
          return {
            day: day,
            weekday: item.hari,
            isWeekend: item.is_weekend,
            raw: item
          };
        });
        commit("SET_KALENDER", mapped);
      } catch (err) {
        commit("SET_ERROR", err);
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
  getters: {
    getKalender: (state) => state.kalender,
  },
};
