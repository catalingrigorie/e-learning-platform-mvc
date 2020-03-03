import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    errors: null,
    registered: false
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
            token: response.data.token
          });
          router.replace("/");
          localStorage.setItem("token", response.data.token);
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
          console.log(response);
        })
        .catch(error => {
          this.state.errors = error.response.data.error;
          console.error(error.data.error);
        });
    },
    tryLogin({ commit }) {
      const token = localStorage.getItem("token");
      if (!token) return;
      commit("authUser", {
        token: token
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
            token: response.data.token
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
