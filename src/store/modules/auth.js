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
    async login({ commit }, payload) {
      try {
        const response = await axios.post(
          "https://sunbeam-proper-pipefish.ngrok-free.app/api/login",
          {
            username: payload.username,
            password: payload.password
          }
        )
        const data = response.data

        commit("SET_TOKEN", data.token)
        commit("SET_USER", data.user || null) // jika API-mu return data user
        localStorage.setItem("token", data.token) // opsional
        commit("SET_ERROR", null)
        return true // success
      } catch (error) {
        const msg = error.response?.data?.message || "Login gagal"
        commit("SET_ERROR", msg)
        return false
      }
    },

    logout({ commit }) {
      localStorage.removeItem("token")
      commit("LOGOUT")
    }
  },
  getters: {
    errorMessage: state => state.errorMessage,
    isLoggedIn: state => state.isLoggedIn
  }
}
