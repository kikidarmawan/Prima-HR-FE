// store/modules/karyawan.js
import api from '@/services/api'

const state = {
  data: null,
  loading: false,
  error: null
}

const mutations = {
  SET_KARYAWAN(state, payload) {
    state.data = payload
  },
  SET_LOADING(state, status) {
    state.loading = status
  },
  SET_ERROR(state, error) {
    state.error = error
  }
}

const actions = {
  async fetchKaryawan({ commit }, id) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)

    try {
      const response = await api.get(`/api/detail-karyawan/${id}`)
      const result = response.data

      if (result?.data) {
        commit('SET_KARYAWAN', result.data)
      } else {
        commit('SET_ERROR', 'Data kosong atau tidak sesuai format')
        commit('SET_KARYAWAN', null)
      }

      return result.data
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Gagal mengambil data karyawan'
      commit('SET_ERROR', message)
      commit('SET_KARYAWAN', null)
      console.error('Gagal mengambil detail karyawan:', error)
      return null
    } finally {
      commit('SET_LOADING', false)
    }
  }
}

const getters = {
  karyawanData: (state) => state.data,
  isKaryawanLoading: (state) => state.loading,
  karyawanError: (state) => state.error
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
