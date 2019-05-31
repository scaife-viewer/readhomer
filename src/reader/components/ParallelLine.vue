<template>
  <div class="parallel-line">
    <ReaderLine :line-ref="leftLine[0]" :text="leftLine[1]" side="left" @hover="onHover" :other-side="hoverStates.right" />
    <ReaderLine :line-ref="rightLine[0]" :text="rightLine[1]" side="right" @hover="onHover" :other-side="hoverStates.left" />
  </div>
</template>

<script>
import ReaderLine from './ReaderLine.vue';

export default {
  props: ['left-line', 'right-line'],
  components: { ReaderLine },
  computed: {
    textSize() {
      return this.$store.state.scaifeReader.textSize;
    },
  },
  data() {
    return {
      hoverStates: {
        left: [],
        right: [],
      }
    }
  },
  methods: {
    onHover(side, lineIndex, tokenIndex) {
      this.hoverStates = {
        left: [],
        right: [],
      };
      this.hoverStates[side] = [lineIndex, tokenIndex];
    }
  }
};
</script>

<style lang="scss">
  @import "../../variables.scss";

  .parallel-line {
    padding: 5px;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 10px;
    &:hover {
      background: $gray-100;
    }
  }
</style>
