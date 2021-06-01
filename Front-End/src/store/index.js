import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: { username: 'Smarty user', type: 'Instructor', id: 'ID' },
    dark: false,
    loggedIn: false
  },
  mutations: {
    setUser(state, username, type, id){
      state.currentUser.username = username
      state.currentUser.type = type
      state.currentUser.id = id
    },
    login(state){
      state.loggedIn = true;
    },
    logout(state){
      state.loggedIn = false;
    }
  },
  actions: {},
  modules: {},
});
