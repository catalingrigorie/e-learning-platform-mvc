import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { AuthenticationService } from "../services/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    errors: null,
    registered: false,
    user: null
  },
  mutations: {
    authUser(state, userData) {
      state.token = userData.token;
      state.user = userData.user;
    },
    clearAuthState(state) {
      state.token = null;
      state.user = null;
    },
    closeSnackbar(state) {
      state.registered = !state.registered;
    }
  },
  actions: {
    async login({ commit }, data) {
      const { token, user } = (await AuthenticationService.login(data)).data;
      // remove 'password' field from user object
      const userObj = filterObject(user, "password");
      localStorage.setItem("user", JSON.stringify(userObj));
      localStorage.setItem("token", token);

      router.replace("/").catch(err => console.log(err));
      commit("authUser", {
        token: token,
        user: userObj
      });
    },
    async logout({ commit }) {
      try {
        await AuthenticationService.logout();
        commit("clearAuthState");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        router.replace("/");
      } catch (error) {
        this.state.errors = error.message;
      }
    },
    tryLogin({ commit }) {
      const token = localStorage.getItem("token");
      if (!token) return;
      commit("authUser", {
        token: token
      });
    },
    async register({ commit }, data) {
      const { token, user } = (
        await AuthenticationService.register({
          email: data.email,
          password: data.password,
          role: data.role,
          name: data.name
        })
      ).data;

      const userObj = filterObject(user, "password");

      localStorage.setItem("user", JSON.stringify(userObj));
      localStorage.setItem("token", token);

      commit("authUser", {
        token: token
      });
      router.replace("/");
      this.state.registered = true;
    },
    closeSnackbar({ commit }) {
      commit("closeSnackbar");
    }
  },
  getters: {
    isUserLoggedIn(state) {
      return state.token !== null;
    },
    accountCreated(state) {
      return state.registered;
    },
    getUser(state) {
      return state.user;
    }
  }
});

const filterObject = (object, field) =>
  Object.keys(object)
    .filter(key => key !== field)
    .reduce((obj, key) => Object.assign(obj, { [key]: object[key] }), {});
