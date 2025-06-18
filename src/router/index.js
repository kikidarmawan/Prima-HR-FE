import { createRouter, createWebHistory } from "vue-router";

import ForgotPassword from "../pages/login/ForgotPassword.vue";

import LoginPage from "../pages/login/LoginPage.vue";

import NewPassword from "../pages/login/NewPassword.vue";

import Otp from "../pages/login/Otp.vue"
import HomePage from "../pages/home/HomePage.vue";



const routes = [
  {

    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
  },
  
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },


  {
    path: "/new-password",
    name: "NewPassword",
    component: NewPassword,
  },
  
  {
    path: "/otp",
    name: "Otp",
    component: Otp,
  },
  {
    path: "/home",
    name: "HomePage",
    component: HomePage,
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
