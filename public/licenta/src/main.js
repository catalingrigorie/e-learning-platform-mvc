import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";
import Router from "vue-router";
import Routes from "../router/routes";

Vue.use(VueRouter);

Vue.config.productionTip = false;

const router = new Router({
  routes: Routes,
  mode: "history"
});

new Vue({
  vuetify,
  render: h => h(App),
  router: router
}).$mount("#app");
