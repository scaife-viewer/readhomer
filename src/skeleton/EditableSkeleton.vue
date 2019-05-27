<template>
  <div class="skeleton">
    <SidebarLayout
      class="left"
      :class="sidebarClasses"
      :widgetOptions="sidebarWidgetOptions"
      @changeWidget="widget => addWidget('left', widget)"
      @removeWidget="index => removeWidget('left', index)"
      @editToggle="editing = !editing"
      :widgets="leftWidgets"
      :editing="editing">
      <div slot="button-container" class="button-container">
        <button class="toggle-open" v-if="leftOpen" @click="onLeftToggle">
          <Icon name="arrow-left" />
        </button>
        <button class="toggle-open" v-else @click="onLeftToggle">
          <Icon name="arrow-right" />
        </button>
      </div>
    </SidebarLayout>

    <MainLayout
      @changeWidget="changeWidget"
      @editToggle="editing = !editing"
      :editing="editing"
      :widget="mainWidget"
      :widgetOptions="mainWidgetOptions"
      :isEditable="isEditable"
    />

    <SidebarLayout
      class="right"
      :class="sidebarClasses"
      :widgetOptions="sidebarWidgetOptions"
      @changeWidget="widget => addWidget('right', widget)"
      @removeWidget="index => removeWidget('right', index)"
      @editToggle="editing = !editing"
      :widgets="rightWidgets"
      :editing="editing">
      <div slot="button-container" class="button-container">
        <button class="toggle-open" v-if="rightOpen" @click="onRightToggle">
          <Icon name="arrow-right" />
        </button>
        <button class="toggle-open" v-else @click="onRightToggle">
          <Icon name="arrow-left" />
        </button>
      </div>
    </SidebarLayout>
  </div>
</template>

<script>
import MainLayout from './main/MainLayout.vue';
import SidebarLayout from './sidebar/SidebarLayout.vue';

import {
  TOGGLE_LEFT_SIDEBAR,
  TOGGLE_RIGHT_SIDEBAR,
  ADD_LEFT_WIDGET,
  ADD_RIGHT_WIDGET,
  REMOVE_LEFT_WIDGET,
  REMOVE_RIGHT_WIDGET,
  CHANGE_MAIN_WIDGET,
} from './constants';

export default {
  components: { MainLayout, SidebarLayout },
  data() {
    return {
      editing: false,
      isEditable: true,
    };
  },
  methods: {
    onLeftToggle() {
      this.$emit('leftToggle');
      this.$store.dispatch(`scaifeSkeleton/${TOGGLE_LEFT_SIDEBAR}`);
    },
    onRightToggle() {
      this.$emit('rightToggle');
      this.$store.dispatch(`scaifeSkeleton/${TOGGLE_RIGHT_SIDEBAR}`);
    },
    addWidget(name, widget) {
      this.$emit('addWidget', name, widget);
      switch (name) {
        case 'left':
          this.$store.dispatch(`scaifeSkeleton/${ADD_LEFT_WIDGET}`, { widget });
          break;
        case 'right':
          this.$store.dispatch(`scaifeSkeleton/${ADD_RIGHT_WIDGET}`, { widget });
          break;
      }
    },
    changeWidget(mainWidget) {
      this.$emit('changeWidget', mainWidget);
      this.$store.dispatch(`scaifeSkeleton/${CHANGE_MAIN_WIDGET}`, { widget: mainWidget });
    },
    removeWidget(name, index) {
      this.$emit('removeWidget', name, index);
      switch (name) {
        case 'left':
          this.$store.dispatch(`scaifeSkeleton/${REMOVE_LEFT_WIDGET}`, { index });
          break;
        case 'right':
          this.$store.dispatch(`scaifeSkeleton/${REMOVE_RIGHT_WIDGET}`, { index });
          break;
      }
    },
  },
  computed: {
    leftOpen() {
      return this.$store.state.scaifeSkeleton.leftOpen;
    },
    rightOpen() {
      return this.$store.state.scaifeSkeleton.rightOpen;
    },
    widgets() {
      return this.$store.state.scaifeSkeleton.widgets;
    },
    state() {
      return this.$store.state;
    },
    leftWidgets() {
      return this.widgets.left.map(name => this.$scaife.skeleton.widgets[name]);
    },
    rightWidgets() {
      return this.widgets.right.map(name => this.$scaife.skeleton.widgets[name]);
    },
    mainWidget() {
      return this.widgets.mainWidget && this.$scaife.skeleton.widgets[this.widgets.mainWidget];
    },
    sidebarClasses() {
      return [
        this.leftOpen ? 'sidebar-left--open' : 'sidebar-left--closed',
        this.rightOpen ? 'sidebar-right--open' : 'sidebar-right--closed',
      ];
    },
    mainWidgetOptions() {
      return this.$scaife.skeleton.widgetOptions('main', this.mainWidget, this.leftWidgets, this.rightWidgets);
    },
    sidebarWidgetOptions() {
      return this.$scaife.skeleton.widgetOptions('sidebar', this.mainWidget, this.leftWidgets, this.rightWidgets);
    },
  },
};
</script>

<style lang="scss">
  @import "../variables.scss";

  .skeleton {
    display: flex;
    height: 100vh;
    background: $gray-200;
    position: relative;
  }
</style>
