import { createRouter, createWebHistory } from "vue-router";
import ForgotPassword from "../pages/login/ForgotPassword.vue";
import LoginPage from "../pages/login/LoginPage.vue";
import NewPassword from "../pages/login/NewPassword.vue";

import Otp from "../pages/login/Otp.vue";

import ApplyLeave from "../pages/leave/ApplyLeave.vue";

import HomePage from "../pages/home/HomePage.vue";
import LeavesPage from "../pages/leave/LeavesPage.vue";

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
  },
  {
    path: "/apply",
    name: "ApplyLeave",
    component: ApplyLeave,
  },
  {
    path: "/leaves",
    name: "Leaves",
    component: LeavesPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
