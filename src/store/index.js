import { createStore } from 'vuex'
import auth from './modules/auth'
import holiday from './modules/holiday'
import karyawan from './modules/karyawan'

export default createStore({
  modules: {
    auth,
    holiday,
    karyawan, // tambahkan ini
  }
})
