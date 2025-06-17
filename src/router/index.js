import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../pages/login/LoginPage.vue";
import NewPassword from "../pages/login/NewPassword.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
   {
    path: "/login/password",
    name: "NewPassword",
    component: NewPassword,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
