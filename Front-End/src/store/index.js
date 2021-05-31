import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: { username: 'Smarty user', type: 'Instructor', id: 'ID' },
    dark: false,
  },
  mutations: {},
  actions: {},
  modules: {},
});
