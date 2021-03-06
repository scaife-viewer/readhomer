import axios from 'axios';

import {
  PREVIOUS_CARD,
  NEXT_CARD,
  SET_PASSAGE_TEXT,
  SET_TEXT_SIZE,
  HOMER_SELECT_CARD,
  HOMER_LOOKUP_REFERENCE,
  SET_TEXT_WIDTH,
} from './constants';

import cards from './homer';

const parseHomerReference = (ref) => {
  const parts = ref.split('.');

  return {
    // eslint-disable-next-line radix
    book: parseInt(parts[0]),
    // eslint-disable-next-line radix
    line: parseInt(parts[1]),
  };
};

export default function createStore() {
  return {
    state: {
      // Reader
      readerTextSize: 'md',
      readerTextWidth: 'normal',
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
      [SET_TEXT_WIDTH]: (state, width) => { state.readerTextWidth = width; },
      [SET_PASSAGE_TEXT]: (state, lines) => { state.passageText = lines; },
      [HOMER_SELECT_CARD]: (state, { urn, card }) => {
        state.selectedCard = card;
        state.selectedReference = `${urn}:${card}`;
        state.selectedBaseUrn = urn;
      },
    },
    actions: {
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
        dispatch(HOMER_SELECT_CARD, { urn, card: reference });
      },
      [SET_TEXT_WIDTH]: ({ commit }, { width }) => {
        commit(SET_TEXT_WIDTH, width);
      },
    },
  };
}
