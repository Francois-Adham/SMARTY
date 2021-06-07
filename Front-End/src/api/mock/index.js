import Course from './data/course.json';
import Courses from './data/myCourses.json';
import Stream from './data/stream.json';
import User from './data/user.json';

const fetch = (mockData, time = 0) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData);
    }, time);
  });

export default {
  async fetchCourse(id) {
    console.log(id);
    const course = await fetch(Course, 1000);
    return course;
  },

  async fetchStream() {
    const stream = await fetch(Stream, 1000);
    return stream;
  },

  async fetchCourses() {
    const courses = await fetch(Courses, 1000);
    return courses;
  },

  unenroll() {
    return { status: 'success' };
  },
  addPost(courseId, title, text) {
    console.log('Course:' + courseId);
    console.log('title:' + title);
    console.log('body:' + text);
    return { status: 'success' };
  },
  addComment(postId, text) {
    console.log('Post:' + postId);
    console.log('body:' + text);
    return { status: 'success' };
  },

  deleteComment(postId, commentId) {
    console.log(postId, commentId);
    return { status: 'la2' };
  },

  deletePost(courseId, postId) {
    console.log(courseId, postId);
    return { status: 'success' };
  },

  async login(username, password) {
    console.log(username, password);
    return await fetch(User, 1000);
  },
};
