import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Main from '../views/Main.vue';
import Course from '../views/course/Course.vue';
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
      { path: '/stream', name: 'stream', component: Stream },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
