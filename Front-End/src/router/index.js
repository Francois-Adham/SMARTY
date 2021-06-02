import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/user/Login.vue';
import Logout from '../views/user/Logout.vue';
import Signup from '../views/user/Signup.vue';
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
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
