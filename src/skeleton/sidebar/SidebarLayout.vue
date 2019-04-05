<template>
  <aside class="sidebar-wrapper">
    <slot name="button-container" />
    <div class="sidebar">
      <div class="widgets">
        <SidebarWidget
          v-for="(widget, index) in widgets"
          :key="index"
          @remove="$emit('removeWidget', index)"
          :editing="editing">
          <span slot="heading" class="heading">{{ widget.scaifeConfig.displayName }}</span>
          <component slot="body" :is="widget" />
        </SidebarWidget>
      </div>
      <WidgetEditor
        :options="widgetOptions"
        v-if="editing"
        @change-widget="widget => $emit('changeWidget', widget)"
      />
    </div>
  </aside>
</template>

<script>
import SidebarWidget from './SidebarWidget.vue';
import WidgetEditor from '../editor/WidgetEditor.vue';

export default {
  props: ['open', 'editing', 'widgets', 'widgetOptions'],
  components: { WidgetEditor, SidebarWidget },
};
</script>

<style lang="scss">
  @import "../../variables.scss";

  .sidebar-wrapper {
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 600px;
    background: $white;
  }

  .left .button-container {
    text-align: right;
  }

  button.toggle-open {
    border: none;
    font-size: 18px;
    color: $gray-600;
    outline: none;
    background: transparent;
    margin: 4px;
    padding: 3px 2px 1px 2px;
  }

  .left.sidebar-wrapper {
    border-right: 1px solid $gray-300;
  }
  .right.sidebar-wrapper {
    border-left: 1px solid $gray-300;
  }
  .left.sidebar-wrapper.sidebar-left--closed,
  .right.sidebar-wrapper.sidebar-right--closed {
    flex: 0;
  }
  .sidebar {
    overflow-y: auto;
    flex: 1;
  }
  .left.sidebar-left--closed .sidebar,
  .right.sidebar-right--closed .sidebar {
    max-width: 0;
    overflow: hidden;
    opacity: 0;
  }
  .left.sidebar-left--closed {
    button.toggle-open {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 99;
    }
  }
  .right.sidebar-right--closed {
    button.toggle-open {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 99;
    }
  }

  .left.sidebar-left--open,
  .right.sidebar-right--open {

    min-width: 200px;

    button.toggle-open {
      position: inherit;
      top: inherit;
      left: inherit;
    }
  }

  .left.sidebar-left--open .sidebar,
  .right.sidebar-right--open .sidebar {
    max-width: 600px;
  }

  .widgets {
    margin-bottom: 50px;
  }
  .sidebar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
