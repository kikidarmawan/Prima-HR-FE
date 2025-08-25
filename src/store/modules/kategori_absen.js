import api from "@/services/api";

const state = {
  kategoriAbsensi: [],
  loading: false,
  error: null,
};

const mutations = {
  SET_KATEGORI_ABSENSI(state, data) {
    state.kategoriAbsensi = data;
  },
  SET_LOADING(state, status) {
    state.loading = status;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  CLEAR_ERROR(state) {
    state.error = null;
  },
};

const actions = {
  async fetchKategoriAbsensi({ commit }) {
    try {
      commit("SET_LOADING", true);
      commit("CLEAR_ERROR");

      const response = await api.get("/api/kategori-absensi");
      // console.log("Response kategori absensi:", response.data);

      // Sesuaikan dengan struktur response API Anda
      // Contoh jika response langsung array:
      commit("SET_KATEGORI_ABSENSI", response.data.data);

      // Atau jika response memiliki format { data: [...] }
      // commit('SET_KATEGORI_ABSENSI', response.data.data);
      return response.data;
    } catch (error) {
      let errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message;
      commit("SET_ERROR", errorMessage);
      throw error;
    } finally {
      commit("SET_LOADING", false);
    }
  },
};

const getters = {
  allKategoriAbsensi: (state) => state.kategoriAbsensi,
  isLoading: (state) => state.loading,
  error: (state) => state.error,
  // Optional: getter untuk mencari kategori by id
  getKategoriById: (state) => (id) => {
    return state.kategoriAbsensi.find((kategori) => kategori.id === id);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
