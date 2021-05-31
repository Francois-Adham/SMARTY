import axios from 'axios';
import api from './config.js';

axios.interceptors.request.use(
  (config) => {
    const credConfig = config;
    credConfig.withCredentials = true;
    return credConfig;
  },
  (err) => Promise.reject(err),
);

export default {
  async fetchCourse(id) {
    return axios
      .get(`${api}/api/v1/courses/${id}`)
      .then((response) => response.data)
      .catch((error) => console.log(error));
  },

  async fetchCourses() {
    return axios
      .post(`${api}/api/v1/courses/me`)
      .then((response) => response.data)
      .catch((error) => console.log(error));
  },

  async unenroll(courseId, studentId) {
    return axios
      .post(`${api}/api/v1/courses/${courseId}/${studentId}`)
      .then((response) => response.data)
      .catch((error) => console.log(error));
  },
};
