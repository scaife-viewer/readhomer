<template>
  <div class="add-widgets">
    <div v-for="(option, i) in options" :key="i" class="widget-option"
      :class="{ selected: selected(option) }"
      @click.prevent="$emit('select', option.component)">
      <span><icon :name="iconName(option)" /></span> <span>{{ option.text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['options', 'mainWidget'],
  methods: {
    selected(option) {
      return this.mainWidget && this.mainWidget === option.component;
    },
    iconName(option) {
      if (this.mainWidget) {
        return this.mainWidget === option.component ? 'check-square' : 'square';
      }
      return 'plus-square';
    },
  },
};
</script>

<style lang="scss">
  @import "../../variables.scss";

  .widget-option {
    display: flex;
    justify-content: flex-start;
    cursor: pointer;
    padding: 0.75rem 1.25rem;
    margin: 0.5rem 0.375rem;
    border: 1px solid $gray-100;
    background: $gray-200;
    span:first-of-type {
      margin-right: 8px;
    }
    &:hover,
    &.selected {
      background: $gray-300;
      color: $black;
      span svg {
        color: #0A0;
      }
    }

    color: $gray-700;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
  }
</style>
