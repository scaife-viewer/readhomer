<template>
    <div class="text-width-widget">
        <TextWidth value="narrow" />
        <TextWidth value="normal" />
        <TextWidth value="wide" />
    </div>
</template>
<script>
import TextWidth from './TextWidth.vue';

export default {
  scaifeConfig: {
    displayName: 'Text Width',
    singleton: true,
    location: 'sidebar',
  },
  components: { TextWidth }
};
</script>

<style lang="scss">
  .text-width-widget {
      display: flex;
      justify-content: space-between;
      margin: 0 2em;
      flex: 1;
  }
</style>
