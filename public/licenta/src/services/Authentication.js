import axios from "axios";

let url = "http://localhost:5000/v1/todos/";

class Authentication {
  static register(credentials) {
    try {
      return url.post();
    } catch (error) {}
  }
}

export default TodosService;
