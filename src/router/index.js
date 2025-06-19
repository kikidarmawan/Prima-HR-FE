import { createRouter, createWebHistory } from "vue-router";
import ForgotPassword from "../pages/login/ForgotPassword.vue";
import LoginPage from "../pages/login/LoginPage.vue";
import NewPassword from "../pages/login/NewPassword.vue";
import Otp from "../pages/login/Otp.vue"
import HomePage from "../pages/home/HomePage.vue";
import LeavesPage from "../pages/leave/LeavesPage.vue";
import TeamPage from "../pages/team/TeamPage.vue";
import ApplyLeave from "../pages/leave/ApplyLeave.vue";
import LeaveDetail from "../pages/leave/LeaveDetail.vue";

import MyProfile from "../pages/profile/MyProfile.vue";

import HolidayPage from "../pages/holiday/HolidayPage.vue";


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
  {
    path: "/team",
    name: "Team",
    component: TeamPage,
  },
  {
    path: "/leave-detail",
    name: "LeaveDetail",
    component: LeaveDetail,
  },
  {

    path: "/profile",
    name: "MyProfile",
    component: MyProfile,

    path: "/holiday",
    name: "Holiday",
    component: HolidayPage,

  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
