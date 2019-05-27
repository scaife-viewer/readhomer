<template>
  <div class="text-size-widget">
    <TextSize :value="textSize" @input="changeTextSize" size="xs" />{{ ' ' }}
    <TextSize :value="textSize" @input="changeTextSize" size="sm" />{{ ' ' }}
    <TextSize :value="textSize" @input="changeTextSize" size="md" />{{ ' ' }}
    <TextSize :value="textSize" @input="changeTextSize" size="lg" />{{ ' ' }}
    <TextSize :value="textSize" @input="changeTextSize" size="xl" />
  </div>
</template>

<script>
import TextSize from '../components/TextSize.vue';
import { SET_TEXT_SIZE } from '../constants';

export default {
  scaifeConfig: {
    displayName: 'Text Size',
    singleton: true,
    location: 'both', // Should be sidebar but just testing the 'both' option
  },
  computed: {
    textSize() {
      return this.$store.state.scaifeReader.textSize;
    },
  },
  methods: {
    changeTextSize(size) {
      this.$store.dispatch(`scaifeReader/${SET_TEXT_SIZE}`, { size });
    },
  },
  components: { TextSize },
};
</script>

<style lang="scss">
  @import "../../variables.scss";

  .text-size-widget {
    margin: 0 2em;
    flex: 1;
  }
</style>
