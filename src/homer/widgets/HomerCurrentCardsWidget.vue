<template>
  <div class="homer-current-cards-widget">
    <p>You are currently looking at the following cards:</p>
    <div class="work">
      <div
        class="card"
        v-for="card in cards"
        :key="card"
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
import { HOMER_LOOKUP_REFERENCE } from '../constants';

export default {
  scaifeConfig: {
    displayName: 'Homer Current Cards',
    singleton: true,
    location: 'sidebar',
  },
  data() {
    return {
      reference: '',
    };
  },
  methods: {
    lookup() {
      this.$store.dispatch(`homer/${HOMER_LOOKUP_REFERENCE}`, { reference: this.reference });
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
    cards() {
      return this.$store.getters.getChunks(this.passageStart, this.passageEnd);
    },
  },
};
</script>

<style lang="scss">
  @import "../../variables.scss";

  .homer-current-cards-widget {
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
