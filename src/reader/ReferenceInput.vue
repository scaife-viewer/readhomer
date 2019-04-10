<template>
  <div class="reference-input">
    <div class="input-group">
      <input v-model="reference" @keyup.enter="lookup" placeholder="2.1-3.15" />
    </div>
    <button @click.prevent="lookup">Lookup</button>
    <input type="checkbox" v-model="readFromStore" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      reference: '',
      readFromStore: false
    };
  },
  watch: {
    readFromStore() {
      this.$emit('readFromStore', this.readFromStore);
    }
  },
  methods: {
    lookup() {
      this.$emit('lookup', this.reference);
    },
  },
};
</script>

<style lang="scss">
  @import "../variables.scss";

  .reference-input {
    margin: 0 2em;
    flex: 1;
  }
</style>
