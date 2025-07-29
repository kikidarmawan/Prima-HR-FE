import { createStore } from 'vuex'
import auth from './modules/auth'
import holiday from './modules/holiday'
import karyawan from './modules/karyawan'
import { createStore } from "vuex";
import auth from "./modules/auth";
import holiday from "./modules/holiday";
import detail_karyawan from "./modules/detail_karyawan";

export default createStore({
  modules: {
    auth,
    holiday,
    karyawan,
  }
})
    detail_karyawan,
  },
});
