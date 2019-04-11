<template>
  <div class="homer-parallel-widget">
    <HomerReaderWidget />
    <HomerReaderWidget />
  </div>
</template>

<script>
import HomerReaderWidget from './HomerReaderWidget.vue';

export default {
  scaifeConfig: {
    displayName: 'Homer Parallel Reader',
    location: 'main',
  },
  components: {
    HomerReaderWidget,
  },
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
