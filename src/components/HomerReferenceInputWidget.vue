<template>
  <div class="homer-input-widget">
    <ReferenceInput @lookup="onLookup" />
  </div>
</template>

<script>
import ReferenceInput from '../reader/ReferenceInput.vue';

export default {
  scaifeConfig: {
    displayName: 'Homer Reference Input',
    singleton: true,
    location: 'sidebar',
  },
  components: {
    ReferenceInput,
  },
  methods: {
    onLookup(urn, reference) {
      this.$store.dispatch('homerLookupReference', { urn, reference });
    },
  },
};
</script>

<style lang="scss">
  @import "../variables.scss";

  .homer-input-widget {
    margin: 0 2em;
    flex: 1;
  }
</style>
