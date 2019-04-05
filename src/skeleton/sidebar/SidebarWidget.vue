<template>
  <div class="widget widget-sidebar">
    <div class="sticky-block">
      <h2>
        <span @click.prevent="toggle">
          <span class="open-toggle">
            <Icon :name="open ? 'chevron-down' : 'chevron-right'" />
          </span>
          <slot name="heading" />
        </span>
        <a v-if="editing" href="#" @click.prevent="$emit('remove')" class="remove-link">
          <icon name="minus-circle" />
        </a>
        <span v-if="open & !editing" class="fixed-toggle" @click.prevent="toggleFix">
          <Icon class="fa-flip-horizontal" :name="fixed ? 'expand' : 'compress'" />
        </span>
      </h2>
      <div v-if="open" class="sticky-body">
        <slot name="sticky" />
      </div>
    </div>
    <div v-if="open" :class="['body', { fixed }]">
      <slot name="body" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['editing'],
  data() {
    return {
      open: true,
      fixed: false,
    };
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
    toggleFix() {
      this.fixed = !this.fixed;
    },
  },
};
</script>

<style lang="scss">
  @import "../../variables.scss";

  .remove-link {
    color: red;
  }

  .widget {
    background: $white;
    position: relative;
    padding: 0 8px 8px 8px;
    border-bottom: 1px solid $gray-200;
    &:first-of-type {
      border-top: 1px solid $gray-200;
    }
    .sticky-block {
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    h2 {
      background: $white;
      padding: 15px 0 5px;
      display: flex;
      justify-content: space-between;
      margin: 0;
      color: $gray-700;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      font-size: 16px;
      line-height: 24px;
      font-weight: 400;
      > span:first-of-type {
        flex-grow: 2;
        display: flex;
        .open-toggle {
          text-align: center;
          min-width: 2em;
          color: $gray-400;
        }
        &:hover .open-toggle {
          color: $gray-700;
        }
      }
      .fixed-toggle {
        opacity: 0;
        font-size: 0.9rem;
        max-width: 2em;
        color: $gray-400;
        text-align: right;
        &:hover {
          color: $gray-600;
        }
      }
    }
    &:hover .fixed-toggle {
      opacity: 1;
    }
    div.sticky-body {
      background: $white;
    }
    div.body {
      position: relative;
      margin: 0;
      &.fixed {
        max-height: 200px;
        overflow-y: auto;
      }
    }
  }
  .widget.widget-sidebar h2 {
    cursor: pointer;
  }

  /* <div class="widget-body-blur"></div> */
  .widget-body-blur {
    background: linear-gradient(0deg,#fff,hsla(0,0%,100%,0));
    height: 32px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
