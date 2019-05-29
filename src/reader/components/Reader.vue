<template>
  <div class="reader" :class="['text', `text-${textSize}`, `text-width-${textWidth}`]">
    <ReaderLine
      v-for="(line, index) in passageText"
      :key="`${index}-${line.citation}`"
      :line-ref="line.citation"
      :text="line.items[0].content"
    />
  </div>
</template>

<script>
import ReaderLine from './ReaderLine.vue';

export default {
  props: ['passage-text'],
  components: { ReaderLine },
  computed: {
    textSize() {
      return this.$store.state.scaifeReader.textSize;
    },
    textWidth() {
      return this.$store.state.scaifeReader.textWidth;
    },
  },
};
</script>

<style lang="scss">
  .text {
    font-family: 'Noto Serif';
    margin: 0.5em 0.5em 1em;

    .line {
      .line-ref {
      }
      .line-text {
      }
    }

    &.text-xs {
      line-height: 1.5;
    }

    &.text-sm {
      line-height: 1.6;
    }

    &.text-md {
      line-height: 1.7;
    }

    &.text-lg {
      line-height: 1.8;
    }

    &.text-xl {
      line-height: 1.9;
    }
  }

  .widget-sidebar .text {
    font-size: 14px;
    line-height: 1.6;
  }

  .text-xs {
    font-size: 12px;
  }
  .text-sm {
    font-size: 14px;
  }
  .text-md {
    font-size: 16px;
  }
  .text-lg {
    font-size: 20px;
  }
  .text-xl {
    font-size: 24px;
  }

  .text-width-normal {
    max-width: 700px;
  }

  .text-width-narrow {
    max-width: 500px;
  }

  .text-width-wide {
    max-width: 900px;
  }
</style>
