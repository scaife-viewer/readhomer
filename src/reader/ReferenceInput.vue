<template>
  <div class="reference-input">
    <div class="input-group" :class="{ disabled: readFromStore }">
      <input v-model="reference" :disabled="readFromStore" @keyup.enter="lookup" placeholder="2.1-3.15" />
      <button :disabled="readFromStore" @click.prevent="lookup">Lookup</button>
    </div>
    <button class="global-input" @click.prevent="toggleReadFromSource" :class="{ active: readFromStore }">
      Sync to Global Reference
    </button>
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
    toggleReadFromSource() {
      this.readFromStore = !this.readFromStore;
    },
    lookup() {
      this.$emit('lookup', this.reference);
    },
  },
};
</script>

<style lang="scss">
  @import "../variables.scss";

  .reference-input {
    padding: 15px 24px;
    border-bottom: 1px solid $gray-200;
    margin-bottom: 15px;
    background: $gray-100;
    flex: 1;
    display: flex;
    justify-content: space-between;
    .global-input {
      margin: auto 0;
      font-size: 12px;
    }
    .input-group {
      display: flex;
      height: 30px;
    }
    input {
      padding: 5px 10px;
      margin-right: 5px;
    }
    button {
      background: $gray-200;
      border: 1px solid $gray-400;
      border-radius: 3px;
      cursor: pointer;
      margin: 1px 10px 1px 0;
      &:hover {
        background: $gray-300;
      }
    }
  }
</style>
