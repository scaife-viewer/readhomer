<template>
    <div class="cts-reference">
        <a v-if="apiLink" :href="apiLink" target="_blank">{{ reference }}</a>
        <span v-else>No reference selected</span>
    </div>
</template>

<script>
export default {
  scaifeConfig: {
    displayName: 'CTS URN',
    location: 'sidebar',
  },
  computed: {
    reference() {
      return this.$store.state.scaifeReader.selectedCTSReference;
    },
    url() {
      return this.$store.state.scaifeReader.selectedCTSUrl;
    },
    apiLink() {
      return this.url && this.reference && `${this.url}${this.reference}`;
    },
  },
};
</script>

<style lang="scss">
    .cts-reference a {
        font-size: 14px;
    }
</style>
