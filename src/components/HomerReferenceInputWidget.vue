<template>
  <div class="homer-input-widget">
    <div class="input-group">
        <input v-model="reference" />
    </div>
    <button @click.prevent="lookup">Lookup</button>
  </div>
</template>

<script>
export default {
  scaifeConfig: {
    displayName: 'Homer Reference Input',
    singleton: true,
    location: 'sidebar',
  },
  data() {
    return {
      reference: '',
    };
  },
  methods: {
    lookup() {
      this.$store.dispatch('homerLookupReference', { reference: this.reference });
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
