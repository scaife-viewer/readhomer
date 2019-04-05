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
import { TOGGLE_RIGHT_SIDEBAR, TOGGLE_LEFT_SIDEBAR } from './constants';

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
      this.$store.state.widgets[name] = [
        ...this.$store.state.widgets[name],
        widget,
      ];
    },
    changeWidget(mainWidget) {
      this.$store.state.widgets = {
        ...this.$store.state.widgets,
        mainWidget,
      };
    },
    removeWidget(name, index) {
      const widgets = [...this.$store.state.widgets[name]];
      widgets.splice(index, 1);
      this.$store.state.widgets[name] = widgets;
    },
  },
  computed: {
    mainWidget() {
      return this.$store.state.widgets.mainWidget;
    },
    leftWidgets() {
      return this.$store.state.widgets.left;
    },
    rightWidgets() {
      return this.$store.state.widgets.right;
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
