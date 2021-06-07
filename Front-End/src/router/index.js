import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/user/Login.vue';
import Logout from '../views/user/Logout.vue';
import Profile from '../views/user/Profile/Profile.vue';
import Signup from '../views/user/Signup.vue';
import Main from '../views/Main.vue';
import Course from '../views/course/Course.vue';
import myCourses from '../views/course/myCourses.vue';
import UserProfile from '../views/user/Profile/UserProfile.vue';
import Home from '../views/Home/Home.vue';
import Admin from '../views/Admin/admin.vue';
import allCourses from '../views/Admin/allCourses.vue';
import allInstructors from '../views/Admin/allInstructors.vue';
import allStudents from '../views/Admin/allStudents.vue';

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
      { path: '/my-courses', name: 'courses', component: myCourses },
      { path: '/home', name: 'Home', component: Home },
      { path: '/admin', name: 'AdminDashboard', component: Admin },
      { path: '/courses', name: 'allCourses', component: allCourses },
      { path: '/students', name: 'allStudents', component: allStudents },
      { path: '/profile', name: 'profile', component: Profile },
      { path: '/user/:id', name: 'user', component: UserProfile },
      {
        path: '/instructors',
        name: 'allInstructors',
        component: allInstructors,
      },
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
