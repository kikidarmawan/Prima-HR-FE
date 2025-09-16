// store/modules/absensi.js
import api from "@/services/api";

// 🔹 Konversi base64 ke File
function dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
  }
  
  function formatHi(date) {
    const h = String(date.getHours()).padStart(2, "0")
    const m = String(date.getMinutes()).padStart(2, "0")
    return `${h}:${m}`
  }
  
  function formatHis(date) {
    const h = String(date.getHours()).padStart(2, "0")
    const m = String(date.getMinutes()).padStart(2, "0")
    const s = String(date.getSeconds()).padStart(2, "0")
    return `${h}:${m}:${s}`
  }
export default {
  namespaced: true,

  state: () => ({
    today: null,
    loading: false,
    error: null,
    loadingSubmitPresensi: false, // ⬅️ baru
  }),

  getters: {
    todayPresensi: (state) => state.today?.["0"] ?? null,
    sudahCheckIn: (state) => !!state.today?.["0"]?.jam_masuk,
    sudahCheckOut: (state) => !!state.today?.["0"]?.jam_keluar,
    isLoading: (state) => state.loading,
    isSubmitting: (state) => state.loadingSubmitPresensi, // ⬅️ getter baru
  },

  mutations: {
    SET_LOADING(state, val) {
      state.loading = val
    },
    SET_TODAY(state, data) {
      state.today = data
    },
    SET_ERROR(state, err) {
      state.error = err
    },
    SET_LOADING_SUBMIT(state, val) { // ⬅️ baru
        state.loadingSubmitPresensi = val
      },
  },

  actions: {
    async fetchToday({ commit }, tanggal) {
      commit("SET_LOADING", true)
      try {
        const token = localStorage.getItem("token")
        const res = await api.get(`/api/presensi-today?tanggal=${tanggal}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        commit("SET_TODAY", res.data.data)
      } catch (err) {
        commit("SET_TODAY", null)
        commit("SET_ERROR", err.response?.data || err)
      } finally {
        commit("SET_LOADING", false)
      }
    },

    async uploadFoto(_, photoBase64) {
      const token = localStorage.getItem("token")
      const fotoFile = dataURLtoFile(photoBase64, "foto.png")
      const uploadForm = new FormData()
      uploadForm.append("foto", fotoFile)

      const res = await api.post("/api/upload-foto-karyawan", uploadForm, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      return res.data.foto_path
    },

    async submitAbsensi({ commit, dispatch, state }, { photoBase64, karyawanId }) {
        commit("SET_LOADING_SUBMIT", true) // ⬅️ mulai loading
        try {
            const token = localStorage.getItem("token")
            const today = new Date()
            const tanggal = today.toISOString().split("T")[0]
    
            // 🔎 refresh dulu data today
            await dispatch("fetchToday", tanggal)
  
            const todayData = state.today?.["0"] || null
            const sudahCheckIn = !!todayData?.jam_masuk
            const sudahCheckOut = !!todayData?.jam_keluar
            console.log('today',todayData);
  
            if (sudahCheckIn && sudahCheckOut) {
                throw new Error("Anda sudah melakukan presensi hari ini.")
            }
    
            // ✅ kalau belum checkin -> action checkin
            // ✅ kalau sudah checkin tapi belum checkout -> action checkout
            const isCheckIn = !sudahCheckIn
            const jamSekarang = isCheckIn
                ? formatHi(today)
                : formatHis(today)
    
            // 🔎 ambil lokasi user
            const pos = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, (err) => {
                alert("Lokasi harus diizinkan untuk presensi!")
                reject(err)
                })
            })
            const { latitude, longitude } = pos.coords
    
            // 🔎 upload foto
            const fotoPath = await dispatch("uploadFoto", photoBase64)
    
            // 🔎 payload absensi
            const absensiPayload = {
                karyawan_id: karyawanId,
                tanggal,
                ...(isCheckIn
                ? { jam_masuk: jamSekarang, lat_masuk: latitude, long_masuk: longitude, foto_masuk: fotoPath }
                : { jam_keluar: jamSekarang, lat_pulang: latitude, long_pulang: longitude, foto_keluar: fotoPath }),
            }
    
            // 🔎 request ke API
            const res = await api({
                method: isCheckIn ? "post" : "put",
                url: isCheckIn ? "/api/check-in" : "/api/check-out",
                data: absensiPayload,
                headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                },
            })
    
            // 🔎 update state today biar langsung terbaru
            await dispatch("fetchToday", tanggal)
    
            return { message: res.data.message, fotoPath, type: isCheckIn ? "checkin" : "checkout" }
        } catch (err) {
            commit("SET_ERROR", err.response?.data || err)
            throw err
        } finally {
            commit("SET_LOADING_SUBMIT", false) // ⬅️ selesai loading
        }
    },
  },
}
