<template>
  <EditableSkeleton
      id="app"
      @leftToggle="onLeftToggle"
      @rightToggle="onRightToggle"
      @addWidget="addWidget"
      @changeWidget="changeWidget"
      @removeWidget="removeWidget"
      :left-open="leftOpen"
      :right-open="rightOpen"
      :main-widget="mainWidget"
      :left-widgets="leftWidgets"
      :right-widgets="rightWidgets"
  />
</template>

<script>
import EditableSkeleton from './skeleton/EditableSkeleton.vue';
import {
  TOGGLE_RIGHT_SIDEBAR,
  TOGGLE_LEFT_SIDEBAR,
  ADD_LEFT_WIDGET,
  ADD_RIGHT_WIDGET,
  CHANGE_MAIN_WIDGET,
  REMOVE_LEFT_WIDGET,
  REMOVE_RIGHT_WIDGET,
} from './constants';
import widgets from './widgets';

export default {
  name: 'app',
  components: {
    EditableSkeleton,
  },
  methods: {
    onLeftToggle() {
      this.$store.dispatch(TOGGLE_LEFT_SIDEBAR);
    },
    onRightToggle() {
      this.$store.dispatch(TOGGLE_RIGHT_SIDEBAR);
    },
    addWidget(name, widget) {
      if (name === 'left') {
        this.$store.dispatch(ADD_LEFT_WIDGET, { displayName: widget.scaifeConfig.displayName });
      } else {
        this.$store.dispatch(ADD_RIGHT_WIDGET, { displayName: widget.scaifeConfig.displayName });
      }
    },
    changeWidget(mainWidget) {
      this.$store.dispatch(CHANGE_MAIN_WIDGET, { displayName: mainWidget.scaifeConfig.displayName });
    },
    removeWidget(name, index) {
      if (name === 'left') {
        this.$store.dispatch(REMOVE_LEFT_WIDGET, { index });
      } else {
        this.$store.dispatch(REMOVE_RIGHT_WIDGET, { index });
      }
    },
  },
  computed: {
    widgets() {
      return widgets;
    },
    mainWidget() {
      return widgets[this.$store.state.widgets.mainWidget] || null;
    },
    leftWidgets() {
      return this.$store.state.widgets.left.filter(w => widgets[w] !== undefined).map(w => widgets[w]);
    },
    rightWidgets() {
      return this.$store.state.widgets.right.filter(w => widgets[w] !== undefined).map(w => widgets[w]);
    },
    leftOpen() {
      return this.$store.state.leftOpen;
    },
    rightOpen() {
      return this.$store.state.rightOpen;
    },
  },
};
</script>


<style lang="scss">
  @import url(https://fonts.googleapis.com/css?family=Noto+Serif:400,400i,700,700i&subset=greek,greek-ext,latin-ext);
  @import url(https://fonts.googleapis.com/css?family=Noto+Sans:400,700);

  html,body {
    margin: 0;
    padding: 0;
  }
  #app {
    font-family: 'Noto Sans', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .body {
    display: flex;
    justify-content: center;
  }
</style>
