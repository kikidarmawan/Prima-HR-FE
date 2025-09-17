import api from "@/services/api";

export default {
  namespaced: true,

  state: () => ({
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
    karyawan: JSON.parse(localStorage.getItem("karyawan")) || null,
    errorMessage: null,
    isLoggedIn: !!localStorage.getItem("token"),
  }),

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      state.isLoggedIn = !!token;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_KARYAWAN(state, karyawan) {
      state.karyawan = karyawan;
    },
    SET_ERROR(state, error) {
      state.errorMessage = error;
    },
    LOGOUT(state) {
      state.token = null;
      state.user = null;
      state.karyawan = null;
      state.isLoggedIn = false;
      state.errorMessage = null;
    },
  },

  actions: {
    async login({ commit }, { username, password }) {
      try {
        const { data } = await api.post("/api/login", { username, password });

        const token = data.token;
        const user = data.data || data.user;

        // Simpan token & user
        commit("SET_TOKEN", token);
        commit("SET_USER", user);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.removeItem("profileImage");

        // ambil detail karyawan
        const karyawanRes = await api.get("/api/detail-karyawan");
        const karyawan = karyawanRes.data.data;
        commit("SET_KARYAWAN", karyawan);
        localStorage.setItem("karyawan", JSON.stringify(karyawan));

        commit("SET_ERROR", null);
        return true;
      } catch (error) {
        commit("SET_ERROR", error.response?.data?.message || "Login gagal");
        return false;
      }
    },

    logout({ commit }) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("karyawan");
      localStorage.removeItem("profileImage");
      delete api.defaults.headers.common["Authorization"];
      commit("LOGOUT");
    },

    initializeToken({ commit }) {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      const karyawan = JSON.parse(localStorage.getItem("karyawan"));

      if (token) {
        commit("SET_TOKEN", token);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
      if (user) {
        commit("SET_USER", user);
      }
      if (karyawan) {
        commit("SET_KARYAWAN", karyawan);
      }
    },
    async refreshKaryawan({ commit, state }) {
      if (!state.token) return;

      try {
        const karyawanRes = await api.get("/api/detail-karyawan");
        const karyawan = karyawanRes.data.data;
        commit("SET_KARYAWAN", karyawan);
        localStorage.setItem("karyawan", JSON.stringify(karyawan));
        return karyawan;
      } catch (error) {
        console.error("Gagal refresh data karyawan:", error);
        return null;
      }
    },
  },

  getters: {
    errorMessage: (state) => state.errorMessage,
    isLoggedIn: (state) => state.isLoggedIn,
    user: (state) => state.user,
    karyawan: (state) => state.karyawan,
    karyawanId: (state) => state.karyawan?.id,
    fotoUrl: (state) => {
      return state.karyawan?.foto_url || null;
    },
  },
};
