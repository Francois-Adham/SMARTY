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

  login(username, password) {
    return axios.post(`${api}/api/v1/login`, { username, password });
  },

  logout() {
    return axios.get(`${api}/api/v1/logout`);
  },

  signup(username, password, email, type, phone) {
    return axios.post(`${api}/api/v1/register`, {
      username,
      password,
      email,
      type,
      phone,
    });
  },

  changePassword(oldPassword, newPassword, id) {
    return axios.put(`${api}/api/v1/users/${id}`, {
      oldPassword,
      newPassword,
    });
  },

  changeEmail(email, id) {
    return axios.put(`${api}/api/v1/users/${id}/mail`, {
      email,
    });
  },

  profile(id) {
    return axios.get(`${api}/api/v1/users/${id}`);
  },
  async fetchCourses() {
    return axios
      .get(`${api}/api/v1/courses/me`)
      .then((response) => response.data)
      .catch((error) => console.log(error));
  },

  async unenroll(courseId, studentId) {
    return axios
      .post(`${api}/api/v1/courses/${courseId}/unenroll/${studentId}`)
      .then((response) => response.data)
      .catch((error) => console.log(error));
  },

  async uploadSampleFile(courseID, file,fileType,fileTitle,dueDate) {
    let formData = new FormData();
    formData.append('file', file);
    formData.append('type', fileType);
    formData.append('title', fileTitle);
    formData.append('dueDate', dueDate);
    return axios
      .post(
        `${api}/api/v1/courses/${courseID}/upload`,
        formData,
        { credentials: 'include' },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then((resposne) => resposne.data)
      .catch((error) => console.log(error));
  },
  async enroll(key) {
    return axios
      .post(`${api}/api/v1/courses/enroll`, { key: key })
      .then((response) => response)
      .catch((err) => (err ? { status: 'failed' } : {}));
  },

  async addCourse(name, key) {
    return axios
      .post(`${api}/api/v1/courses/create`, { name: name, key: key })
      .then((response) => response)
      .catch((err) => (err ? { status: 'failed' } : {}));
  },

  async addComment(postId, text) {
    return axios
      .post(`${api}/api/v1/posts/${postId}/comments/create`, { body: text })
      .then((response) => response)
      .catch((err) => (err ? { status: 'failed' } : {}));
  },

  async addPost(courseId, title, text) {
    return axios
      .post(`${api}/api/v1/courses/${courseId}/posts/create`, {
        title: title,
        body: text,
      })
      .then((response) => response)
      .catch((err) => (err ? { status: 'failed' } : {}));
  },

  async deleteComment(postId, commentId) {
    return axios
      .delete(`${api}/api/v1/posts/${postId}/comments/${commentId}`)
      .then((response) => response)
      .catch((err) => (err ? { status: 'failed' } : {}));
  },

  async deletePost(courseId, postId) {
    return axios
      .delete(`${api}/api/v1/courses/${courseId}/posts/${postId}`)
      .then((response) => response)
      .catch((err) => (err ? { status: 'failed' } : {}));
  },
};
