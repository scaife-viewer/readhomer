<template>
  <div class="homer-reference-input-widget">
    <ReferenceInput @lookup="onLookup" :disable-sync="true" />
  </div>
</template>

<script>
import ReferenceInput from '../components/ReferenceInput.vue';
import { HOMER_LOOKUP_REFERENCE } from '../constants';

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
      this.$store.dispatch(`homer/${HOMER_LOOKUP_REFERENCE}`, { urn, reference });
    },
  },
};
</script>

<style lang="scss">
  @import "../../variables.scss";

  .homer-reference-input-widget {
    margin: 0 2em;
    flex: 1;
    .reference-input {
      padding: 0;
      border-bottom: none;
      margin-bottom: 0;
      background: none;
    }
  }
</style>
