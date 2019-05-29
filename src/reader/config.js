import {
  SET_TEXT_SIZE,
  SET_TEXT_WIDTH,
  SET_CTS_URN,
} from './constants';

export default function createStore() {
  return {
    namespace: 'scaifeReader',
    store: {
      namespaced: true,
      state: {
        textSize: 'md',
        textWidth: 'normal',
        selectedCTSUrl: '',
        selectedCTSUrn: '',
        selectedCTSReference: '',
      },
      mutations: {
        [SET_TEXT_SIZE]: (state, size) => { state.textSize = size; },
        [SET_TEXT_WIDTH]: (state, width) => { state.textWidth = width; },
        [SET_CTS_URN]: (state, { url, urn, reference }) => {
          state.selectedCTSUrl = url;
          state.selectedCTSUrn = urn;
          state.selectedCTSReference = reference;
        },
      },
      actions: {
        [SET_TEXT_SIZE]: ({ commit }, { size }) => {
          commit(SET_TEXT_SIZE, size);
        },
        [SET_TEXT_WIDTH]: ({ commit }, { width }) => {
          commit(SET_TEXT_WIDTH, width);
        },
        [SET_CTS_URN]: ({ commit }, { url, urn, reference }) => {
          commit(SET_CTS_URN, { url, urn, reference });
        }
      },
    },
  };
}
