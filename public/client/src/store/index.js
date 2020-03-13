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
    user: {}
  },
  mutations: {
    authUser(state, userData) {
      state.token = userData.token;
    },
    clearAuthState(state) {
      state.token = null;
    },
    closeSnackbar(state) {
      state.registered = !state.registered;
    },
    loggedInUser(state, userData) {
      Object.keys(userData).forEach(key => {
        state.user = userData[key];
      });
    }
  },
  actions: {
    async login({ commit }, data) {
      const { token, user } = (await AuthenticationService.login(data)).data;
      commit("authUser", {
        token: token
      });
      localStorage.setItem("token", token);
      localStorage.setItem("id", user._id);
      router.replace("/");
    },
    async logout({ commit }) {
      try {
        await AuthenticationService.logout();
        commit("clearAuthState");
        localStorage.removeItem("token");
        localStorage.removeItem("id");
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

      localStorage.setItem("token", token);
      localStorage.setItem("id", user._id);

      commit("authUser", {
        token: token
      });
      router.replace("/");
      this.state.registered = true;
    },
    closeSnackbar({ commit }) {
      commit("closeSnackbar");
    },
    async getLoggedInUser({ commit }) {
      const { user } = (await AuthenticationService.getUser()).data;
      commit("loggedInUser", {
        user
      });
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
      if (state.user) {
        return state.user;
      }
    }
  }
});
