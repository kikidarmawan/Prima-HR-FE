import axios from "axios";

export default {
  namespaced: true,
  state: () => ({
    detail: null,
  }),
  mutations: {
    setDetail(state, detail) {
      state.detail = detail;
    },
  },
  actions: {
    async fetchDetail({ commit }, id) {
      try {
        const response = await axios.get(
          `https://sunbeam-proper-pipefish.ngrok-free.app/api/detail-karyawan/${id}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          }
        );

        // console.log(response);
        commit("setDetail", response.data.data);
      } catch (error) {
        console.error("Error fetching detail karyawan:", error);
      }
    },
  },
  getters: {
    detail: (state) => state.detail,
  },
};
