<template>
  <div class="main-layout">
    <MainWidget>
      <h2 class="main-widget-heading" slot="heading">
        <span>{{ widgetHeader }}</span>
        <EditLayoutButton
          v-if="isEditable && editing !== undefined"
          :editing="editing"
          @editToggle="$emit('editToggle')"
        />
      </h2>

      <WidgetEditor slot="body" v-if="editing" class="main-widget-editor"
        kind="main"
        :editing="editing"
        :main-widget="widget"
        :options="widgetOptions"
        @change-widget="widget => $emit('changeWidget', widget)" />
      <component slot="body" :is="widget" v-show="!editing" v-if="widget !== null" />
    </MainWidget>
  </div>
</template>

<script>
import EditLayoutButton from './EditLayoutButton.vue';
import MainWidget from './MainWidget.vue';
import WidgetEditor from '../editor/WidgetEditor.vue';

export default {
  props: ['editing', 'widget', 'widgetOptions', 'fixed', 'isEditable'],
  components: {
    EditLayoutButton,
    MainWidget,
    WidgetEditor,
  },
  computed: {
    widgetHeader() {
      return this.widget ? this.widget.scaifeConfig.displayName : '';
    },
  },
};
</script>

<style lang="scss">
  @import "../../variables.scss";

  .main-layout {
    height: 100vh;
    position: relative;
    margin: 0 auto;
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .widget h2.main-widget-heading {
    padding: 15px 24px 15px;
  }
  .main-layout .widget {
    height: 100vh;
    overflow-y: scroll;
  }
</style>
