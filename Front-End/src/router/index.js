import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '../views/Main.vue';
import Course from '../views/course/Course.vue';
import myCourses from '../views/course/myCourses.vue';
import Stream from '../views/ActivityStream/ActivityStream.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    meta: {
      title: 'SMARTY',
    },
    children: [
      { path: '/course/:id', name: 'course', component: Course },
      { path: '/courses', name: 'courses', component: myCourses },
      { path: '/stream', name: 'stream', component: Stream },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
