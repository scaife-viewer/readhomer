<template>
  <div class="homer-widget">
    <div class="work" v-for="(work, index) in works" :key="index">
      <div
        class="book"
        :key="bIndex"
        v-for="(bookLength, bIndex) in work.bookLengths"
        :class="{ selected: isSelected(work.urn, bIndex + 1, bookLength) }"
      >
        <a
          href
          @click.prevent="selectBook(work.urn, bIndex + 1, bookLength)"
        >{{ work.displayName }} {{ bIndex + 1 }}.1&ndash;{{ bIndex + 1 }}.{{ bookLength }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  scaifeConfig: {
    displayName: 'Homer',
    singleton: true,
    location: 'sidebar',
  },
  data() {
    return {
      selected: {
        urn: '',
        book: null,
        start: null,
        end: null,
      },
    };
  },
  methods: {
    isSelected(urn, book, bookLength) {
      return (
        this.selected.urn === urn
          && this.selected.book === book
          && this.selected.end === bookLength
      );
    },
    selectBook(urn, book, bookLength) {
      this.selected = {
        urn,
        book,
        start: 1,
        end: bookLength,
      };
      axios
        .get(`https://homer-api.herokuapp.com/${this.selectedUrn}/`)
        .then(r => this.$store.dispatch('setPassageText', { lines: r.data }));
    },
  },
  computed: {
    selectedUrn() {
      const {
        urn, book, start, end,
      } = this.selected;
      return `${urn}:${book}.${start}-${book}.${end}`;
    },
    works() {
      return [
        {
          displayName: 'Iliad',
          urn: 'urn:cts:greekLit:tlg0012.tlg001.perseus-grc2',
          bookLengths: [
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
          ],
        },
      ];
    },
  },
};
</script>

<style lang="scss">
  @import "../variables.scss";

  .homer-widget {
    margin: 0 2em;
    flex: 1;

    .book {
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
