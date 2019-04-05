<template>
  <div class="reader" :class="['text', `text-${textSize}`]">
    <ReaderLine v-for="line in passageText" :key="line[0]" :line-ref="line[0]" :text="line[1]" />
  </div>
</template>

<script>
import ReaderLine from './ReaderLine.vue';

export default {
  props: ['passage-text'],
  components: { ReaderLine },
  computed: {
    textSize() {
      return this.$store.state.readerTextSize;
    },
  },
};
</script>

<style lang="scss">
  .text {
    font-family: 'Noto Serif';
    margin: 0.5em 0.5em 1em;

    .line {
      display: flex;
      align-items: flex-start;
      .line-ref {
        font-family: 'Noto Sans';
        color: #69C;
        width: 3.5em;
        flex-shrink: 0;
      }
      .line-text {
      }
    }

    &.text-xs {
      max-width: 500px;
      line-height: 1.5;
    }

    &.text-sm {
      max-width: 600px;
      line-height: 1.6;
    }

    &.text-md {
      max-width: 700px;
      line-height: 1.7;
    }

    &.text-lg {
      max-width: 800px;
      line-height: 1.8;
    }

    &.text-xl {
      max-width: 900px;
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
</style>
