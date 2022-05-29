import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    islogin:false,
  },
  getters: {
  },
  mutations: {
    login(state){
      state.islogin=true;
    },
    logout(state){
      state.islogin=false;
    }
  },
  actions: {
    clear({ commit }) {
      commit("$_removeStorage");
    }
  },
  modules: {
  }
})
