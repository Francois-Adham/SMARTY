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
  async login(username, password) {
    return axios
      .post(`${api}/api/v1/login`, { username, password })
      .then((response) => response)
      .catch((error) => error);
  },
};
