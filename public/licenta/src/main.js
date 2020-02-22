import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";
import Router from "vue-router";
import Routes from "../router/routes";
import Vuex from "vuex";
import { sync } from "vuex-router-sync";

Vue.use(VueRouter);
Vue.use(Vuex);

Vue.config.productionTip = false;

const router = new Router({
  routes: Routes,
  mode: "history"
});

const store = new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      if (token) {
        state.isUserLoggedIn = true;
      } else {
        state.isUserLoggedIn = false;
      }
    }
  },
  actions: {
    setToken({ commit }, token) {
      commit("setToken", token);
    },
    setUser({ commit }, user) {
      commit("setUser", user);
    }
  }
});

sync(store, router);

new Vue({
  vuetify,
  render: h => h(App),
  router: router,
  store
}).$mount("#app");
