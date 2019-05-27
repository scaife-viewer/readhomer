<template>
  <div class="homer-card-widget">
    <div class="work">
      <div
        class="card"
        v-for="card in cards"
        :key="card"
        :class="{ selected: selectedCard(card) }"
      >
        <a
          href
          @click.prevent="selectCard(card)"
        >Iliad {{ card }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { HOMER_SELECT_CARD } from '../constants';

export default {
  scaifeConfig: {
    displayName: 'Homer Cards',
    singleton: true,
    location: 'sidebar',
  },
  methods: {
    selectCard(card) {
      this.$store.dispatch(`homer/${HOMER_SELECT_CARD}`, { card });
    },
    selectedCard(card) {
      return this.selectedCards.indexOf(card) > -1;
    },
  },
  computed: {
    text() {
      return this.$store.state.homer.passageText;
    },
    passageStart() {
      return this.text && this.text[0][0];
    },
    passageEnd() {
      return this.text && this.text[this.text.length - 1][0];
    },
    selectedCards() {
      return this.$store.getters.getChunks(this.passageStart, this.passageEnd);
    },
    cards() {
      return this.$store.state.homer.cards;
    },
  },
};
</script>

<style lang="scss">
  @import "../../variables.scss";

  .homer-card-widget {
    margin: 0 2em;
    flex: 1;

    .card {
      // font-family: 'Noto Serif';
      font-size: 14px;
      a {
        color: $gray-600;
        text-decoration: none;
        &:hover {
          color: $gray-800;
        }
      }
      &.selected a {
        font-weight: bold;
        color: $gray-700;
      }
    }

  }
</style>
