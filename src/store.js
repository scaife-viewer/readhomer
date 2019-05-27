import Vue from 'vue';
import Vuex from 'vuex';

import createPersistedState from 'vuex-persistedstate';
import createStore from './config';
import skeletonCreateStore from './skeleton/store';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  ...createStore(),
  modules: {
    scaife: skeletonCreateStore()
  }
});
