import api from "@/services/api";

export default {
  namespaced: true,
  state: () => ({
    holidays: [],
  }),
  mutations: {
    setHolidays(state, holidays) {
      state.holidays = holidays;
    },
  },
  actions: {
    async fetchHolidays({ commit }) {
      try {
        const response = await api.get("/api/holiday");
        const data = response.data.data || [];
        const updated = data.map((item) => ({
          //updated
          ...item,
          highlight: true,
        }));
        commit("setHolidays", updated);
      } catch (error) {
        console.error("Error fetching holidays from API:", error);
      }
    },
  },
};
