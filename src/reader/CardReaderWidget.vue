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
import Card from './Card.vue';
import Reader from './Reader.vue';

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
      this.$store.dispatch('previousCard');
    },
    onNextCard() {
      this.$store.dispatch('nextCard');
    },
  },
  computed: {
    currentCard() {
      return this.$store.state.selectedCard;
    },
    previousCard() {
      if (this.currentCard === null || this.$store.state.cards.indexOf(this.currentCard) === 0) {
        return this.$store.state.cards[this.$store.state.cards.length - 1];
      }
      return this.$store.state.cards[this.$store.state.cards.indexOf(this.currentCard) - 1];
    },
    nextCard() {
      if (this.currentCard === null || this.$store.state.cards.indexOf(this.currentCard) === this.$store.state.cards.length - 1) {
        return this.$store.state.cards[0];
      }
      return this.$store.state.cards[this.$store.state.cards.indexOf(this.currentCard) + 1];
    },
    passageText() {
      return this.$store.state.passageText;
    },
  },
};
</script>
