<template>
  <div class="homer-source-selector">
    <button class="btn-book" @click.prevent="selectBook(index)" v-for="(bookLength, index) in books" :key="index" :class="{ active: selectedBook === (index + 1)}">
      {{ index + 1 }}
    </button>
  </div>
</template>

<script>
import axios from 'axios';

const URN = 'urn:cts:greekLit:tlg0012.tlg001.perseus-grc2';
const BOOK_LENGTHS = [
  611,
  877,
  461,
  544,
  909,
  529,
  482,
  565,
  713,
  579,
  848,
  471,
  837,
  522,
  746,
  867,
  761,
  616,
  424,
  503,
  611,
  515,
  897,
  804,
];

export default {
  data() {
    return {
      selectedBook: null,
    };
  },
  methods: {
    selectBook(index) {
      this.selectedBook = index + 1;
      axios
        .get(`https://homer-api.herokuapp.com/${this.selectedUrn}/`)
        .then(r => this.$emit('input', r.data));
    },
  },
  computed: {
    selectedUrn() {
      return `${URN}:${this.selectedBook}.1-${this.selectedBook}.${BOOK_LENGTHS[this.selectedBook - 1]}`;
    },
    books() {
      return BOOK_LENGTHS;
    },
  },
};
</script>

<style lang="scss">
  @import "../variables.scss";

  .homer-source-selector {
    display: flex;
    flex-wrap: wrap;
  }

  button.btn-book {
    background: transparent;
    color: $gray-700;
    padding: 2px 4px;
    border: none;
    font-size: 12px;
    &:hover {
      background: $gray-300;
      color: $black;
    }
    &.active {
      background: $gray-700;
      color: $white;
    }
  }
</style>
