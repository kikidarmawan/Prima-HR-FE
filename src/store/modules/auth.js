import api from "@/services/api";

// helper buat parsing localStorage dengan aman
function safeParse(key) {
  try {
    const item = localStorage.getItem(key);

    // kalau null → return null
    if (!item) return null;

    // kalau string literal "undefined" atau "null" → hapus biar bersih
    if (item === "undefined" || item === "null") {
      localStorage.removeItem(key);
      return null;
    }

    return JSON.parse(item);
  } catch (e) {
    console.warn(`❌ Gagal parse localStorage ${key}:`, e);
    localStorage.removeItem(key); // bersihin supaya ga error terus
    return null;
  }
}

export default {
  namespaced: true,

  state: () => ({
    token: localStorage.getItem("token") || null,
    user: safeParse("user"),
    karyawan: safeParse("karyawan"),
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
    SET_ERROR(state, message) {
      state.errorMessage = message;
    },
    LOGOUT(state) {
      state.token = null;
      state.user = null;
      state.karyawan = null;
      state.errorMessage = null;
      state.isLoggedIn = false;
    },
  },

  actions: {
    async login({ commit }, { username, password }) {
      try {
        const { data } = await api.post("/api/login", { username, password });

        const token = data.token;
        const user = data.data || data.user;

        // simpan token & user
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
      const user = safeParse("user");
      const karyawan = safeParse("karyawan");

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
    fotoUrl: (state) => state.karyawan?.foto_url || null,
  },
};
