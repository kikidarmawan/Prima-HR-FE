import { createRouter, createWebHistory } from "vue-router";
import ForgotPassword from "../views/ForgotPassword.vue";

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
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
