import api from "@/services/api";
function dataURLtoFile(dataurl, filename) {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export default {
  namespaced: true,
  state: () => ({
    todayPresensi: null,
    monthPresensi: [],
    loading: false,
    error: null,
    previewFoto: null,
  }),
  mutations: {
    SET_TODAY_PRESENSI(state, payload) {
      state.todayPresensi = payload;
    },
    SET_MOTH_PRESENSI(state, payload) {
      state.monthPresensi = payload;
    },
    SET_LOADING(state, val) {
      state.loading = val;
    },
    SET_ERROR(state, err) {
      state.error = err;
    },
    SET_PREVIEW_FOTO(state, foto) {
      state.previewFoto = foto;
    },
  },
  actions: {
    async fetchTodayPresensi({ commit }, karyawanId) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);
      try {
        console.log("📡 Hit API:", `/api/get-presensi-today/${karyawanId}`);
        const res = await api.get(`/api/get-presensi-today/${karyawanId}`);

        const { status, data, message } = res.data;
        if (status && data) {
          commit("SET_TODAY_PRESENSI", data);
        } else {
          commit("SET_TODAY_PRESENSI", null);
          console.log("ℹ️ Info presensi:", message);
        }
      } catch (err) {
        const msg = err.response?.data?.message || err.message;
        console.error("❌ Fetch presensi error:", msg);
        commit("SET_ERROR", msg);
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async submitPresensi({ commit, state }, { karyawanId, photoBase64 }) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);
      try {
        const today = new Date();
        const tanggal = today.toISOString().split("T")[0];
        const jamSekarang = today.toLocaleTimeString("id-ID", { hour12: false });

        // lokasi
        const pos = await new Promise((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
        );
        const { latitude, longitude } = pos.coords;
        const sudahCheckIn = !!state.todayPresensi?.jam_masuk;
        const sudahCheckOut = !!state.todayPresensi?.jam_keluar;
        if (sudahCheckIn && sudahCheckOut) {
          throw new Error("Anda sudah melakukan presensi hari ini.");
        }

        const isCheckIn = !sudahCheckIn;
        const fotoFile = dataURLtoFile(photoBase64, "foto.png");

        // upload foto
        const uploadForm = new FormData();
        uploadForm.append(isCheckIn ? "foto_masuk" : "foto_keluar", fotoFile);

        const uploadRes = await api.post(
          "/api/upload-foto-karyawan",
          uploadForm,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        const fotoPath = uploadRes.data.foto_path;

        // payload presensi
        const absensiPayload = {
          karyawan_id: karyawanId,
          tanggal,
          ...(isCheckIn
            ? {
              jam_masuk: jamSekarang,
              lat_masuk: latitude,
              long_masuk: longitude,
              foto_masuk: fotoPath,
            }
            : {
              jam_keluar: jamSekarang,
              lat_pulang: latitude,
              long_pulang: longitude,
              foto_keluar: fotoPath,
            }),
        };

        const apiUrl = isCheckIn ? "/api/check-in" : "/api/check-out";
        const method = isCheckIn ? "post" : "put";

        const res = await api({ method, url: apiUrl, data: absensiPayload });

        commit("SET_TODAY_PRESENSI", res.data.data);
        commit(
          "SET_PREVIEW_FOTO",
          isCheckIn ? res.data.data.foto_masuk : res.data.data.foto_keluar
        );

        return res.data;
      } catch (err) {
        const msg = err.response?.data?.message || err.message;
        console.error("❌ Submit presensi error:", msg);
        commit("SET_ERROR", msg);
        throw err;
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async fetchMonthPresensi({ commit }, karyawanId) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);
      try {
        console.log("📡 Hit API:", `/api/get-presensi-month/${karyawanId}`);
        const res = await api.get(`/api/get-presensi-month/${karyawanId}`);
        commit("SET_MONTH_PRESENSI", res.data.data || []);
      } catch (err) {
        const msg = err.response?.data?.message || err.message;
        console.error("❌ Fetch month presensi error:", msg);
        commit("SET_ERROR", msg);
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
  getters: {
    todayPresensi: (state) => state.todayPresensi,
    monthPresensi: (state) => state.monthPresensi,
    presensiByDate: (state) => (tanggal) => {
      if (!tanggal) return null;
      if (state.todayPresensi?.tanggal === tanggal) return state.todayPresensi;
      return state.monthPresensi.find((p) => p.tanggal === tanggal) || null;
    },
    isLoading: (state) => state.loading,
    errorMessage: (state) => state.error,
    previewFoto: (state) => state.previewFoto,
  },
};
