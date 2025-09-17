import { createStore } from "vuex";
import auth from "./modules/auth";
import holiday from "./modules/holiday";
import karyawan from "./modules/karyawan";
import p_absen from "./modules/p_absen";
import absensi from "./modules/absensi_by_status"; 
import shift from "./modules/shift";
import presensi from "./modules/presensi"; 
import kategori_absen from "./modules/kategori_absen";
import team_leave from "./modules/team_leave";
import p_lembur from "./modules/p_lembur";
import overtime_by_status from "./modules/overtime_by_status";
import overtime_count from "./modules/overtime_count";
import absen from "./modules/absensi";


export default createStore({
  modules: {
    auth,
    holiday,
    karyawan,
    p_absen,
    absensi,
    absen,
    shift,
    presensi,
    kategori_absen,
    team_leave,
    p_lembur,
    overtime_by_status,
    overtime_count,
    
  }
});
