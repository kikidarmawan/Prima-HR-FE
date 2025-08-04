import axios from "axios"

export default {
  namespaced: true,
  state: () => ({
    token: null,
    user: null,
    errorMessage: null,
    isLoggedIn: false
  }),
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
      state.isLoggedIn = true
    },
    SET_USER(state, user) {
      state.user = user
    },
    SET_ERROR(state, error) {
      state.errorMessage = error
    },
    LOGOUT(state) {
      state.token = null
      state.user = null
      state.isLoggedIn = false
    }
  },
  actions: {
    async login({ commit, dispatch }, credentials) {
      try {
        const response = await axios.post(
          "https://sunbeam-proper-pipefish.ngrok-free.app/api/login",
          {
            username: credentials.username,
            password: credentials.password
          }
        )

        const responseData = response.data
        const user = responseData.data || responseData.user

        // Set token dan user ke state dan localStorage
        commit("SET_TOKEN", responseData.token)
        commit("SET_USER", user)
        localStorage.setItem("token", responseData.token)
        localStorage.setItem("user", JSON.stringify(user))

        // Set header default axios
        axios.defaults.headers.common["Authorization"] = `Bearer ${responseData.token}`

        // Ambil data karyawan dan simpan ke localStorage
        await dispatch("karyawan/fetchKaryawanById", user.id, { root: true })

        commit("SET_ERROR", null)
        return true
      } catch (error) {
        const msg = error.response?.data?.message || "Login gagal"
        commit("SET_ERROR", msg)
        return false
      }
    },

    logout({ commit }) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      localStorage.removeItem("karyawan") // hapus juga data karyawan
      delete axios.defaults.headers.common["Authorization"]
      commit("LOGOUT")
    },

    initializeToken({ commit }) {
      const token = localStorage.getItem("token")
      if (token) {
        commit("SET_TOKEN", token)
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      }
    }
  },
  getters: {
    errorMessage: state => state.errorMessage,
    isLoggedIn: state => state.isLoggedIn,
    user: state => state.user
  }
}
