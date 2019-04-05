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

export default {
  props: ['leftOpen', 'rightOpen', 'mainWidget', 'leftWidgets', 'rightWidgets'],
  components: { MainLayout, SidebarLayout },
  data() {
    return {
      editing: false,
    };
  },
  methods: {
    onLeftToggle() {
      this.$emit('leftToggle');
    },
    onRightToggle() {
      this.$emit('rightToggle');
    },
    addWidget(name, widget) {
      this.$emit('addWidget', name, widget);
    },
    changeWidget(mainWidget) {
      this.$emit('changeWidget', mainWidget);
    },
    removeWidget(name, index) {
      this.$emit('removeWidget', name, index);
    },
  },
  computed: {
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
