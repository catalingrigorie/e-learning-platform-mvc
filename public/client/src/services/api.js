import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api/v1";

class Api {
  static login(email, pass) {
    return axios.post("/auth/login", {
      email: email,
      password: pass
    });
  }
}

export default Api;
