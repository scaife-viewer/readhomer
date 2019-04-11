import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

import {
  PREVIOUS_CARD,
  NEXT_CARD,
  SET_PASSAGE_TEXT,
  SET_TEXT_SIZE,
  TOGGLE_LEFT_SIDEBAR,
  TOGGLE_RIGHT_SIDEBAR,
  HOMER_SELECT_CARD,
  HOMER_LOOKUP_REFERENCE,
  ADD_LEFT_WIDGET,
  ADD_RIGHT_WIDGET,
  CHANGE_MAIN_WIDGET,
  REMOVE_LEFT_WIDGET,
  REMOVE_RIGHT_WIDGET,
} from './constants';
import cards from './homer';

Vue.use(Vuex);

const parseHomerReference = (ref) => {
  const parts = ref.split('.');

  return {
    // eslint-disable-next-line radix
    book: parseInt(parts[0]),
    // eslint-disable-next-line radix
    line: parseInt(parts[1]),
  };
};

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    // Skeleton
    rightOpen: true,
    leftOpen: true,
    widgets: {
      mainWidget: null,
      right: [],
      left: [],
    },

    // Reader
    readerTextSize: 'md',
    passageText: [],
    word: null,

    // Homer
    cards,
    selectedCard: null,
    selectedReference: '',
    selectedBaseUrn: '',
  },
  getters: {
    getChunks: state => (start, end) => {
      const parsedStart = parseHomerReference(start);
      const parsedEnd = parseHomerReference(end);

      const chunks = [];
      let startFound = false;
      let endFound = false;
      state.cards.forEach((c) => {
        const parts = c.split('-');
        const cardStart = parseHomerReference(parts[0]);
        const cardEnd = parseHomerReference(parts[1]);

        if (parsedStart.book === cardStart.book && parsedStart.line >= cardStart.line) {
          startFound = true;
        }
        if (parsedEnd.book === cardEnd.book && parsedEnd.line <= cardEnd.line) {
          if (!endFound) {
            chunks.push(c);
          }
          endFound = true;
        }
        if (startFound && !endFound) {
          chunks.push(c);
        }
      });

      return chunks;
    },
  },
  mutations: {
    [SET_TEXT_SIZE]: (state, size) => { state.readerTextSize = size; },
    [SET_PASSAGE_TEXT]: (state, lines) => { state.passageText = lines; },
    [TOGGLE_LEFT_SIDEBAR]: (state) => { state.leftOpen = !state.leftOpen; },
    [TOGGLE_RIGHT_SIDEBAR]: (state) => { state.rightOpen = !state.rightOpen; },
    [HOMER_SELECT_CARD]: (state, { urn, card }) => {
      console.log(urn, card);
      state.selectedCard = card;
      state.selectedReference = `${urn}:${card}`;
      state.selectedBaseUrn = urn;
    },
    [ADD_LEFT_WIDGET]: (state, displayName) => {
      state.widgets.left = [
        ...state.widgets.left,
        displayName,
      ];
    },
    [ADD_RIGHT_WIDGET]: (state, displayName) => {
      state.widgets.right = [
        ...state.widgets.right,
        displayName,
      ];
    },
    [CHANGE_MAIN_WIDGET]: (state, displayName) => {
      state.widgets = {
        ...state.widgets,
        mainWidget: displayName,
      };
    },
    [REMOVE_LEFT_WIDGET]: (state, index) => {
      const widgets = [...state.widgets.left];
      widgets.splice(index, 1);
      state.widgets.left = widgets;
    },
    [REMOVE_RIGHT_WIDGET]: (state, index) => {
      const widgets = [...state.widgets.right];
      widgets.splice(index, 1);
      state.widgets.right = widgets;
    },
  },
  actions: {
    [TOGGLE_LEFT_SIDEBAR]: ({ commit }) => commit(TOGGLE_LEFT_SIDEBAR),
    [TOGGLE_RIGHT_SIDEBAR]: ({ commit }) => commit(TOGGLE_RIGHT_SIDEBAR),
    [ADD_LEFT_WIDGET]: ({ commit }, { displayName }) => commit(ADD_LEFT_WIDGET, displayName),
    [ADD_RIGHT_WIDGET]: ({ commit }, { displayName }) => commit(ADD_RIGHT_WIDGET, displayName),
    [CHANGE_MAIN_WIDGET]: ({ commit }, { displayName }) => commit(CHANGE_MAIN_WIDGET, displayName),
    [REMOVE_LEFT_WIDGET]: ({ commit }, { index }) => commit(REMOVE_LEFT_WIDGET, index),
    [REMOVE_RIGHT_WIDGET]: ({ commit }, { index }) => commit(REMOVE_RIGHT_WIDGET, index),
    [SET_PASSAGE_TEXT]: ({ commit }, { lines }) => {
      commit(SET_PASSAGE_TEXT, lines);
    },
    [SET_TEXT_SIZE]: ({ commit }, { size }) => {
      commit(SET_TEXT_SIZE, size);
    },
    [HOMER_SELECT_CARD]: ({ commit, dispatch }, { urn, card }) => {
      axios
        .get(`https://homer-api.herokuapp.com/${urn}:${card}/`)
        .then((r) => {
          dispatch(SET_PASSAGE_TEXT, { lines: r.data });
          commit(HOMER_SELECT_CARD, { urn, card });
        });
    },
    [PREVIOUS_CARD]: ({ dispatch, state }) => {
      let index;
      if (state.selectedCard === null) {
        index = state.cards.length - 1;
      } else {
        const currentIndex = state.cards.indexOf(state.selectedCard);
        if (currentIndex === 0) {
          index = state.cards.length - 1;
        } else {
          index = currentIndex - 1;
        }
      }
      dispatch(HOMER_SELECT_CARD, { urn: state.selectedBaseUrn, card: state.cards[index] });
    },
    [NEXT_CARD]: ({ dispatch, state }) => {
      let index;
      if (state.selectedCard === null) {
        index = 0;
      } else {
        const currentIndex = state.cards.indexOf(state.selectedCard);
        if (currentIndex === state.cards.length - 1) {
          index = 0;
        } else {
          index = currentIndex + 1;
        }
      }
      dispatch(HOMER_SELECT_CARD, { urn: state.selectedBaseUrn, card: state.cards[index] });
    },
    [HOMER_LOOKUP_REFERENCE]: ({ dispatch }, { urn, reference }) => {
      console.log(urn, reference);
      dispatch(HOMER_SELECT_CARD, { urn, card: reference });
    },
  },
});
