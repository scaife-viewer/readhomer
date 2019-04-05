<template>
  <div class="homer-parallel-widget">
    <HomerSource v-model="source" />
    <ParallelReader :passage-text="source" :right-passage-text="flipped" />
  </div>
</template>

<script>
import HomerSource from './HomerSource.vue';
import ParallelReader from '../reader/ParallelReader.vue';

export default {
  scaifeConfig: {
    displayName: 'Homer Parallel Reader',
    location: 'main',
  },
  components: {
    HomerSource,
    ParallelReader,
  },
  data() {
    return {
      source: [],
    };
  },
  computed: {
    flipped() {
      return this.source.map((line) => {
        const reverseLine = line[1].split(' ').reverse().join(' ');
        return [
          line[0],
          reverseLine + reverseLine,
        ];
      });
    },
  },
};
</script>

<style lang="scss">
  .homer-parallel-widget {
    .select-passage-reader {
        overflow-y: scroll;
    }
  }
</style>
