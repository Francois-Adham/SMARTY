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
      { path: '/course/:id', name: 'course', component: Course ,meta:{title: 'Course'}},
      { path: '/my-courses', name: 'courses', component: myCourses,meta:{title: 'My Courses'} },
      { path: '/home', name: 'Home', component: Home,meta:{title: 'Smarty'} },
      { path: '/admin', name: 'AdminDashboard', component: Admin ,meta:{title: 'Dashboard'}},
      { path: '/courses', name: 'allCourses', component: allCourses,meta:{title: 'Courses'} },
      { path: '/students', name: 'allStudents', component: allStudents,meta:{title: 'Students'} },
      { path: '/profile', name: 'profile', component: Profile,meta:{title: 'Profile'} },
      { path: '/user/:id', name: 'user', component: UserProfile,meta:{title: 'Profile'} },
      {
        path: '/instructors',
        name: 'allInstructors',
        component: allInstructors,
        meta: {
          title: 'Instractors',
        }
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login',
    }
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
    meta: {
      title: 'Logout',
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: {
      title: 'Sign up',
    }
  },
];

const router = new VueRouter({
  mode: "history",
  routes
});


export default router;
