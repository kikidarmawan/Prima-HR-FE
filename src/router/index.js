import { createRouter, createWebHistory } from "vue-router";

import ForgotPassword from "../pages/login/ForgotPassword.vue";

import LoginPage from "../pages/login/LoginPage.vue";


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
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
