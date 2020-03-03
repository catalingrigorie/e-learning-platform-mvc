import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
    beforeEnter: (to, from, next) => (checkToken() ? next("/") : next())
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Register.vue"),
    beforeEnter: (to, from, next) => (checkToken() ? next("/") : next())
  },
  {
    path: "/browse/:query",
    name: "Camps",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Camps.vue")
  },
  {
    path: "/view/:id",
    name: "viewSingleCamp",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SingleCamp.vue")
  }
];

const checkToken = () => !!localStorage.getItem("token");

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
