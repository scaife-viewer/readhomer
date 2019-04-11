<template>
  <div class="reference-input">
    <div class="reference-input--top-row">
      <div class="input-group" :class="{ disabled: readFromStore }">
        <input v-model="reference" :disabled="readFromStore" @keyup.enter="lookup" placeholder="2.1-3.15" />
        <button :disabled="readFromStore" @click.prevent="lookup">Lookup</button>
      </div>
      <button class="global-input" @click.prevent="toggleReadFromSource" :class="{ active: readFromStore }">
        Global Sync
      </button>
    </div>
    <div class="reference-input--bottom-row">
      <select v-model="urn">
        <option v-for="choice in choices" :key="choice.urn" :value="choice.urn">{{ choice.label }}</option>
      </select>
    </div>
  </div>
</template>

<script>
import { URN_ILIAD, URN_ODYSSEY } from '../constants';

export default {
  data() {
    return {
      urn: URN_ILIAD,
      reference: '',
      readFromStore: false
    };
  },
  computed: {
    choices() {
      return [
        {urn: URN_ILIAD, label: 'Iliad'},
        {urn: URN_ODYSSEY, label: 'Odyssey'},
      ]
    }
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
      this.$emit('lookup', this.urn, this.reference);
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
    .reference-input--top-row {
      display: flex;
      justify-content: space-between;
    }
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
      &.active {
        background: #2f4685;
        color: white;
      }
    }
  }
</style>
