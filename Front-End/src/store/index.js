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
    setUser( state,user){
      state.currentUser.username = user.username
      state.currentUser.type = user.type
      state.currentUser.id = user._id
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
