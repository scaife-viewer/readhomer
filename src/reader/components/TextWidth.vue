<template>
    <span class="text-width-control" :class="{ active }" @click.prevent="onClick()">
      {{ label }}
    </span>
</template>

<script>
import { SET_TEXT_WIDTH } from '../constants';

export default {
  props: ['value'],
  computed: {
    label() {
      return this.value.toUpperCase();
    },
    active() {
      return this.textWidth === this.value;
    },
    textWidth() {
      return this.$store.state.scaifeReader.textWidth;
    },
  },
  methods: {
    onClick() {
      this.$store.dispatch(`scaifeReader/${SET_TEXT_WIDTH}`, { width: this.value });
    },
  },
};
</script>

<style lang="scss">
  @import "../../variables.scss";

  .text-width-control {
    cursor: pointer;
    color: $gray-500;
    font-size: 14px;
  }

  .text-width-control.active {
    color: $black;
  }
</style>
