import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: {
      username: 'Solly',
      type: 'Instructor',
      id: 'ID',
      phone: '99999',
      email: '000@000.com',
    },
    dark: false,
    loggedIn: false,
  },
  mutations: {
    setUser(state, user) {
      state.currentUser.username = user.username;
      state.currentUser.type = user.type;
      state.currentUser.id = user._id;
      state.currentUser.phone = user.phone;
      state.currentUser.email = user.email;
    },
    login(state) {
      state.loggedIn = true;
    },
    logout(state) {
      state.loggedIn = false;
    },
    setDark(state, dark){
      state.dark = dark
    }
  },
  actions: {},
  modules: {},
});
