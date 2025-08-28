import { createStore } from "vuex";
import auth from "./modules/auth";
import holiday from "./modules/holiday";
import karyawan from "./modules/karyawan";
import p_absen from "./modules/p_absen";
import absensi from "./modules/absensiByStatus"; 
import shift from "./modules/shift";
import presensi from "./modules/presensi";
import absensi from "./modules/absensi_by_status"; 
import kalender from "./modules/kalender"; 
import shift from "./modules/shift";
import kategori_absen from "./modules/kategori_absen";
import team_leave from "./modules/team_leave";

export default createStore({
  modules: {
    auth,
    holiday,
    karyawan,
    p_absen,
    absensi,
    shift,
    presensi,
    kategori_absen,
    team_leave,
  }
});
