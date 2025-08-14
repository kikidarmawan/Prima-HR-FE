import { createStore } from "vuex";
import auth from "./modules/auth";
import holiday from "./modules/holiday";
import karyawan from "./modules/karyawan";
import p_absen from "./modules/p_absen";
import absensi from "./modules/absensiByStatus"; 

export default createStore({
  modules: {
    auth,
    holiday,
    karyawan,
    p_absen,
    absensi 
  }
});