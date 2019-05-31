<template>
  <div class="parallel-reader" :class="['text', `text-${textSize}`, `text-${textWidth}`]">
    <ParallelLine
        v-for="(line, index) in passageText" :key="`${index}-${line[0]}`"
        :left-line="line"
        :right-line="rightPassageText[index]"
    />
  </div>
</template>

<script>
import ParallelLine from './ParallelLine.vue';

export default {
  props: ['passage-text', 'right-passage-text'],
  components: { ParallelLine },
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
  .parallel-reader.text {
    &.text-xs {
      max-width: 1000px;
    }

    &.text-sm {
      max-width: 1200px;
    }

    &.text-md {
      max-width: 1400px;
    }

    &.text-lg {
      max-width: 1600px;
    }

    &.text-xl {
      max-width: 1800px;
    }

    &.text-normal {
      max-width: 700px;
      max-width: 90%;
    }

    &.text-narrow {
      max-width: 500px;
      max-width: 80%;
    }

    &.text-wide {
      max-width: 900px;
      max-width: 100%;
    }
  }
</style>
