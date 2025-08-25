import { createStore } from "vuex";
import auth from "./modules/auth";
import holiday from "./modules/holiday";
import karyawan from "./modules/karyawan";
import p_absen from "./modules/p_absen";
import absensi from "./modules/absensiByStatus"; 
import kalender from "./modules/kalender"; 
import shift from "./modules/shift";
import absensi from "./modules/absensi_by_status"; 
import kategori_absen from "./modules/kategori_absen";

export default createStore({
  modules: {
    auth,
    holiday,
    karyawan,
    p_absen,
    absensi,
    kalender, 
    shift,
    kategori_absen,
  }
});