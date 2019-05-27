import Vue from 'vue';
import Vuex from 'vuex';

import createPersistedState from 'vuex-persistedstate';

import homerCreateStore from './homer/config';
import readerCreateStore from './reader/config';
import skeletonCreateStore from './skeleton/config';

Vue.use(Vuex);

const homerStore = homerCreateStore();
const readerStore = readerCreateStore();
const skeletonStore = skeletonCreateStore();

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    [homerStore.namespace]: homerStore.store,
    [readerStore.namespace]: readerStore.store,
    [skeletonStore.namespace]: skeletonStore.store,
  },
});
