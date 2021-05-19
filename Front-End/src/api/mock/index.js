import Course from './data/course.json';
import Stream from './data/stream.json';

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
};
