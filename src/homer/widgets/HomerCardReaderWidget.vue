<template>
  <Card
    :current="currentCard"
    :previous="previousCard"
    :next="nextCard"
    @prevClick="onPreviousCard"
    @nextClick="onNextCard">
    <Reader :passage-text="passageText" />
  </Card>
</template>

<script>
import Card from '../../reader/components/Card.vue';
import Reader from './../reader/components./Reader.vue';
import { PREVIOUS_CARD, NEXT_CARD } from '../constants';

export default {
  scaifeConfig: {
    displayName: 'Card Reader',
    location: 'main',
  },
  components: {
    Card,
    Reader,
  },
  methods: {
    onPreviousCard() {
      this.$store.dispatch(`homer/${PREVIOUS_CARD}`);
    },
    onNextCard() {
      this.$store.dispatch(`homer/${NEXT_CARD}`);
    },
  },
  computed: {
    currentCard() {
      return this.$store.state.homer.selectedCard;
    },
    previousCard() {
      if (this.currentCard === null || this.cards.indexOf(this.currentCard) === 0) {
        return this.cards[this.cards.length - 1];
      }
      return this.cards[this.cards.indexOf(this.currentCard) - 1];
    },
    cards() {
      return this.$store.state.homer.cards;
    },
    nextCard() {
      const currentIsLast = this.cards.indexOf(this.currentCard) === this.cards.length - 1;
      if (this.currentCard === null || currentIsLast) {
        return this.cards[0];
      }
      return this.cards[this.cards.indexOf(this.currentCard) + 1];
    },
    passageText() {
      return this.$store.state.homer.passageText;
    },
  },
};
</script>
