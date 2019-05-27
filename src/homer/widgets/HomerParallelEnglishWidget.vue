<template>
  <div class="homer-parallel-widget">
    <ParallelReader :passage-text="greek" :right-passage-text="english" />
  </div>
</template>

<script>
import ParallelReader from '../../reader/components/ParallelReader.vue';

export default {
  scaifeConfig: {
    displayName: 'Homer Parallel Reader',
    location: 'main',
  },
  components: {
    ParallelReader,
  },
  computed: {
    greek() {
      return this.$store.state.homer.englishText.map(chunk => {
          const lines = chunk.items[0].content.reduce((map, obj) => {
            const line = `${map}<p>${obj[1]}</p>`;
            return line;
          }, '');
          return [chunk.citation, lines];
      });
    },
    english() {
      return this.$store.state.homer.englishText.map(chunk => {
          const lines = chunk.items[1].content.reduce((map, obj) => {
            const line = `${map}<p>${obj[1]}</p>`;
            return line;
          }, '');
          return [chunk.citation, lines];
      });
    },
  }
};
</script>

<style lang="scss">
  .homer-parallel-widget {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    height: calc(100vh - 45px);
    .select-passage-reader {
        overflow-y: scroll;
    }
  }
</style>
