import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
    beforeEnter: (to, from, next) => (checkToken() ? next("/") : next()),
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Register.vue"),
    beforeEnter: (to, from, next) => (checkToken() ? next("/") : next()),
  },
  {
    path: "/browse/:query",
    name: "Camps",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CampsView.vue"),
  },
  {
    path: "/view/:id",
    name: "viewSingleCamp",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SingleCamp.vue"),
  },
  {
    path: "/profile/:id",
    name: "viewUserAccount",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AccountProfile.vue"),
  },
  {
    path: "/dashboard",
    name: "adminDashboard",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AdminDashboard.vue"),
  },
  {
    path: "/create",
    name: "createCamp",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CreateCamp.vue"),
  },
];

const checkToken = () => !!localStorage.getItem("token");

const router = new VueRouter({
  routes,
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return { x: 0, y: 0 };
    } else {
      return { x: 0, y: 0 };
    }
  },
});

export default router;
