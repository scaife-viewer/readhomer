<template>
  <div class="skeleton">
    <SidebarLayout class="left" :class="sidebarClasses" :widgets="leftWidgets">
      <div slot="button-container" class="button-container">
        <button class="toggle-open" v-if="leftOpen" @click="onLeftToggle">
          <Icon name="arrow-left" />
        </button>
        <button class="toggle-open" v-else @click="onLeftToggle">
          <Icon name="arrow-right" />
        </button>
      </div>
    </SidebarLayout>

    <MainLayout :widget="mainWidget" :isEditable="isEditable" />

    <SidebarLayout class="right" :class="sidebarClasses" :widgets="rightWidgets">
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
} from './constants';

export default {
  props: ['mainWidget', 'leftWidgets', 'rightWidgets'],
  components: { MainLayout, SidebarLayout },
  data() {
    return {
      editing: false,
      isEditable: false,
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
  },
  computed: {
    leftOpen() {
      return this.$store.state.scaifeSkeleton.leftOpen;
    },
    rightOpen() {
      return this.$store.state.scaifeSkeleton.rightOpen;
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
