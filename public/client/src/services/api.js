import axios from "axios";

let token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`
  }
};

export class ReviewsService {
  static getReviews(id) {
    let url = `http://localhost:5000/api/v1/camps/${id}/reviews`;
    return axios.get(url, config);
  }

  static postReview(id, data) {
    let url = `http://localhost:5000/api/v1/camps/${id}/reviews`;
    return axios.post(url, data, config);
  }
}

export class CampsService {
  static getFilteredCamps(query) {
    let url = `http://localhost:5000/api/v1/camps?careers=${query}`;
    return axios.get(url);
  }

  static getCamp(id) {
    let url = `http://localhost:5000/api/v1/camps/${id}`;
    return axios.get(url);
  }

  static createCamp(data) {
    let url = `http://localhost:5000/api/v1/camps`;
    return axios.post(url, data, config);
  }

  static editCamp(data, id) {
    let url = `http://localhost:5000/api/v1/camps/${id}/image`;
    return axios.put(url, data, config);
  }
}

export class CoursesService {
  static createCourse(id, data) {
    let url = `http://localhost:5000/api/v1/camps/${id}/courses`;
    return axios.post(url, data, config);
  }
}
