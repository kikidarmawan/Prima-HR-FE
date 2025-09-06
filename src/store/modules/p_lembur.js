import api from "@/services/api"

const state = {
  lembur: [],
  loading: false,
  error: null,
}

const mutations = {
  SET_LEMBUR(state, payload) {
    state.lembur = payload
  },
  SET_LOADING(state, payload) {
    state.loading = payload
  },
  SET_ERROR(state, payload) {
    state.error = payload
  },
}

const actions = {

  async fetchLembur({ commit }) {
    commit("SET_LOADING", true)
    commit("SET_ERROR", null)
    try {
      const res = await api.get("/api/tambah-lembur") 
      commit("SET_LEMBUR", res.data)
    } catch (err) {
      commit("SET_ERROR", err.response ? err.response.data : err.message)
    } finally {
      commit("SET_LOADING", false)
    }
  },

  async addLembur({ dispatch, commit }, payload) {
    commit("SET_LOADING", true)
    commit("SET_ERROR", null)
    try {
      const res = await api.post("/api/tambah-lembur", payload) 
    
      return res.data
    } catch (err) {
      commit("SET_ERROR", err.response ? err.response.data : err.message)
      throw err
    } finally {
      commit("SET_LOADING", false)
    }
  },
}

const getters = {
  allLembur: (state) => state.lembur,
  isLoading: (state) => state.loading,
  errorMessage: (state) => state.error,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
