import { createStore } from 'vuex'
import auth from './modules/auth'
import holiday from "./modules/holiday";

export default createStore({
  modules: {
    auth,
    holiday,
  }
})
