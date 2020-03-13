import axios from "axios";

let token = localStorage.getItem("token");

const Api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export class AuthenticationService {
  static login(credentials) {
    return Api.post("/auth/login", credentials);
  }

  static logout() {
    return Api.get("/auth/logout");
  }

  static register(data) {
    return Api.post("/auth/register", data);
  }

  static getUser() {
    return Api.get("/auth/currentuser");
  }
}

export class ReviewsService {
  static getReviews(id) {
    return Api.get(`/camps/${id}/reviews`);
  }

  static postReview(id, data) {
    return Api.post(`/camps/${id}/reviews`, data);
  }
}

export class CampsService {
  static getFilteredCamps(query) {
    return Api.get(`/camps?careers=${query}`);
  }

  static getCamp(id) {
    return Api.get(`/camps/${id}`);
  }

  static createCamp(data) {
    return Api.post("/camps", data);
  }

  static editCamp(id, data) {
    return Api.put(`/camps/${id}`, data);
  }

  static deleteCamp(id) {
    return Api.delete(`/camps/${id}`);
  }
}

export class CoursesService {
  static createCourse(id, data) {
    return Api.post(`/camps/${id}/courses`, data);
  }

  static deleteCourse(id) {
    return Api.delete(`/courses/${id}`);
  }
}
