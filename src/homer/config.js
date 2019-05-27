import {
  PREVIOUS_CARD,
  NEXT_CARD,
  SET_PASSAGE_TEXT,
  HOMER_SELECT_CARD,
  HOMER_LOOKUP_REFERENCE,
  API_URL,
} from './constants';
import {
  SET_CTS_URN
} from '../reader/constants';

import cards from './cards';
import api from './api';

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
    namespace: 'homer',
    store: {
      namespaced: true,
      state: {
        passageText: [],
        word: null,
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
        [HOMER_SELECT_CARD]: ({ commit, dispatch }, { urn, card }) => {
          api.fetchText(urn, card).then(r => {
            console.log('data', SET_PASSAGE_TEXT, HOMER_SELECT_CARD, r.data);
            dispatch(SET_PASSAGE_TEXT, { lines: r.data });
            dispatch(`scaifeReader/${SET_CTS_URN}`, { url: API_URL, urn: urn, reference: `${urn}:${card}` }, { root: true });
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
      },
    },
  };
}
