import { createRouter, createWebHistory } from "vue-router";

import ForgotPassword from "../pages/login/ForgotPassword.vue";

import LoginPage from "../pages/login/LoginPage.vue";
import Otp from "../pages/login/Otp.vue"


const routes = [
  {

    path: "/ForgotPassword",
    name: "ForgotPassword",
    component: ForgotPassword,
  },
  
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  
  {
    path: "/otp",
    name: 'Otp',
    component: Otp,
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
