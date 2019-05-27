<template>
  <div class="homer-grid-widget">
    <HomerReaderWidget />
    <HomerReaderWidget />
    <HomerReaderWidget />
    <HomerReaderWidget />
  </div>
</template>

<script>
import HomerReaderWidget from './HomerReaderWidget.vue';

export default {
  scaifeConfig: {
    displayName: 'Homer 2x2 Reader',
    location: 'main',
  },
  components: {
    HomerReaderWidget,
  },
};
</script>

<style lang="scss">
  .homer-grid-widget {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    height: calc(100vh - 45px);

    .select-passage-reader {

      padding: 5px;
      overflow-y: scroll;
    }
  }
</style>
