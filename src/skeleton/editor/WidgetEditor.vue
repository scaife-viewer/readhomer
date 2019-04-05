<template>
  <div class="widget-editor">
    <WidgetSelector
      :main-widget="mainWidget"
      :options="options"
      @select="widget => $emit('change-widget', widget)"
    />
  </div>
</template>

<script>
import WidgetSelector from './WidgetSelector.vue';

export default {
  props: ['mainWidget', 'options'],
  components: { WidgetSelector },
};
</script>

<style lang="scss">
  @import "../../variables.scss";

  .widget-editor {
    z-index: 2000;  // has to be more than the widget sticky-block
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 1px solid $gray-300;
    background: $gray-100;
    display: block;
    button {
      margin: 15px 0;
      background: $gray-200;
      color: $gray-700;
      padding: 0.5rem 2rem;
      border: none;
      font-size: 14px;
      &:hover {
        background: $gray-300;
        color: $black;
      }
    }

    &.main-widget-editor {
      border-top: none;
      position: relative;
      margin-top: 100px;
      width: 80%;
      max-width: 900px;
      align-self: center;
    }
  }

</style>
