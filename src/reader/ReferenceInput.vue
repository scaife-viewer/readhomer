<template>
  <div class="reference-input">
    <div class="input-group">
      <input v-model="reference" @keyup.enter="lookup" placeholder="2.1-3.15" />
    </div>
    <button @click.prevent="lookup">Lookup</button>
    <label>
      <input type="checkbox" v-model="readFromStore" />
      Read from Store
    </label>
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
    margin: 15px 24px;
    flex: 1;
    display: flex;
    input {
      padding: 5px 10px;
      margin-right: 5px;
    }
    button {
      margin-right: 10px;
      background: $gray-200;
      border: 1px solid $gray-400;
      border-radius: 3px;
      cursor: pointer;
      &:hover {
        background: $gray-300;
      }
    }
  }
</style>
