import { createRouter, createWebHistory } from "vue-router";

import ForgotPassword from "../views/ForgotPassword.vue";

import LoginPage from "../pages/login/LoginPage.vue";


const routes = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home,
  // },
  // {
  //   path: "/about",
  //   name: "About",
  //   component: () => import("../views/About.vue"), // Lazy loaded
  // },
  {

    path: "/ForgotPassword",
    name: "ForgotPassword",
    component: ForgotPassword,
  },
  

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
