import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
    errors: null,
    registered: false
  },
  mutations: {
    authUser(state, userData) {
      state.token = userData.token;
      state.user = userData.user.name;
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
    login({ commit }, data) {
      axios
        .post("http://localhost:5000/api/v1/auth/login", {
          email: data.email,
          password: data.password
        })
        .then(response => {
          commit("authUser", {
            token: response.data.token,
            user: response.data.user
          });
          router.replace("/");
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", response.data.user.name);
        })
        .catch(error => {
          this.state.errors = error.response.data.error;
          console.error(error);
        });
    },
    logout({ commit }) {
      axios
        .get("http://localhost:5000/api/v1/auth/logout")
        .then(response => {
          commit("clearAuthState");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          console.log(response);
        })
        .catch(error => {
          this.state.errors = error.response.data.error;
          console.error(error.data.error);
        });
    },
    tryLogin({ commit }) {
      const token = localStorage.getItem("token");
      const userName = localStorage.getItem("user");
      if (!token) return;
      commit("authUser", {
        token: token,
        user: userName
      });
    },
    register({ commit }, data) {
      axios
        .post("http://localhost:5000/api/v1/auth/register", {
          email: data.email,
          password: data.password,
          role: data.role,
          name: data.name
        })
        .then(response => {
          console.log(response.data);
          commit("authUser", {
            token: response.data.token,
            user: response.data.user
          });
          router.replace("/");
          this.state.registered = true;
        })
        .catch(error => {
          console.error(error.data.error);
        });
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
    checkErorrs(state) {
      if (state.error !== null) {
        return state.errors;
      }
    }
  }
});
